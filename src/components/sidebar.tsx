"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FolderOpen,
  BookOpen,
  MessageSquareQuote,
  TrendingUp,
  LogOut,
  Wand2,
  UserCircle,
  PanelLeftClose,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/imoveis", label: "Imóveis", icon: Building2 },
  { href: "/materiais", label: "Materiais", icon: FolderOpen },
  { href: "/treinamentos", label: "Treinamentos", icon: BookOpen },
  { href: "/argumentos", label: "Argumentos", icon: MessageSquareQuote },
  { href: "/simulador", label: "Simulador", icon: TrendingUp },
  { href: "/conteudo", label: "Conteúdo", icon: Wand2 },
  { href: "/perfil-corretor", label: "Perfil Corretor", icon: UserCircle },
];

export function Sidebar({ onHide }: { onHide?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-accent/10 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-accent/10 relative">
        {onHide && (
          <button
            type="button"
            onClick={onHide}
            aria-label="Esconder menu lateral"
            title="Esconder menu"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted/60 transition-colors hover:bg-white/5 hover:text-accent"
          >
            <PanelLeftClose size={17} strokeWidth={1.6} />
          </button>
        )}
        <Image
          src="/logo.jpg"
          alt="AB Invest Group"
          width={160}
          height={160}
          className="w-full max-w-[140px] mx-auto rounded-sm"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-[9px] font-semibold tracking-[0.25em] text-muted/40 uppercase px-3 mb-4">
          Menu Principal
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "text-accent bg-accent/8"
                  : "text-muted hover:text-text-primary hover:bg-white/3"
              )}
            >
              {/* Active left border */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r" />
              )}
              <Icon
                size={17}
                strokeWidth={1.5}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-accent" : "text-muted/60 group-hover:text-accent/70"
                )}
              />
              <span className="tracking-wide">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="px-4 py-5 border-t border-accent/10">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-accent/5 border border-accent/10">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/30 to-warm-highlight/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
            <span className="text-accent text-sm font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>VA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">Victor Almeida</p>
            <p className="text-[10px] text-muted/60 tracking-wider truncate">Corretor Associado</p>
          </div>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-2 px-3 py-2.5 mt-2 rounded-lg text-xs text-muted/50 hover:text-muted transition-colors duration-200"
        >
          <LogOut size={14} strokeWidth={1.5} />
          <span className="tracking-wide">Sair</span>
        </Link>
      </div>
    </aside>
  );
}
