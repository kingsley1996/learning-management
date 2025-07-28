import { Suspense } from 'react';
import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Landing from "@/app/(nondashboard)/landing/page";
import Footer from "@/components/Footer";
import LandingPageLoading from './loading';

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <Suspense fallback={<LandingPageLoading />}>
          <Landing />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
