"use client";

import { useEffect, useState } from "react";
import { publicRoutesFromDb, type PopularRoute } from "@/lib/popular-routes";

export function usePopularRoutes() {
  const [routes, setRoutes] = useState<PopularRoute[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/popular-routes")
      .then((res) => res.json())
      .then((data: { routes?: PopularRoute[] }) => {
        setRoutes(publicRoutesFromDb(data.routes ?? []));
      })
      .catch(() => setRoutes([]))
      .finally(() => setLoaded(true));
  }, []);

  return { routes, loaded };
}
