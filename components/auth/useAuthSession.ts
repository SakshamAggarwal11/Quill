"use client";

import { useEffect, useState } from "react";
import type { AuthSession } from "./session";
import { AUTH_SESSION_CHANGE_EVENT, readAuthSession } from "./session";

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession | null>(() => readAuthSession());

  useEffect(() => {
    const refreshSession = () => setSession(readAuthSession());

    refreshSession();
    window.addEventListener("storage", refreshSession);
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, refreshSession as EventListener);

    return () => {
      window.removeEventListener("storage", refreshSession);
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, refreshSession as EventListener);
    };
  }, []);

  return session;
}