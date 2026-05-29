import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle?: string;
}

export function StatCard({ icon: Icon, label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-secondary border border-accent/20 rounded-xl p-6 card-gold-hover flex-1 min-w-0">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase mb-3">
            {label}
          </p>
          <p
            className="text-3xl font-light text-text-primary leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted/60 mt-2 font-light">{subtitle}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-accent/8 border border-accent/20 flex items-center justify-center flex-shrink-0">
          <Icon size={18} strokeWidth={1.5} className="text-accent" />
        </div>
      </div>
    </div>
  );
}
