"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PanelLeftOpen } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const savedValue = window.localStorage.getItem("ab-sidebar-visible");
    if (savedValue !== null) {
      setIsSidebarVisible(savedValue === "true");
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const setSidebarVisibility = (isVisible: boolean) => {
    setIsSidebarVisible(isVisible);
    window.localStorage.setItem("ab-sidebar-visible", String(isVisible));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-xs text-muted font-light tracking-[0.2em] uppercase">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
