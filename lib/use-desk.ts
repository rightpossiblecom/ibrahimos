"use client";

import { useEffect, useState } from "react";
import type { Incident } from "@/lib/analyze/types";
import { DESK_EVENT, getActiveIncident, isDeskLive } from "@/lib/incidents";

export function useDesk() {
  const [live, setLive] = useState(false);
  const [incident, setIncident] = useState<Incident | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function refresh() {
      setLive(isDeskLive());
      setIncident(getActiveIncident());
      setReady(true);
    }

    refresh();
    window.addEventListener(DESK_EVENT, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(DESK_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return { live, incident, ready };
}
