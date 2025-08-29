"use client";

import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./mobile/MobileNav";
import { Suspense, lazy } from "react";
import { Loading } from "@/components/ui/Loading";
import dynamic from "next/dynamic";

// Lazy loading dos componentes principais com next/dynamic
const LazySidebar = dynamic(
  () => import("./Sidebar").then((mod) => mod.Sidebar),
  {
    ssr: false,
    loading: () => <Loading type="skeleton" className="h-screen" />,
  }
);
const LazyHeader = dynamic(() => import("./Header").then((mod) => mod.Header), {
  ssr: false,
  loading: () => <Loading type="skeleton" className="h-16" />,
});

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <LazySidebar user={user} />
      <div className="lg:pl-64 pb-20 lg:pb-0">
        <LazyHeader user={user} />
        <main className="">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
