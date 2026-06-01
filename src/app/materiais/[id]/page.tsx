"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth-layout";
import { materials as defaultMaterials, Material } from "@/data/materials";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { ArrowLeft, Download, Play, FileText, ChevronRight, Share2 } from "lucide-react";
import Link from "next/link";

export default function MaterialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";
  const materialId = parseInt(idStr, 10);

  const [material, setMaterial] = useState<(Material & { fileUrl?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMaterial() {
      if (isNaN(materialId)) {
        setLoading(false);
        return;
      }
      try {
        // First try to load from Firestore matching the dynamic ID field
        const q = query(collection(db, "materials"), where("id", "==", materialId), limit(1));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          setMaterial({ id: docData.id, ...docData } as Material & { fileUrl?: string });
        } else {
          // Fallback to local hardcoded mock materials
          const localMatch = defaultMaterials.find((m) => m.id === materialId);
          if (localMatch) {
            setMaterial(localMatch);
          }
        }
      } catch (err) {
        console.error("Error loading material detail:", err);
        const localMatch = defaultMaterials.find((m) => m.id === materialId);
        if (localMatch) {
          setMaterial(localMatch);
        }
      } finally {
        setLoading(false);
      }
    }
    loadMaterial();
  }, [materialId]);

  if (loading) {
    return (
      <AuthLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </AuthLayout>
    );
  }

  if (!material) {
    return (
      <AuthLayout>
        <div className="px-8 py-20 text-center">
          <h2 className="text-xl text-text-primary font-light mb-4">Material não encontrado</h2>
          <Link href="/materiais" className="text-accent hover:underline text-xs uppercase tracking-wider">
            Voltar para a central
          </Link>
        </div>
      </AuthLayout>
    );
  }

  const handleDownload = () => {
    if (material.fileUrl) {
      window.open(material.fileUrl, "_blank");
    } else {
      alert("Este é um material demonstrativo sem link de arquivo.");
    }
  };

  return (
    <AuthLayout>
      <div className="px-8 py-10 max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted/60 mb-8">
          <Link href="/materiais" className="hover:text-accent transition-colors">Materiais</Link>
          <ChevronRight size={10} />
          <span className="text-accent truncate max-w-[200px]">{material.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Voltar
        </button>

        {/* Detail Panel */}
        <div className="bg-secondary border border-accent/20 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl">
          {/* Visual Preview */}
          <div className={`md:col-span-7 bg-gradient-to-br ${material.gradient} min-h-[300px] md:min-h-[450px] flex items-center justify-center p-8 relative`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 text-center space-y-6">
              {material.type === "video" && (
                <div className="w-20 h-20 rounded-full border border-accent/40 bg-primary/60 backdrop-blur-sm flex items-center justify-center hover:bg-accent/20 transition-all transform hover:scale-105 shadow-xl">
                  <Play size={32} strokeWidth={1.5} className="text-accent ml-1" />
                </div>
              )}
              {material.type === "apresentacao" && (
                <div className="p-6 bg-primary/50 backdrop-blur-sm rounded-xl border border-accent/10">
                  <FileText size={64} strokeWidth={1} className="text-accent/40 mx-auto" />
                </div>
              )}
              {material.type === "arte" && (
                <div className="w-24 h-24 rounded-lg border border-accent/30 bg-accent/5 flex items-center justify-center shadow-lg">
                  <span className="text-accent/40 text-lg font-medium tracking-[0.2em]">ART</span>
                </div>
              )}
              <h2 
                className="text-2xl md:text-3xl font-light text-text-primary max-w-md mx-auto leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {material.title}
              </h2>
            </div>
          </div>

          {/* Info Details */}
          <div className="md:col-span-5 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-accent/10 bg-[#0c0c0c]">
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-bold tracking-[0.25em] text-accent uppercase bg-accent/10 px-2.5 py-1 rounded">
                  {material.type === "arte" ? "Arte Digital" : material.type === "video" ? "Vídeo Comercial" : "Apresentação PDF"}
                </span>
                <h1 
                  className="text-3xl font-light text-text-primary mt-4 mb-2 leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {material.title}
                </h1>
                <p className="text-xs text-muted font-light leading-relaxed">
                  Material exclusivo da AB Invest Group criado para alavancar a atração de clientes qualificados.
                </p>
              </div>

              <div className="h-px bg-accent/10" />

              <div className="space-y-4">
                <h3 className="text-[10px] font-semibold tracking-widest text-muted uppercase">Especificações Técnicas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {material.size && (
                    <div className="bg-primary/30 border border-accent/5 p-3 rounded-lg">
                      <span className="block text-[8px] uppercase tracking-widest text-muted/60">Tamanho</span>
                      <span className="text-xs font-medium text-text-primary">{material.size}</span>
                    </div>
                  )}
                  {material.duration && (
                    <div className="bg-primary/30 border border-accent/5 p-3 rounded-lg">
                      <span className="block text-[8px] uppercase tracking-widest text-muted/60">Duração</span>
                      <span className="text-xs font-medium text-text-primary">{material.duration}</span>
                    </div>
                  )}
                  <div className="bg-primary/30 border border-accent/5 p-3 rounded-lg">
                    <span className="block text-[8px] uppercase tracking-widest text-muted/60">Formato</span>
                    <span className="text-xs font-medium text-text-primary uppercase">
                      {material.type === "video" ? "MP4 / H264" : material.type === "apresentacao" ? "PDF / PPTX" : "PNG / JPG"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase bg-accent text-primary py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(201,151,77,0.4)] transition-all duration-300"
              >
                <Download size={14} />
                Fazer Download do Arquivo
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(material.fileUrl || window.location.href);
                  alert("Link de compartilhamento copiado!");
                }}
                className="w-full flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase border border-accent/20 text-muted hover:text-accent hover:border-accent/40 py-3 rounded-xl transition-all duration-200"
              >
                <Share2 size={12} />
                Compartilhar Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
