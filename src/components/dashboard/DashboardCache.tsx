"use client";

import { useEffect } from "react";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

interface DashboardCacheProps {
  initial: {
    employees?: any[];
    clientsCount?: number;
    appointmentsToday?: any[];
    weekRange?: { start: string; end: string };
    appointmentsCountToday?: number;
  };
  children: React.ReactNode;
}

export function DashboardCache({ initial, children }: DashboardCacheProps) {
  useEffect(() => {
    const ops: Array<Promise<any>> = [];

    if (initial.employees) {
      ops.push(
        cacheUtils.setCachedData(
          "employees:list",
          { data: initial.employees },
          CACHE_CONFIG.employees
        )
      );
    }

    if (typeof initial.clientsCount === "number") {
      ops.push(
        cacheUtils.setCachedData(
          "clients:count",
          initial.clientsCount,
          CACHE_CONFIG.clients
        )
      );
    }

    if (initial.weekRange && Array.isArray(initial.appointmentsToday)) {
      const kDay = `appointments:period:${initial.weekRange.start}:${initial.weekRange.start}`;
      ops.push(
        cacheUtils.setCachedData(
          kDay,
          initial.appointmentsToday,
          CACHE_CONFIG.appointments
        )
      );
    }

    if (
      typeof initial.appointmentsCountToday === "number" &&
      initial.weekRange
    ) {
      const kCnt = `appointments:count:${initial.weekRange.start}:${initial.weekRange.start}:all`;
      ops.push(
        cacheUtils.setCachedData(
          kCnt,
          initial.appointmentsCountToday,
          CACHE_CONFIG.appointments
        )
      );
    }

    Promise.allSettled(ops);
  }, [initial]);

  return <>{children}</>;
}
