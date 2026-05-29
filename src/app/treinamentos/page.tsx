import { AuthLayout } from "@/components/auth-layout";
import { trainingModules, documents } from "@/data/trainings";
import { CheckCircle, Clock, Lock, Download, FileText, BookOpen, ArrowRight } from "lucide-react";

const statusConfig = {
  concluido: {
    label: "Concluído",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  "em-andamento": {
    label: "Em Andamento",
    icon: Clock,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  pendente: {
    label: "Pendente",
    icon: Lock,
    color: "text-muted/50",
    bg: "bg-muted/5 border-muted/10",
  },
};

export default function TreinamentosPage() {
  return (
    <AuthLayout>
      <div className="px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-accent uppercase mb-2">
            Capacitação Profissional
          </p>
          <h1
            className="text-4xl font-light text-text-primary leading-none mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Treinamentos &amp; Documentos
          </h1>
          <p className="text-xs text-muted font-light tracking-wider">
            Sua formação contínua como corretor AB INVEST
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />
        </div>

        {/* Training Modules */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={16} strokeWidth={1.5} className="text-accent" />
            <h2
              className="text-2xl font-light text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Módulos de Treinamento
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {trainingModules.map((module) => {
              const status = statusConfig[module.status];
              const StatusIcon = status.icon;

              return (
                <div
                  key={module.id}
                  className="bg-secondary border border-accent/20 rounded-xl p-6 card-gold-hover flex flex-col"
                >
                  {/* Status + Meta */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}
                    >
                      <StatusIcon size={10} strokeWidth={2} />
                      {status.label}
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] text-muted/50 font-light">{module.lessons} aulas</p>
                      <p className="text-[10px] text-muted/50 font-light">{module.duration}</p>
                    </div>
                  </div>

                  <h3
                    className="text-lg font-normal text-text-primary mb-2 leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {module.title}
                  </h3>
                  <p className="text-xs text-muted/60 font-light leading-relaxed mb-5">
                    {module.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-muted/50 font-light">Progresso</span>
                      <span className="text-[10px] text-accent font-medium">{module.progress}%</span>
                    </div>
                    <div className="h-1 bg-muted/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-warm-highlight rounded-full transition-all duration-700"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      className={`w-full flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase py-2.5 rounded-lg transition-all duration-200 ${
                        module.status === "pendente"
                          ? "border border-muted/15 text-muted/30 cursor-not-allowed"
                          : "border border-accent/30 text-accent hover:bg-accent hover:text-primary hover:shadow-[0_0_16px_rgba(201,151,77,0.25)]"
                      }`}
                      disabled={module.status === "pendente"}
                    >
                      {module.status === "concluido" ? "Revisar" : "Acessar"}
                      <ArrowRight size={12} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Documents */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <FileText size={16} strokeWidth={1.5} className="text-accent" />
            <h2
              className="text-2xl font-light text-text-primary"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Documentos
            </h2>
          </div>

          <div className="bg-secondary border border-accent/20 rounded-xl overflow-hidden">
            {documents.map((doc, idx) => (
              <div
                key={doc.id}
                className={`flex items-center gap-4 px-6 py-4 group hover:bg-accent/4 transition-colors duration-200 ${
                  idx < documents.length - 1 ? "border-b border-accent/10" : ""
                }`}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center flex-shrink-0">
                  <FileText size={15} strokeWidth={1.5} className="text-accent/60" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-light text-text-primary truncate">
                    {doc.name}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] text-muted/40 font-light">{doc.date}</span>
                    <span className="w-px h-3 bg-muted/20" />
                    <span className="text-[9px] font-semibold tracking-wider text-accent/50 uppercase border border-accent/15 px-1.5 py-0.5 rounded">
                      {doc.category}
                    </span>
                    <span className="w-px h-3 bg-muted/20" />
                    <span className="text-[10px] text-muted/40 font-light">{doc.size}</span>
                  </div>
                </div>

                {/* Download */}
                <button className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-accent/50 group-hover:text-accent border border-accent/15 group-hover:border-accent/35 px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0">
                  <Download size={11} strokeWidth={2} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AuthLayout>
  );
}
