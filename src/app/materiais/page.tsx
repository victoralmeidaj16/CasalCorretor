"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { MaterialCard } from "@/components/material-card";
import { materials as defaultMaterials, Material } from "@/data/materials";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";
import { Plus, X, Upload } from "lucide-react";

const tabs = [
  { id: "arte", label: "Artes" },
  { id: "video", label: "Vídeos" },
  { id: "apresentacao", label: "Apresentações" },
];

export default function MateriaisPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"arte" | "video" | "apresentacao">("arte");
  const [materialsList, setMaterialsList] = useState<Material[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"arte" | "video" | "apresentacao">("arte");
  const [subtitle, setSubtitle] = useState("");
  const [size, setSize] = useState("");
  const [duration, setDuration] = useState("");
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.email === "teste123@gmail.com";

  // Fetch materials
  useEffect(() => {
    async function loadMaterials() {
      try {
        const q = query(collection(db, "materials"), orderBy("id", "asc"));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          // If Firestore collection is empty, load default static materials
          setMaterialsList(defaultMaterials);
        } else {
          const list: Material[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.data().id, ...doc.data() } as Material);
          });
          setMaterialsList(list);
        }
      } catch (err) {
        console.error("Error loading materials from Firestore, falling back to static:", err);
        setMaterialsList(defaultMaterials);
      } finally {
        setLoading(false);
      }
    }
    loadMaterials();
  }, []);

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setSaving(true);
    try {
      const nextId = materialsList.length > 0 ? Math.max(...materialsList.map((m) => m.id)) + 1 : 1;
      
      // Random sleek gradient
      const gradients = [
        "from-[#1a0e05] to-[#050505]",
        "from-[#05100a] to-[#050505]",
        "from-[#0a0510] to-[#050505]",
        "from-[#100a05] to-[#050505]",
        "from-[#0a1005] to-[#050505]"
      ];
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

      const newMaterial: Omit<Material, "id"> & { id: number } = {
        id: nextId,
        title,
        type,
        gradient: randomGradient,
        ...(subtitle && { subtitle }),
        ...(size && { size }),
        ...(duration && { duration }),
      };

      // Save to Firestore
      await addDoc(collection(db, "materials"), newMaterial);

      // Update state
      setMaterialsList((prev) => [...prev, newMaterial as Material]);
      
      // Reset form
      setTitle("");
      setSubtitle("");
      setSize("");
      setDuration("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Error saving material:", err);
      alert("Erro ao salvar material. Verifique suas regras do banco Firestore.");
    } finally {
      setSaving(false);
    }
  };

  const filtered = materialsList.filter((m) => m.type === activeTab);

  return (
    <AuthLayout>
      <div className="px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-accent uppercase mb-2">
              Central de Marketing
            </p>
            <h1
              className="text-4xl font-light text-text-primary leading-none mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Materiais de Marketing
            </h1>
            <p className="text-xs text-muted font-light tracking-wider">
              Recursos exclusivos para sua estratégia comercial
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase bg-accent text-primary px-4 py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(201,151,77,0.4)] transition-all duration-300"
            >
              <Plus size={14} />
              Novo Material
            </button>
          )}
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent mb-6" />

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-accent/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "arte" | "video" | "apresentacao")}
              className={`relative px-5 py-3 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-accent"
                  : "text-muted/50 hover:text-muted"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-4">
            {filtered.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted/40 text-sm font-light">Nenhum material disponível nesta categoria.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-secondary border border-accent/30 w-full max-w-md rounded-xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-accent/10 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-accent">Novo Material</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMaterial} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Título do Material</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Story Vista Mar"
                  className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Categoria</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "arte" | "video" | "apresentacao")}
                  className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                >
                  <option value="arte">Arte</option>
                  <option value="video">Vídeo</option>
                  <option value="apresentacao">Apresentação</option>
                </select>
              </div>

              {type !== "video" ? (
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Dimensões / Formato (Opcional)</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Ex: 1080 × 1920px ou PDF"
                      className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Tamanho do Arquivo (Opcional)</label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="Ex: 2.4 MB"
                      className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">Duração (Opcional)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Ex: 3:42"
                    className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-accent text-primary py-2.5 rounded-lg text-[10px] font-semibold tracking-[0.15em] uppercase hover:bg-accent/90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Upload size={12} />
                      Adicionar Material
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
