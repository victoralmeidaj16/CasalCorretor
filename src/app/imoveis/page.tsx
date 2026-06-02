"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { PropertyCard } from "@/components/property-card";
import { properties as defaultProperties, Property } from "@/data/properties";
import { SlidersHorizontal, Search, Plus, X, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ImoveisPage() {
  const { user } = useAuth();
  const [propertiesList, setPropertiesList] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCidade, setFilterCidade] = useState("");
  const [filterBairro, setFilterBairro] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [type, setType] = useState<"Apartamento" | "Casa">("Apartamento");
  const [cidadeInput, setCidadeInput] = useState("");
  const [bairroInput, setBairroInput] = useState("");
  const [size, setSize] = useState("");
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [distanceToSea, setDistanceToSea] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const isAdmin = user?.email === "teste123@gmail.com";

  // Fetch properties
  useEffect(() => {
    async function loadProperties() {
      try {
        const q = query(collection(db, "properties"), orderBy("id", "asc"));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setPropertiesList(defaultProperties);
        } else {
          const list: Property[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.data().id, ...doc.data() } as Property);
          });
          setPropertiesList(list);
        }
      } catch (err) {
        console.error("Error loading properties, falling back:", err);
        setPropertiesList(defaultProperties);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cidadeInput || !bairroInput || !price) return;

    setSaving(true);
    setUploadProgress("Salvando...");
    try {
      let imageUrl = "";

      if (imageFile) {
        setUploadProgress("Subindo imagem do imóvel...");
        const imageRef = ref(storage, `properties/${Date.now()}_${imageFile.name}`);
        const uploadResult = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const nextId = propertiesList.length > 0 ? Math.max(...propertiesList.map((p) => p.id)) + 1 : 1;

      // Clean/formatted location
      const location = `${bairroInput}, ${cidadeInput}`;

      // Random elegant gradient for fallback background
      const gradients = [
        "from-[#1a0a00] via-[#2c1810] to-[#0a0505]",
        "from-[#0a0a1a] via-[#101028] to-[#050510]",
        "from-[#001a0a] via-[#0a2810] to-[#000f05]",
        "from-[#1a0a05] via-[#281505] to-[#0f0500]"
      ];
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

      const newProperty = {
        id: nextId,
        name,
        location,
        type,
        size: size || "N/A",
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        distanceToSea: distanceToSea || "N/A",
        price,
        gradient: randomGradient,
        ...(imageUrl && { imageUrl }),
        ...(tag && { tag })
      };

      await addDoc(collection(db, "properties"), newProperty);

      setPropertiesList((prev) => [...prev, newProperty as Property]);

      // Reset Form
      setName("");
      setCidadeInput("");
      setBairroInput("");
      setSize("");
      setBedrooms(3);
      setBathrooms(3);
      setDistanceToSea("");
      setPrice("");
      setTag("");
      setImageFile(null);
      setShowAddModal(false);
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Erro ao salvar imóvel no Firestore. Verifique as regras do banco.");
    } finally {
      setSaving(false);
      setUploadProgress("");
    }
  };

  // Extract cities and neighborhoods dynamically
  const uniqueCities = Array.from(
    new Set(
      propertiesList.map((p) => {
        const parts = p.location.split(",");
        return parts.length > 1 ? parts[1].trim() : parts[0].trim();
      })
    )
  );

  const uniqueNeighborhoods = Array.from(
    new Set(
      propertiesList.map((p) => {
        const parts = p.location.split(",");
        return parts[0].trim();
      })
    )
  );

  // Filter properties logic
  const filtered = propertiesList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? p.type === filterType : true;
    
    // Extract city & neighborhood for filtering
    const parts = p.location.split(",");
    const city = parts.length > 1 ? parts[1].trim() : parts[0].trim();
    const neighborhood = parts[0].trim();

    const matchesCidade = filterCidade ? city.toLowerCase() === filterCidade.toLowerCase() : true;
    const matchesBairro = filterBairro ? neighborhood.toLowerCase() === filterBairro.toLowerCase() : true;
    
    // Simple price logic
    let matchesPrice = true;
    if (filterPrice) {
      const numericPrice = parseInt(p.price.replace(/[^\d]/g, ""), 10);
      if (filterPrice === "1") matchesPrice = numericPrice <= 2000000;
      else if (filterPrice === "2") matchesPrice = numericPrice > 2000000 && numericPrice <= 6000000;
      else if (filterPrice === "3") matchesPrice = numericPrice > 6000000;
    }

    return matchesSearch && matchesType && matchesCidade && matchesBairro && matchesPrice;
  });

  return (
    <AuthLayout>
      <div className="px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-accent uppercase mb-2">
              Portfólio Exclusivo
            </p>
            <h1
              className="text-4xl font-light text-text-primary leading-none mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Imóveis Disponíveis
            </h1>
            <p className="text-xs text-muted font-light tracking-wider">
              {filtered.length} imóveis no portfólio AB INVEST
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase bg-accent text-primary px-4 py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(201,151,77,0.4)] transition-all duration-300"
            >
              <Plus size={14} />
              Adicionar ao Portfólio
            </button>
          )}
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent mb-6" />

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 flex-grow max-w-xs">
            <Search size={14} strokeWidth={1.5} className="text-muted/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar imóvel..."
              className="bg-transparent text-sm text-text-primary placeholder-muted/30 font-light flex-1 outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 text-xs text-muted font-light focus:border-accent/40 focus:outline-none transition-colors"
          >
            <option value="">Todos os Tipos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
          </select>

          <select
            value={filterCidade}
            onChange={(e) => setFilterCidade(e.target.value)}
            className="bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 text-xs text-muted font-light focus:border-accent/40 focus:outline-none transition-colors"
          >
            <option value="">Todas as Cidades</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={filterBairro}
            onChange={(e) => setFilterBairro(e.target.value)}
            className="bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 text-xs text-muted font-light focus:border-accent/40 focus:outline-none transition-colors"
          >
            <option value="">Todos os Bairros</option>
            {uniqueNeighborhoods.map((bairro) => (
              <option key={bairro} value={bairro}>{bairro}</option>
            ))}
          </select>

          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="bg-secondary border border-accent/20 rounded-lg px-4 py-2.5 text-xs text-muted font-light focus:border-accent/40 focus:outline-none transition-colors"
          >
            <option value="">Valor</option>
            <option value="1">Até R$ 2M</option>
            <option value="2">R$ 2M – R$ 6M</option>
            <option value="3">Acima de R$ 6M</option>
          </select>

          {(search || filterType || filterCidade || filterBairro || filterPrice) && (
            <button
              onClick={() => {
                setSearch("");
                setFilterType("");
                setFilterCidade("");
                setFilterBairro("");
                setFilterPrice("");
              }}
              className="flex items-center gap-1.5 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2.5 text-xs font-semibold text-accent hover:bg-accent/25 hover:text-text-primary transition-all duration-200"
            >
              <X size={12} />
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Property grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted/40 text-sm font-light">Nenhum imóvel corresponde aos filtros selecionados.</p>
          </div>
        )}
      </div>

      {/* Add Portfolio Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-secondary border border-accent/30 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl my-8">
            <div className="px-6 py-4 border-b border-accent/10 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-accent">Adicionar ao Portfólio</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Nome do Empreendimento / Imóvel</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Penthouse Costa Esmeralda"
                  className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Cidade (Ex: Porto Belo, SC)</label>
                  <input
                    type="text"
                    required
                    value={cidadeInput}
                    onChange={(e) => setCidadeInput(e.target.value)}
                    placeholder="Ex: Porto Belo, SC"
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Bairro</label>
                  <input
                    type="text"
                    required
                    value={bairroInput}
                    onChange={(e) => setBairroInput(e.target.value)}
                    placeholder="Ex: Centro"
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Tipo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "Apartamento" | "Casa")}
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  >
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Quartos / Suítes</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Banheiros</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Área / Tamanho</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Ex: 240 m²"
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Distância do Mar</label>
                  <input
                    type="text"
                    value={distanceToSea}
                    onChange={(e) => setDistanceToSea(e.target.value)}
                    placeholder="Ex: Frente Mar ou 100 m do mar"
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Preço</label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: R$ 4.500.000"
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Etiqueta / Tag (Opcional)</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Ex: EXCLUSIVO ou PRONTO PARA MORAR"
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Imagem do Imóvel</label>
                <div className="relative border border-dashed border-accent/30 rounded-lg p-4 bg-primary hover:border-accent transition-colors flex flex-col items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload size={18} className="text-accent/60 mb-2" />
                  <span className="text-[10px] text-muted tracking-wider">
                    {imageFile ? imageFile.name : "Clique para selecionar foto do imóvel"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-accent text-primary py-2.5 rounded-lg text-[10px] font-semibold tracking-[0.15em] uppercase hover:bg-accent/90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? uploadProgress : "Salvar no Portfólio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
