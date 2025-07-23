import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nondashboard-layout flex min-h-screen flex-col">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
