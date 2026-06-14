import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
