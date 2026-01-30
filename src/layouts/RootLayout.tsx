import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-surface text-slate-900 font-sans selection:bg-primary-blue/20 flex flex-col">
      <Navbar />
      <main className={`flex-grow ${isHome ? 'pt-0' : 'pt-24'} pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
