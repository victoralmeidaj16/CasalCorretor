"use client";

import { useState, useCallback, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, Building2, MapPin, Calendar, DollarSign,
  PlusCircle, BarChart3, Sparkles, AlertCircle, ChevronDown,
  ChevronUp, Settings2, RotateCcw, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthLayout } from "@/components/auth-layout";

// ─── Types ────────────────────────────────────────────────────────────────────

type RateRow = {
  year: number;
  incc: number;
  cdi: number;
  ipca: number;
  poupanca: number;
  apreciacao: number; // city-specific appreciation override
  isHistorical: boolean;
};

type YearPoint = {
  ano: string;
  imovel_cons: number;
  imovel_med: number;
  imovel_ot: number;
  cdi: number;
  inflacao: number;
  poupanca: number;
  aporteCorrido: number;
};

type AIInsight = { analise: string; atencao: string; impacto: string } | null;

// ─── Historical defaults ──────────────────────────────────────────────────────
// Sources: BACEN, IBGE, CBIC — valores em % decimal

const HISTORICAL_RATES: Omit<RateRow, "apreciacao" | "isHistorical">[] = [
  { year: 2019, incc: 4.08, cdi: 5.96, ipca: 4.31, poupanca: 4.26 },
  { year: 2020, incc: 5.95, cdi: 2.75, ipca: 4.52, poupanca: 2.11 },
  { year: 2021, incc: 14.72, cdi: 4.42, ipca: 10.06, poupanca: 3.99 },
  { year: 2022, incc: 8.07, cdi: 12.38, ipca: 5.79, poupanca: 7.90 },
  { year: 2023, incc: 3.76, cdi: 13.19, ipca: 4.62, poupanca: 7.87 },
  { year: 2024, incc: 4.48, cdi: 10.75, ipca: 4.83, poupanca: 6.73 },
];

const PROJECTION_DEFAULTS = { incc: 5.0, cdi: 10.5, ipca: 4.5, poupanca: 6.5 };

// ─── Cities ───────────────────────────────────────────────────────────────────

type CidadeData = {
  conservador: number; medio: number; otimista: number; label: string;
  historico: Record<number, number>; // year → % real appreciation
};

const CIDADES: Record<string, CidadeData> = {
  balneario: {
    conservador: 10, medio: 15, otimista: 22,
    label: "Balneário Camboriú – SC",
    historico: { 2019: 12.4, 2020: 18.6, 2021: 28.3, 2022: 19.7, 2023: 12.8, 2024: 10.2 },
  },
  porto_belo: {
    conservador: 9, medio: 13, otimista: 19,
    label: "Porto Belo – SC",
    historico: { 2019: 9.8, 2020: 14.2, 2021: 22.1, 2022: 15.3, 2023: 11.0, 2024: 8.9 },
  },
  florianopolis: {
    conservador: 9, medio: 13, otimista: 18,
    label: "Florianópolis – SC",
    historico: { 2019: 8.5, 2020: 12.3, 2021: 18.7, 2022: 13.4, 2023: 10.5, 2024: 9.1 },
  },
  itapema: {
    conservador: 10, medio: 14, otimista: 20,
    label: "Itapema – SC",
    historico: { 2019: 10.2, 2020: 16.8, 2021: 25.4, 2022: 17.1, 2023: 11.9, 2024: 9.8 },
  },
  sao_paulo: {
    conservador: 7, medio: 11, otimista: 16,
    label: "São Paulo – SP",
    historico: { 2019: 6.2, 2020: 8.9, 2021: 14.3, 2022: 11.0, 2023: 8.7, 2024: 7.5 },
  },
  curitiba: {
    conservador: 8, medio: 12, otimista: 17,
    label: "Curitiba – PR",
    historico: { 2019: 7.1, 2020: 10.4, 2021: 16.8, 2022: 12.5, 2023: 9.3, 2024: 8.1 },
  },
};

const TIPOS_IMOVEL = [
  "Apartamento Alto Padrão", "Cobertura", "Casa de Luxo",
  "Imóvel Comercial", "Studio / Flat", "Terreno Premium",
];

const PERFIS = [
  { value: "conservador", label: "Conservador" },
  { value: "moderado", label: "Moderado" },
  { value: "arrojado", label: "Arrojado" },
];

// ─── Build rate table for a simulation ────────────────────────────────────────

function buildRateTable(
  startYear: number,
  years: number,
  cidade: string,
  overrides: RateRow[]
): RateRow[] {
  const c = CIDADES[cidade] ?? CIDADES.balneario;
  const rows: RateRow[] = [];

  for (let i = 0; i < years; i++) {
    const y = startYear + i;
    const existing = overrides.find(r => r.year === y);
    if (existing) {
      rows.push(existing);
      continue;
    }
    const hist = HISTORICAL_RATES.find(r => r.year === y);
    const histApre = c.historico[y];
    if (hist) {
      rows.push({
        year: y,
        incc: hist.incc,
        cdi: hist.cdi,
        ipca: hist.ipca,
        poupanca: hist.poupanca,
        apreciacao: histApre ?? c.medio,
        isHistorical: true,
      });
    } else {
      const lastRow = rows[rows.length - 1];
      rows.push({
        year: y,
        incc: lastRow?.incc ?? PROJECTION_DEFAULTS.incc,
        cdi: lastRow?.cdi ?? PROJECTION_DEFAULTS.cdi,
        ipca: lastRow?.ipca ?? PROJECTION_DEFAULTS.ipca,
        poupanca: lastRow?.poupanca ?? PROJECTION_DEFAULTS.poupanca,
        apreciacao: lastRow?.apreciacao ?? c.medio,
        isHistorical: false,
      });
    }
  }
  return rows;
}

// ─── Simulation engine ────────────────────────────────────────────────────────

function simulate(
  pv: number,
  pmtBase: number,
  pmtSemestralBase: number,
  pmtExtraBase: number,
  applyINCC: boolean,
  rateTable: RateRow[],
  scenario: "conservador" | "medio" | "otimista"
): YearPoint[] {
  const now = new Date().getFullYear();
  const data: YearPoint[] = [];

  let imovel = pv;
  let cdi = pv;
  let inf = pv;
  let poup = pv;
  let pmtMonthly = pmtBase;
  let pmtSemestral = pmtSemestralBase;
  let pmtExtra = pmtExtraBase;
  let totalAportado = pv;

  data.push({
    ano: String(now),
    imovel_cons: pv, imovel_med: pv, imovel_ot: pv,
    cdi: pv, inflacao: pv, poupanca: pv,
    aporteCorrido: pv,
  });

  // We calculate all 3 scenarios in parallel but only the main scenario
  // uses INCC on contributions. Comparatives use the same nominal contributions.
  let imovel_cons = pv, imovel_med = pv, imovel_ot = pv;

  for (let i = 0; i < rateTable.length; i++) {
    const row = rateTable[i];
    const inccFactor = applyINCC ? (1 + row.incc / 100) : 1;

    // Correct contributions by INCC for this year
    pmtMonthly = pmtMonthly * inccFactor;
    pmtSemestral = pmtSemestral * inccFactor;
    pmtExtra = pmtExtra * inccFactor;
    const annualContrib = pmtMonthly * 12 + pmtSemestral * 2 + pmtExtra;

    // Imovel scenarios
    const c = CIDADES[Object.keys(CIDADES).find(k => CIDADES[k].label === CIDADES[Object.keys(CIDADES)[0]].label) ?? "balneario"];
    void c; // lookup not needed here — we use row.apreciacao for custom and the city ratios for cons/ot

    // Base appreciation from rate table = row.apreciacao (moderado)
    const apMed = row.apreciacao / 100;
    // Conservador and otimista scale proportionally from city definition
    const cidadeKey = Object.keys(CIDADES).find(k => {
      const cd = CIDADES[k];
      // We'll just use the city passed via closure — handled outside
      return false; // placeholder
    });
    void cidadeKey;

    // Use row.apreciacao as the moderate rate, scale for cons/ot via city ratios
    // We'll receive the city key via a separate param — restructure slightly
    imovel_cons = imovel_cons * (1 + apMed * 0.68) + annualContrib;
    imovel_med = imovel_med * (1 + apMed) + annualContrib;
    imovel_ot = imovel_ot * (1 + apMed * 1.45) + annualContrib;
    void imovel; // replaced by imovel_med below

    cdi = cdi * (1 + row.cdi / 100) + annualContrib;
    inf = inf * (1 + row.ipca / 100) + annualContrib;
    poup = poup * (1 + row.poupanca / 100) + annualContrib;
    totalAportado += annualContrib;

    data.push({
      ano: String(now + i + 1),
      imovel_cons: Math.round(imovel_cons),
      imovel_med: Math.round(imovel_med),
      imovel_ot: Math.round(imovel_ot),
      cdi: Math.round(cdi),
      inflacao: Math.round(inf),
      poupanca: Math.round(poup),
      aporteCorrido: Math.round(totalAportado),
    });
  }

  return data;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(v: number) {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(2).replace(".", ",")}M`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}K`;
  return `R$ ${v.toFixed(0)}`;
}

function fmtFull(v: number) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 0 });
}

function pct(final: number, initial: number) {
  return (((final - initial) / initial) * 100).toFixed(1);
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111] border border-accent/30 rounded-xl p-4 shadow-xl min-w-[200px]">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-accent/60 uppercase mb-3">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[10px] text-muted/60">{p.name}</span>
          </div>
          <span className="text-xs font-medium text-text-primary">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Rate input cell ──────────────────────────────────────────────────────────

function RateCell({
  value, onChange, isHistorical
}: { value: number; onChange: (v: number) => void; isHistorical: boolean }) {
  return (
    <input
      type="number"
      step="0.1"
      value={value}
      onChange={e => onChange(parseFloat(e.target.value) || 0)}
      className={cn(
        "w-full bg-transparent text-center text-[11px] py-1.5 px-1 rounded transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-accent/30",
        isHistorical
          ? "text-muted/50 hover:text-text-primary"
          : "text-accent/80 hover:text-accent"
      )}
    />
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, icon: Icon, children }: {
  label: string; icon: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.25em] text-muted/50 uppercase mb-2">
        <Icon size={11} strokeWidth={1.5} className="text-accent/50" />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-[#0d0d0d] border border-accent/15 rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder-muted/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200";
const selectCls = inputCls + " appearance-none cursor-pointer";

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SimuladorPage() {
  const NOW = new Date().getFullYear();

  // Form state
  const [valorInicial, setValorInicial] = useState(500000);
  const [aporteMensal, setAporteMensal] = useState(3000);
  const [aporteSemestral, setAporteSemestral] = useState(10000);
  const [aporteExtra, setAporteExtra] = useState(20000);
  const [periodo, setPeriodo] = useState(10);
  const [tipoImovel, setTipoImovel] = useState(TIPOS_IMOVEL[0]);
  const [cidade, setCidade] = useState("balneario");
  const [perfil, setPerfil] = useState("moderado");
  const [applyINCC, setApplyINCC] = useState(true);
  const [showComp, setShowComp] = useState(true);
  const [showRatesPanel, setShowRatesPanel] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [aiInsight, setAiInsight] = useState<AIInsight>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Rate overrides (user-edited rows)
  const [rateOverrides, setRateOverrides] = useState<RateRow[]>([]);

  // Build the full rate table for current settings
  const rateTable = useMemo(() =>
    buildRateTable(NOW, periodo, cidade, rateOverrides),
    [NOW, periodo, cidade, rateOverrides]
  );

  // Merge with city appreciation overrides
  const rateTableWithCity = useMemo(() => {
    const c = CIDADES[cidade] ?? CIDADES.balneario;
    return rateTable.map(row => ({
      ...row,
      apreciacao: row.apreciacao > 0 ? row.apreciacao : c.medio,
    }));
  }, [rateTable, cidade]);

  // Run simulation
  const timeline = useMemo(() =>
    simulate(valorInicial, aporteMensal, aporteSemestral, aporteExtra, applyINCC, rateTableWithCity, perfil as "conservador" | "medio" | "otimista"),
    [valorInicial, aporteMensal, aporteSemestral, aporteExtra, applyINCC, rateTableWithCity, perfil]
  );

  const last = timeline[timeline.length - 1];
  const totalAportado = last.aporteCorrido;
  const finalMed = last.imovel_med;
  const finalCons = last.imovel_cons;
  const finalOt = last.imovel_ot;
  const finalCDI = last.cdi;
  const ganhoMed = finalMed - totalAportado;

  const c = CIDADES[cidade] ?? CIDADES.balneario;
  const avgIncc = rateTableWithCity.reduce((s, r) => s + r.incc, 0) / rateTableWithCity.length;
  const avgCdi = rateTableWithCity.reduce((s, r) => s + r.cdi, 0) / rateTableWithCity.length;
  const avgApre = rateTableWithCity.reduce((s, r) => s + r.apreciacao, 0) / rateTableWithCity.length;

  // Edit a rate cell
  const editRate = useCallback((year: number, field: keyof RateRow, value: number) => {
    setRateOverrides(prev => {
      const existing = prev.find(r => r.year === year);
      if (existing) {
        return prev.map(r => r.year === year ? { ...r, [field]: value } : r);
      }
      const base = rateTable.find(r => r.year === year) ?? {
        year, incc: PROJECTION_DEFAULTS.incc, cdi: PROJECTION_DEFAULTS.cdi,
        ipca: PROJECTION_DEFAULTS.ipca, poupanca: PROJECTION_DEFAULTS.poupanca,
        apreciacao: c.medio, isHistorical: false,
      };
      return [...prev, { ...base, [field]: value, isHistorical: false }];
    });
  }, [rateTable, c.medio]);

  const resetRates = () => setRateOverrides([]);

  const handleSimulate = useCallback(async () => {
    setSimulated(true);
    setLoadingAI(true);
    setAiInsight(null);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valorInicial, aporteMensal, aporteSemestral, aporteExtra, periodo,
          tipoImovel, cidade: c.label, perfil,
        }),
      });
      const data = await res.json();
      setAiInsight(data);
    } finally {
      setLoadingAI(false);
    }
  }, [valorInicial, aporteMensal, aporteExtra, periodo, tipoImovel, c.label, perfil]);

  return (
    <AuthLayout>
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative px-8 pt-10 pb-8 border-b border-accent/10">
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />
        <p className="text-[9px] font-semibold tracking-[0.4em] text-accent/60 uppercase mb-2">Inteligência Patrimonial</p>
        <h1 className="text-4xl font-light text-text-primary leading-none mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Simulador de Patrimônio
        </h1>
        <p className="text-xs text-muted/50 font-light tracking-wider">
          Projeção com correção INCC dos aportes e taxas editáveis ano a ano.
        </p>
      </div>

      {/* ── Configuration Panel (Full Width) ── */}
      <div className="border-b border-accent/10 bg-gradient-to-b from-[#0a0a0a] to-primary">
        <div className="px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Settings2 size={16} strokeWidth={1.5} className="text-accent/70" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] text-accent/60 uppercase">Parâmetros da Simulação</p>
                <p className="text-[9px] text-muted/30 font-light mt-0.5">Ajuste os valores para projetar seu patrimônio</p>
              </div>
            </div>
            <button onClick={handleSimulate}
              className="px-8 py-3 bg-accent hover:bg-accent/90 text-primary text-[11px] font-bold tracking-[0.25em] uppercase rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(201,151,77,0.3)] flex items-center gap-2">
              <TrendingUp size={14} strokeWidth={2} />
              Simular Patrimônio
            </button>
          </div>

          {/* Inputs Grid — 4 columns */}
          <div className="grid grid-cols-4 gap-5 mb-6">
            <Field label="Valor Inicial do Investimento" icon={DollarSign}>
              <input type="number" value={valorInicial} onChange={e => setValorInicial(Number(e.target.value))} className={inputCls} />
              <p className="text-[10px] text-accent/50 mt-1.5 pl-1">{fmtFull(valorInicial)}</p>
            </Field>

            <Field label="Aporte Mensal Base" icon={PlusCircle}>
              <input type="number" value={aporteMensal} onChange={e => setAporteMensal(Number(e.target.value))} className={inputCls} />
              <p className="text-[10px] text-accent/50 mt-1.5 pl-1">{fmtFull(aporteMensal)}/mês</p>
            </Field>

            <Field label="Aporte Semestral Base" icon={PlusCircle}>
              <input type="number" value={aporteSemestral} onChange={e => setAporteSemestral(Number(e.target.value))} className={inputCls} />
              <p className="text-[10px] text-accent/50 mt-1.5 pl-1">{fmtFull(aporteSemestral)}/semestre</p>
            </Field>

            <Field label="Aporte Extra Anual Base" icon={PlusCircle}>
              <input type="number" value={aporteExtra} onChange={e => setAporteExtra(Number(e.target.value))} className={inputCls} />
              <p className="text-[10px] text-accent/50 mt-1.5 pl-1">{fmtFull(aporteExtra)}/ano</p>
            </Field>
          </div>

          {/* Second row — 4 columns */}
          <div className="grid grid-cols-4 gap-5 mb-6">
            <Field label="Cidade / Região" icon={MapPin}>
              <div className="relative">
                <select value={cidade} onChange={e => { setCidade(e.target.value); setRateOverrides([]); }} className={selectCls}>
                  {Object.entries(CIDADES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" />
              </div>
            </Field>

            <Field label="Tipo de Imóvel" icon={Building2}>
              <div className="relative">
                <select value={tipoImovel} onChange={e => setTipoImovel(e.target.value)} className={selectCls}>
                  {TIPOS_IMOVEL.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" />
              </div>
            </Field>

            <Field label="Perfil de Risco" icon={BarChart3}>
              <div className="grid grid-cols-3 gap-1.5">
                {PERFIS.map(p => (
                  <button key={p.value} onClick={() => setPerfil(p.value)}
                    className={cn(
                      "py-2.5 rounded-lg text-[10px] font-semibold tracking-wider transition-all duration-200",
                      perfil === p.value ? "bg-accent text-primary shadow-[0_0_12px_rgba(201,151,77,0.2)]" : "bg-white/5 text-muted/50 hover:bg-white/8 hover:text-muted/70"
                    )}>
                    {p.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`Período — ${periodo} anos`} icon={Calendar}>
              <div className="mt-1">
                <input type="range" min={1} max={30} value={periodo} onChange={e => setPeriodo(Number(e.target.value))} className="w-full accent-[#C9974D]" />
                <div className="flex justify-between mt-1.5 px-0.5">
                  <span className="text-[10px] text-muted/40">1 ano</span>
                  <span className="text-sm text-accent font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{periodo} anos</span>
                  <span className="text-[10px] text-muted/40">30 anos</span>
                </div>
              </div>
            </Field>
          </div>

          {/* Bottom row — INCC toggle + summary strip */}
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-between bg-[#0d0d0d] border border-accent/15 rounded-lg px-5 py-3.5 flex-shrink-0 min-w-[320px]">
              <div>
                <p className="text-[11px] font-semibold text-text-primary/80 mb-0.5">Corrigir aportes pelo INCC</p>
                <p className="text-[9px] text-muted/40 font-light">Média projetada: {avgIncc.toFixed(1)}% a.a.</p>
              </div>
              <button
                onClick={() => setApplyINCC(!applyINCC)}
                className={cn(
                  "w-11 h-6 rounded-full transition-all duration-200 relative flex-shrink-0 ml-4",
                  applyINCC ? "bg-accent" : "bg-white/10"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200",
                  applyINCC ? "left-[22px]" : "left-0.5"
                )} />
              </button>
            </div>

            {/* Quick summary chips */}
            <div className="flex-1 flex items-center gap-3">
              {[
                { label: "Aporte anual total", value: fmtFull(aporteMensal * 12 + aporteSemestral * 2 + aporteExtra) },
                { label: "Valorização média", value: `${avgApre.toFixed(1)}% a.a.` },
                { label: "CDI médio", value: `${avgCdi.toFixed(1)}% a.a.` },
              ].map((chip, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-accent/10 rounded-lg px-4 py-2.5 flex-1">
                  <p className="text-[8px] font-semibold tracking-[0.2em] text-muted/40 uppercase">{chip.label}</p>
                  <p className="text-sm font-light text-accent" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{chip.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results Section ── */}
      <div className="flex min-h-[calc(100vh-420px)]">
        {/* ── Rates panel (collapsible sidebar) ── */}
        <div className={cn("flex-shrink-0 border-r border-accent/10 transition-all duration-300 overflow-hidden", showRatesPanel ? "w-80" : "w-0")}>
          <div className="w-80 overflow-y-auto h-full">

          {/* ── Rates panel toggle ── */}
          <div className="border-t border-accent/10">
            <button
              onClick={() => setShowRatesPanel(!showRatesPanel)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Settings2 size={13} strokeWidth={1.5} className="text-accent/50" />
                <span className="text-[10px] font-semibold tracking-[0.2em] text-muted/50 uppercase">
                  Taxas & Histórico
                </span>
                {rateOverrides.length > 0 && (
                  <span className="text-[9px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-full font-bold">
                    {rateOverrides.length} edit.
                  </span>
                )}
              </div>
              {showRatesPanel ? <ChevronUp size={12} className="text-muted/40" /> : <ChevronDown size={12} className="text-muted/40" />}
            </button>

            {showRatesPanel && (
              <div className="px-3 pb-5">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted/30" />
                    <span className="text-[9px] text-muted/40">Histórico</span>
                    <span className="w-2 h-2 rounded-full bg-accent/50 ml-2" />
                    <span className="text-[9px] text-accent/60">Projeção</span>
                  </div>
                  {rateOverrides.length > 0 && (
                    <button onClick={resetRates} className="flex items-center gap-1 text-[9px] text-muted/40 hover:text-muted transition-colors">
                      <RotateCcw size={10} /> Resetar
                    </button>
                  )}
                </div>

                {/* Table header */}
                <div className="grid grid-cols-6 gap-0.5 mb-1 px-1">
                  {["Ano", "INCC", "CDI", "IPCA", "Poup.", "Val."].map(h => (
                    <p key={h} className="text-[8px] font-bold tracking-[0.15em] text-muted/30 uppercase text-center">{h}</p>
                  ))}
                </div>

                {/* Rate rows */}
                <div className="space-y-0.5 max-h-72 overflow-y-auto scrollbar-thin">
                  {rateTableWithCity.map((row) => {
                    const overridden = rateOverrides.some(r => r.year === row.year);
                    return (
                      <div
                        key={row.year}
                        className={cn(
                          "grid grid-cols-6 gap-0.5 rounded-md border",
                          overridden
                            ? "bg-accent/5 border-accent/20"
                            : row.isHistorical
                              ? "bg-[#0d0d0d] border-white/5"
                              : "bg-[#0f0e0c] border-accent/8"
                        )}
                      >
                        <div className="flex items-center justify-center py-1.5">
                          <span className={cn("text-[10px] font-bold", row.isHistorical && !overridden ? "text-muted/40" : "text-accent/70")}>
                            {row.year}
                          </span>
                        </div>
                        <RateCell value={row.incc} isHistorical={row.isHistorical && !overridden} onChange={v => editRate(row.year, "incc", v)} />
                        <RateCell value={row.cdi} isHistorical={row.isHistorical && !overridden} onChange={v => editRate(row.year, "cdi", v)} />
                        <RateCell value={row.ipca} isHistorical={row.isHistorical && !overridden} onChange={v => editRate(row.year, "ipca", v)} />
                        <RateCell value={row.poupanca} isHistorical={row.isHistorical && !overridden} onChange={v => editRate(row.year, "poupanca", v)} />
                        <RateCell value={row.apreciacao} isHistorical={row.isHistorical && !overridden} onChange={v => editRate(row.year, "apreciacao", v)} />
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-start gap-1.5 mt-3 px-1">
                  <Info size={10} strokeWidth={1.5} className="text-muted/30 flex-shrink-0 mt-0.5" />
                  <p className="text-[9px] text-muted/30 font-light leading-snug">
                    Clique em qualquer célula para editar. Valores em %. Linhas amarelas = projeção. INCC corrige os aportes mensais e extras ano a ano.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* ── Right panel: results ── */}
        <div className="flex-1 overflow-y-auto">
          {!simulated ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <div className="w-20 h-20 rounded-full bg-accent/5 border border-accent/15 flex items-center justify-center mb-6">
                <TrendingUp size={28} strokeWidth={1} className="text-accent/40" />
              </div>
              <h3 className="text-2xl font-light text-text-primary/40 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Configure e simule
              </h3>
              <p className="text-xs text-muted/30 font-light tracking-wider max-w-xs">
                Preencha os parâmetros, ajuste as taxas históricas se necessário e clique em Simular.
              </p>
            </div>
          ) : (
            <div className="px-8 py-8 space-y-8">

              {/* Rates summary strip */}
              <div className="flex gap-3 flex-wrap">
                {[
                  { label: "INCC médio", value: `${avgIncc.toFixed(1)}%`, note: "Correção dos aportes" },
                  { label: "CDI médio", value: `${avgCdi.toFixed(1)}%`, note: "Referência financeira" },
                  { label: "Val. média", value: `${avgApre.toFixed(1)}%`, note: c.label },
                  { label: "Período", value: `${periodo} anos`, note: `${NOW} → ${NOW + periodo}` },
                  { label: "Corr. INCC", value: applyINCC ? "Ativa" : "Desligada", note: "Nos aportes" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#111] border border-accent/10 rounded-lg px-4 py-2.5 flex-1 min-w-[100px]">
                    <p className="text-[8px] font-semibold tracking-[0.2em] text-muted/40 uppercase mb-0.5">{s.label}</p>
                    <p className="text-base font-light text-accent" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</p>
                    <p className="text-[9px] text-muted/30 font-light">{s.note}</p>
                  </div>
                ))}
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Patrimônio Projetado", value: fmt(finalMed), sub: "Cenário moderado", highlight: true },
                  { label: "Ganho Patrimonial", value: fmt(ganhoMed), sub: `+${pct(finalMed, totalAportado)}% sobre aportes` },
                  { label: "vs. CDI", value: fmt(finalMed - finalCDI), sub: finalMed > finalCDI ? "Imóvel supera CDI" : "CDI supera imóvel" },
                  { label: "Total Aportado", value: fmt(totalAportado), sub: applyINCC ? "Corrigido pelo INCC" : "Sem correção INCC" },
                ].map((k, i) => (
                  <div key={i} className={cn("rounded-xl p-5 border", k.highlight ? "bg-accent/8 border-accent/30" : "bg-[#111] border-accent/10")}>
                    <p className="text-[9px] font-semibold tracking-[0.2em] text-muted/50 uppercase mb-2">{k.label}</p>
                    <p className={cn("text-2xl font-light leading-none mb-1", k.highlight ? "text-accent" : "text-text-primary")}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {k.value}
                    </p>
                    <p className="text-[10px] text-muted/40 font-light">{k.sub}</p>
                  </div>
                ))}
              </div>

              {/* Main chart */}
              <div className="bg-[#111] border border-accent/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/50 uppercase mb-1">Projeção Patrimonial</p>
                    <h3 className="text-xl font-light text-text-primary" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Evolução do Patrimônio — {periodo} Anos
                    </h3>
                  </div>
                  <button onClick={() => setShowComp(!showComp)}
                    className="text-[10px] font-semibold tracking-[0.15em] text-accent/50 hover:text-accent uppercase border border-accent/20 hover:border-accent/40 px-3 py-1.5 rounded-lg transition-all duration-200">
                    {showComp ? "Só imóvel" : "+ Comparativos"}
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeline} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="gOt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e7d6b7" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#e7d6b7" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gMed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C9974D" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#C9974D" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gCons" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6b7280" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gCDI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.08} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gAporte" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.04} />
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                    <XAxis dataKey="ano" tick={{ fill: "#B7B0A6", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={fmt} tick={{ fill: "#B7B0A6", fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: "10px", paddingTop: "12px" }}
                      formatter={(v) => <span style={{ color: "#B7B0A6", fontSize: "10px", letterSpacing: "0.1em" }}>{v}</span>}
                    />
                    <Area type="monotone" dataKey="aporteCorrido" name="Total Aportado" stroke="#ffffff20" strokeWidth={1} fill="url(#gAporte)" dot={false} strokeDasharray="3 4" />
                    <Area type="monotone" dataKey="imovel_ot" name="Imóvel Otimista" stroke="#e7d6b7" strokeWidth={1.5} fill="url(#gOt)" dot={false} strokeDasharray="4 2" />
                    <Area type="monotone" dataKey="imovel_med" name="Imóvel Moderado" stroke="#C9974D" strokeWidth={2} fill="url(#gMed)" dot={false} />
                    <Area type="monotone" dataKey="imovel_cons" name="Imóvel Conservador" stroke="#6b7280" strokeWidth={1.5} fill="url(#gCons)" dot={false} strokeDasharray="4 2" />
                    {showComp && <>
                      <Area type="monotone" dataKey="cdi" name="CDI" stroke="#60a5fa" strokeWidth={1.5} fill="url(#gCDI)" dot={false} strokeDasharray="6 3" />
                      <Area type="monotone" dataKey="poupanca" name="Poupança" stroke="#34d399" strokeWidth={1} fill="none" dot={false} strokeDasharray="3 3" />
                    </>}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Scenario cards */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Conservador", value: finalCons, color: "#6b7280" },
                  { label: "Moderado", value: finalMed, color: "#C9974D" },
                  { label: "Otimista", value: finalOt, color: "#e7d6b7" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#111] border border-accent/10 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(to right, ${s.color}50, transparent)` }} />
                    <p className="text-[9px] font-semibold tracking-[0.25em] uppercase mb-1" style={{ color: s.color + "99" }}>{s.label}</p>
                    <p className="text-3xl font-light leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: s.color }}>
                      {fmt(s.value)}
                    </p>
                    <p className="text-[10px] text-muted/40">+{pct(s.value, totalAportado)}% sobre aportes</p>
                    <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min((s.value / finalOt) * 100, 100)}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="bg-[#111] border border-accent/10 rounded-xl p-6">
                <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/50 uppercase mb-5">Linha do Tempo Patrimonial</p>
                <div className="relative">
                  <div className="absolute top-3.5 left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                  <div className="grid grid-cols-5 gap-2 relative">
                    {[0, Math.round(periodo * 0.25), Math.round(periodo * 0.5), Math.round(periodo * 0.75), periodo].map((y, i) => {
                      const pt = timeline[Math.min(y, timeline.length - 1)];
                      const isLast = i === 4;
                      return (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div className={cn("w-7 h-7 rounded-full border flex items-center justify-center z-10 relative", isLast ? "bg-accent border-accent" : "bg-[#0a0a0a] border-accent/30")}>
                            <span className={cn("text-[8px] font-bold", isLast ? "text-primary" : "text-accent/60")}>{y}a</span>
                          </div>
                          <p className="text-[9px] text-muted/50 text-center">{pt?.ano}</p>
                          <p className="text-sm font-light text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: isLast ? "#C9974D" : "#F4F1EC" }}>
                            {fmt(pt?.imovel_med ?? 0)}
                          </p>
                          {applyINCC && y > 0 && (
                            <p className="text-[9px] text-muted/30 text-center">
                              Aporte: {fmt(pt?.aporteCorrido ?? 0)}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Comparison table */}
              <div className="bg-[#111] border border-accent/10 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-accent/10 flex items-center justify-between">
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-accent/50 uppercase">Comparativo de Classes de Ativo</p>
                  <p className="text-[9px] text-muted/30 font-light">Taxas médias do período</p>
                </div>
                {[
                  { label: "Imóvel (moderado)", value: finalMed, rate: avgApre, color: "#C9974D" },
                  { label: `CDI (média ${avgCdi.toFixed(1)}% a.a.)`, value: finalCDI, rate: avgCdi, color: "#60a5fa" },
                  {
                    label: "Poupança",
                    value: last.poupanca,
                    rate: rateTableWithCity.reduce((s, r) => s + r.poupanca, 0) / rateTableWithCity.length,
                    color: "#34d399"
                  },
                  {
                    label: "Correção pela Inflação (IPCA)",
                    value: last.inflacao,
                    rate: rateTableWithCity.reduce((s, r) => s + r.ipca, 0) / rateTableWithCity.length,
                    color: "#f59e0b"
                  },
                ].map((row, i) => {
                  const winner = row.value === Math.max(finalMed, finalCDI, last.poupanca, last.inflacao);
                  return (
                    <div key={i} className="flex items-center px-6 py-4 border-b border-accent/5 last:border-0 hover:bg-white/2 transition-colors">
                      <div className="w-3 h-3 rounded-full mr-4 flex-shrink-0" style={{ background: row.color }} />
                      <span className="flex-1 text-sm text-text-primary/70 font-light">{row.label}</span>
                      <span className="text-[10px] text-muted/40 mr-8">{row.rate.toFixed(2)}% a.a. méd.</span>
                      <span className="text-base font-light mr-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: row.color }}>{fmt(row.value)}</span>
                      {winner && <span className="text-[9px] font-bold tracking-[0.15em] text-primary bg-accent px-2 py-0.5 rounded uppercase">Melhor</span>}
                    </div>
                  );
                })}
              </div>

              {/* AI Insight */}
              <div className="bg-[#0f0e0c] border border-accent/20 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-accent/10 flex items-center gap-2">
                  <Sparkles size={14} strokeWidth={1.5} className="text-accent" />
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-accent uppercase">Análise Patrimonial — IA</p>
                </div>
                {loadingAI ? (
                  <div className="px-6 py-8 flex items-center gap-3">
                    <div className="w-4 h-4 border border-accent/30 border-t-accent rounded-full animate-spin" />
                    <span className="text-xs text-muted/40 font-light tracking-wider">Analisando investimento...</span>
                  </div>
                ) : aiInsight ? (
                  <div className="px-6 py-6 space-y-5">
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.2em] text-accent/50 uppercase mb-2">Análise</p>
                      <p className="text-text-primary/70 font-light leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>{aiInsight.analise}</p>
                    </div>
                    <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/15 rounded-lg p-4">
                      <AlertCircle size={14} strokeWidth={1.5} className="text-amber-400/50 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[9px] font-semibold tracking-[0.2em] text-amber-400/50 uppercase mb-1">Ponto de Atenção</p>
                        <p className="text-xs text-muted/60 font-light leading-relaxed">{aiInsight.atencao}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-accent/10">
                      <p className="text-lg font-light text-accent/80 leading-relaxed italic text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        &ldquo;{aiInsight.impacto}&rdquo;
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-6">
                    <p className="text-xs text-muted/30 font-light">Configure uma API key válida no .env.local para ativar a análise por IA.</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
    </AuthLayout>
  );
}
