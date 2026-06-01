"use client";

import { useEffect, useState } from "react";
import { PanelLeftOpen } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const savedValue = window.localStorage.getItem("ab-sidebar-visible");
    if (savedValue !== null) {
      setIsSidebarVisible(savedValue === "true");
    }
  }, []);

  const setSidebarVisibility = (isVisible: boolean) => {
    setIsSidebarVisible(isVisible);
    window.localStorage.setItem("ab-sidebar-visible", String(isVisible));
  };

  return (
    <div className="flex min-h-screen bg-primary">
      {isSidebarVisible ? (
        <Sidebar onHide={() => setSidebarVisibility(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setSidebarVisibility(true)}
          aria-label="Mostrar menu lateral"
          title="Mostrar menu"
          className="fixed left-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-[#0a0a0a]/95 text-accent shadow-lg shadow-black/30 transition-colors hover:bg-accent/10"
        >
          <PanelLeftOpen size={18} strokeWidth={1.6} />
        </button>
      )}

      <main
        className={cn(
          "min-h-screen flex-1 overflow-auto transition-[margin] duration-300",
          isSidebarVisible ? "ml-64" : "ml-0"
        )}
      >
        {children}
      </main>
    </div>
  );
}
