"use client";

import { Download, Play, FileText } from "lucide-react";
import { Material } from "@/data/materials";


interface MaterialCardProps {
  material: Material & { fileUrl?: string };
}

export function MaterialCard({ material }: MaterialCardProps) {
  const handleAction = () => {
    if (material.fileUrl) {
      window.open(material.fileUrl, "_blank");
    } else {
      alert("Este é um material de demonstração sem arquivo anexado.");
    }
  };

  return (
    <div className="bg-secondary border border-accent/20 rounded-xl overflow-hidden card-gold-hover flex flex-col">
      {/* Visual area */}
      <div className={`relative bg-gradient-to-br ${material.gradient} h-36 flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />

        {material.type === "video" && (
          <div 
            onClick={handleAction}
            className="relative z-10 w-12 h-12 rounded-full border border-accent/40 bg-primary/60 backdrop-blur-sm flex items-center justify-center hover:bg-accent/20 transition-colors cursor-pointer"
          >
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
        {material.subtitle && (
          <p className="text-[10px] text-muted/50 font-light">{material.subtitle}</p>
        )}

        <div className="mt-auto pt-3">
          {material.type !== "video" ? (
            <button 
              onClick={handleAction}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase border border-accent/30 text-accent hover:bg-accent hover:text-primary py-2 rounded-lg transition-all duration-200 hover:shadow-[0_0_12px_rgba(201,151,77,0.2)]"
            >
              <Download size={12} strokeWidth={2} />
              Download
            </button>
          ) : (
            <button 
              onClick={handleAction}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase border border-accent/30 text-accent hover:bg-accent hover:text-primary py-2 rounded-lg transition-all duration-200"
            >
              <Play size={11} strokeWidth={2} />
              Assistir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
