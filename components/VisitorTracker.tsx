"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordVisitorEvent } from "@/lib/visitorTracker";

function getSessionId() {
  const storageKey = "brandme-visitor-session";
  const existingSession = window.localStorage.getItem(storageKey);
  if (existingSession) return existingSession;

  const sessionId =
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(storageKey, sessionId);
  return sessionId;
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const visitorEvent = {
      sessionId: getSessionId(),
      path: pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${window.innerWidth}x${window.innerHeight}`,
    };

    recordVisitorEvent(visitorEvent).catch((error) => {
      console.error("Failed to record visitor event:", error);
    });
  }, [pathname]);

  return null;
}
