import { AppShell } from "@/components/app-shell";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
