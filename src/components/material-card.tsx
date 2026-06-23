"use client";

import Link from "next/link";
import { Download, Play, FileText, ExternalLink, Trash2 } from "lucide-react";
import { Material } from "@/data/materials";

interface MaterialCardProps {
  material: Material & { fileUrl?: string; docId?: string };
  isAdmin?: boolean;
  onDelete?: () => void;
}

export function MaterialCard({ material, isAdmin, onDelete }: MaterialCardProps) {
  return (
    <div className="bg-secondary border border-accent/20 rounded-xl overflow-hidden card-gold-hover flex flex-col relative group">
      {/* Visual area */}
      <div className={`relative bg-gradient-to-br ${material.gradient} h-36 flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />

        {isAdmin && onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full border border-red-900/30 bg-black/70 hover:bg-red-950/80 text-red-400 hover:text-red-300 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Apagar Material"
          >
            <Trash2 size={13} strokeWidth={2} />
          </button>
        )}

        {material.type === "video" && (
          <div className="relative z-10 w-12 h-12 rounded-full border border-accent/40 bg-primary/60 backdrop-blur-sm flex items-center justify-center">
            <Play size={18} strokeWidth={1.5} className="text-accent ml-0.5" />
          </div>
        )}
        {material.type === "apresentacao" && (
          <div className="relative z-10 flex items-center justify-center">
            <FileText size={32} strokeWidth={1} className="text-accent/30" />
          </div>
        )}
        {material.type === "arte" && (
          <div className="relative z-10 w-12 h-12 rounded-sm border border-accent/20 bg-accent/5 flex items-center justify-center">
            <span className="text-accent/30 text-xs font-medium tracking-wider">ART</span>
          </div>
        )}

        {material.type === "video" && material.duration && (
          <span className="absolute bottom-2 right-3 text-[10px] text-muted/70 bg-primary/70 px-1.5 py-0.5 rounded backdrop-blur-sm">
            {material.duration}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h4
          className="text-sm font-normal text-text-primary leading-snug mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {material.title}
        </h4>
        {material.size && (
          <p className="text-[10px] text-muted/50 font-light">{material.size}</p>
        )}

        <div className="mt-auto pt-3">
          <Link 
            href={`/materiais/${material.id}`}
            className="w-full flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase border border-accent/30 text-accent hover:bg-accent hover:text-primary py-2 rounded-lg transition-all duration-200"
          >
            <ExternalLink size={12} strokeWidth={2} />
            Visualizar Modelo
          </Link>
        </div>
      </div>
    </div>
  );
}
