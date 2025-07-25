"use client";
import { useState, useEffect } from "react";
import { RoleGuard } from "@/components/guards/RoleGuard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { getDashboardStats } from "@/actions/dashboard";

const PERIODS = [
  { label: "Hoje", value: "today" },
  { label: "Esta Semana", value: "week" },
  { label: "Este Mês", value: "month" },
  { label: "Personalizado", value: "custom" },
];

function getPeriodDates(period: string): {
  startDate: string;
  endDate: string;
} {
  const now = new Date();
  let startDate = new Date(now);
  let endDate = new Date(now);
  if (period === "today") {
    // hoje
  } else if (period === "week") {
    const day = now.getDay();
    startDate.setDate(now.getDate() - day);
    endDate.setDate(startDate.getDate() + 6);
  } else if (period === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }
  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
}

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState("today");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      setError(null);
      let startDate = "";
      let endDate = "";
      if (period === "custom") {
        startDate = customStart;
        endDate = customEnd;
      } else {
        const dates = getPeriodDates(period);
        startDate = dates.startDate;
        endDate = dates.endDate;
      }
      try {
        const result = await getDashboardStats(startDate, endDate);
        if (result && result.success !== false) {
          setStats(result);
        } else {
          setError(result?.message || "Erro ao carregar dashboard");
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar dashboard");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [period, customStart, customEnd]);

  return (
    <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {period === "custom" && (
          <>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <span>a</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </>
        )}
      </div>
      {loading ? (
        <div className="p-8 text-center text-gray-500">Carregando...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : (
        <AdminDashboard stats={stats?.data || stats} />
      )}
    </RoleGuard>
  );
}
