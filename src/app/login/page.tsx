"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-warm-highlight/5 blur-[80px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/4 blur-[100px]" />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative w-full max-w-[420px] mx-4">
        {/* Card */}
        <div className="bg-secondary border border-accent/20 rounded-2xl p-10 shadow-2xl shadow-black/50">
          {/* Logo area */}
          <div className="text-center mb-10">
            {/* Gold line decoration above */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/50" />
            </div>

            <h1
              className="text-5xl font-light tracking-wide text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              AB INVEST
            </h1>
            <p className="mt-2 text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Casal Corretor
            </p>
            <p className="mt-3 text-xs text-muted font-light tracking-wider">
              Área exclusiva para corretores associados
            </p>

            {/* Gold line decoration below */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/50" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-primary/80 border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-muted/40 font-light
                  focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(201,151,77,0.12)] transition-all duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-primary/80 border border-accent/20 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-muted/40 font-light
                  focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(201,151,77,0.12)] transition-all duration-200"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-xs text-accent/70 hover:text-accent transition-colors duration-200 font-light"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-warm-highlight disabled:opacity-70 text-primary font-semibold text-sm tracking-[0.2em] uppercase
                py-3.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_24px_rgba(201,151,77,0.4)] mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted/50 font-light mt-8">
            Acesso restrito a corretores autorizados
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-muted/30 mt-6 tracking-wider">
          © 2024 AB INVEST · Todos os direitos reservados
        </p>
      </div>
    </main>
  );
}
