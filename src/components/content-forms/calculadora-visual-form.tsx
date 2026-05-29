"use client";

import { useState, useMemo } from "react";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  onGenerate: (formData: Record<string, unknown>, prompt: string) => void;
  isLoading: boolean;
  hasBrokerPhotos: boolean;
}

const PERIODOS = [5, 10, 15, 20];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CalculadoraVisualForm({ onGenerate, isLoading }: Props) {
  const [valor, setValor] = useState("500000");
  const [periodo, setPeriodo] = useState(10);

  const valorNum = parseFloat(valor.replace(/\D/g, "")) || 0;

  const chartData = useMemo(() => {
    const points = [];
    for (let ano = 0; ano <= periodo; ano++) {
      points.push({
        ano: `Ano ${ano}`,
        "Imóvel BC (+11%/a)": Math.round(valorNum * Math.pow(1.11, ano)),
        "CDI (10.5%/a)": Math.round(valorNum * Math.pow(1.105, ano)),
        "Poupança (6.2%/a)": Math.round(valorNum * Math.pow(1.062, ano)),
      });
    }
    return points;
  }, [valorNum, periodo]);

  const finalImovel = valorNum * Math.pow(1.11, periodo);
  const finalCdi = valorNum * Math.pow(1.105, periodo);
  const finalPoupanca = valorNum * Math.pow(1.062, periodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = `Crie um post de comparativo de investimento para Instagram mostrando por que imóvel é superior à renda fixa:

Capital inicial: ${formatCurrency(valorNum)}
Período: ${periodo} anos

Resultados da simulação:
- Imóvel em Balneário Camboriú (11% a.a.): ${formatCurrency(finalImovel)}
- CDI (10,5% a.a.): ${formatCurrency(finalCdi)}
- Poupança (6,2% a.a.): ${formatCurrency(finalPoupanca)}

O post deve:
1. Apresentar os números de forma impactante e clara
2. Destacar os benefícios ALÉM do rendimento (moradia, aluguel, ativo real, proteção inflação)
3. Contextualizar que imóvel é financiável (comprou com entrada, não precisa de 100% do capital)
4. Terminar com CTA para simulação personalizada

Tom: educativo e estratégico, não alarmista. Mostre que imóvel é inteligente, não que renda fixa é ruim.

Retorne JSON com 'content' (post completo com os dados e análise) e 'suggestions' (4 variações de CTA para testar).`;

    onGenerate({ valor: valorNum, periodo, finalImovel, finalCdi, finalPoupanca }, prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Capital Inicial (R$)
          </label>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value.replace(/\D/g, ""))}
            placeholder="500000"
            className="w-full bg-white/3 border border-accent/20 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
            Período (anos)
          </label>
          <div className="flex gap-2">
            {PERIODOS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriodo(p)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  periodo === p
                    ? "bg-accent text-[#050505]"
                    : "bg-white/3 border border-accent/20 text-muted hover:text-text-primary"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live chart */}
      <div className="bg-white/2 border border-accent/10 rounded-lg p-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted/50 font-medium mb-1">
          Simulação ao Vivo — {periodo} anos
        </p>
        <div className="grid grid-cols-3 gap-3 mb-3 text-center">
          {[
            { label: "Imóvel BC", value: finalImovel, color: "#C9974D" },
            { label: "CDI", value: finalCdi, color: "#60A5FA" },
            { label: "Poupança", value: finalPoupanca, color: "#6B7280" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white/3 rounded-lg p-2">
              <p className="text-[9px] uppercase tracking-wider" style={{ color }}>{label}</p>
              <p className="text-sm font-semibold text-text-primary mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {formatCurrency(value)}
              </p>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="gradImovel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9974D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C9974D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="ano" tick={{ fontSize: 9, fill: "#B7B0A6" }} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 9, fill: "#B7B0A6" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
            <Tooltip
              contentStyle={{ background: "#111", border: "1px solid rgba(201,151,77,0.2)", borderRadius: 8, fontSize: 11 }}
              formatter={(v) => [formatCurrency(Number(v))]}
            />
            <Area type="monotone" dataKey="Imóvel BC (+11%/a)" stroke="#C9974D" fill="url(#gradImovel)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="CDI (10.5%/a)" stroke="#60A5FA" fill="none" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
            <Area type="monotone" dataKey="Poupança (6.2%/a)" stroke="#6B7280" fill="none" strokeWidth={1} strokeDasharray="2 2" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button
        type="submit"
        disabled={isLoading || valorNum === 0}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200",
          isLoading || valorNum === 0
            ? "bg-accent/20 text-accent/40 cursor-not-allowed"
            : "bg-accent text-[#050505] hover:bg-accent/90"
        )}
      >
        <Wand2 size={15} strokeWidth={1.5} />
        {isLoading ? "Gerando..." : "Gerar Post Comparativo"}
      </button>
    </form>
  );
}
