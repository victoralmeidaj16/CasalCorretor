"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { MaterialCard } from "@/components/material-card";
import { materials } from "@/data/materials";

const tabs = [
  { id: "arte", label: "Artes" },
  { id: "video", label: "Vídeos" },
  { id: "apresentacao", label: "Apresentações" },
];

export default function MateriaisPage() {
  const [activeTab, setActiveTab] = useState<"arte" | "video" | "apresentacao">("arte");

  const filtered = materials.filter((m) => m.type === activeTab);

  return (
    <AuthLayout>
      <div className="px-8 py-10">
        {/* Header */}
        <div className="mb-8">
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
          <div className="mt-6 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />
        </div>

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
        <div
          className={`grid gap-4 ${
            activeTab === "video"
              ? "grid-cols-4"
              : activeTab === "apresentacao"
              ? "grid-cols-4"
              : "grid-cols-4"
          }`}
        >
          {filtered.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted/40 text-sm font-light">Nenhum material disponível nesta categoria.</p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
