"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Users2,
  Settings,
  Plus,
  UserCircle2,
  House,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Map de rotas conforme regra pedida para o dashboard (funcionário, agendamentos, painel, usuários, configurações)
  const base =
    user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
      ? "/dashboard/admin"
      : user?.role === "EMPLOYEE"
      ? "/dashboard/employee"
      : user?.role === "CLIENT"
      ? "/dashboard/client"
      : "/dashboard";

  const items = (() => {
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
      return [
        { href: `${base}/employees`, icon: Users2, label: "Funcionários" },
        {
          href: `${base}/appointments`,
          icon: CalendarDays,
          label: "Agendamentos",
        },
        { href: base, icon: House, label: "Painel", isPrimary: true },
        { href: `${base}/clients`, icon: UserCircle2, label: "Usuários" },
        { href: `${base}/services`, icon: Settings, label: "Config" },
      ];
    }
    if (user?.role === "EMPLOYEE") {
      return [
        { href: `${base}/clients`, icon: Users2, label: "Clientes" },
        {
          href: `${base}/appointments`,
          icon: CalendarDays,
          label: "Agendamentos",
        },
        { href: base, icon: House, label: "Painel", isPrimary: true },
        { href: `${base}/clients`, icon: UserCircle2, label: "Usuários" },
        { href: `${base}/settings`, icon: Settings, label: "Config" },
      ];
    }
    if (user?.role === "CLIENT") {
      return [
        { href: `${base}/psychologists`, icon: Users2, label: "Profissionais" },
        {
          href: `${base}/appointments`,
          icon: CalendarDays,
          label: "Agendamentos",
        },
        { href: base, icon: House, label: "Painel", isPrimary: true },
        { href: `${base}/psychologists`, icon: UserCircle2, label: "Usuários" },
        { href: `${base}/settings`, icon: Settings, label: "Config" },
      ];
    }
    // Fallback com 5 itens fixos
    return [
      { href: `/dashboard/home`, icon: Users2, label: "Início" },
      {
        href: `/dashboard/appointments`,
        icon: CalendarDays,
        label: "Agendamentos",
      },
      { href: `/dashboard`, icon: House, label: "Painel", isPrimary: true },
      { href: `/dashboard/users`, icon: UserCircle2, label: "Usuários" },
      { href: `/dashboard/settings`, icon: Settings, label: "Config" },
    ];
  })();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className="mx-4 mb-4 rounded-2xl bg-white/95 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-100"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5 items-center px-3 py-2 pointer-events-auto">
          {items.map(({ href, icon: Icon, label, isPrimary }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={`${href}-${label}`} className="flex justify-center">
                <Link
                  href={href}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  className={
                    isPrimary
                      ? "-mt-8 h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md"
                      : `h-14 w-14 rounded-xl flex items-center justify-center transition-colors ${
                          active
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-400 hover:text-gray-600"
                        }`
                  }
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
