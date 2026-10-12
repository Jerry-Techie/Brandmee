import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";

export interface VisitorEvent {
  id?: string;
  sessionId: string;
  path: string;
  referrer: string;
  userAgent: string;
  language: string;
  timezone: string;
  screen: string;
  visitedAt?: Timestamp | Date;
}

export type TimeRange = "24h" | "7d" | "30d";

export interface EngagementMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: { page: string; views: number }[];
  referrers: { source: string; visits: number }[];
  devices: { type: string; count: number }[];
  timeSeries: { date: string; views: number; visitors: number }[];
}

const COLLECTION_NAME = "visitorEvents";

function getRangeStart(range: TimeRange): Date {
  const now = new Date();
  switch (range) {
    case "24h":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
}

export async function recordVisitorEvent(event: Omit<VisitorEvent, "id" | "visitedAt">) {
  await addDoc(collection(db, COLLECTION_NAME), {
    ...event,
    visitedAt: serverTimestamp(),
  });
}

export async function getVisitorEvents(maxResults = 100): Promise<VisitorEvent[]> {
  const visitorsQuery = query(
    collection(db, COLLECTION_NAME),
    orderBy("visitedAt", "desc"),
    limit(maxResults),
  );
  const snapshot = await getDocs(visitorsQuery);

  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      sessionId: data.sessionId ?? "",
      path: data.path ?? "/",
      referrer: data.referrer ?? "",
      userAgent: data.userAgent ?? "",
      language: data.language ?? "",
      timezone: data.timezone ?? "",
      screen: data.screen ?? "",
      visitedAt: data.visitedAt?.toDate?.() ?? data.visitedAt,
    };
  });
}

export async function getVisitorAnalytics(range: TimeRange): Promise<EngagementMetrics> {
  const startDate = getRangeStart(range);
  const analyticsQuery = query(
    collection(db, COLLECTION_NAME),
    where("visitedAt", ">=", startDate),
    orderBy("visitedAt", "asc"),
  );
  const snapshot = await getDocs(analyticsQuery);

  const events = snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      sessionId: data.sessionId ?? "",
      path: data.path ?? "/",
      referrer: data.referrer ?? "",
      userAgent: data.userAgent ?? "",
      language: data.language ?? "",
      timezone: data.timezone ?? "",
      screen: data.screen ?? "",
      visitedAt: data.visitedAt?.toDate?.() ?? new Date(data.visitedAt),
    };
  });

  const totalPageViews = events.length;
  const uniqueSessions = new Set(events.map((e) => e.sessionId));
  const uniqueVisitors = uniqueSessions.size;

  const sessionFirstVisit = new Map<string, Date>();
  const sessionLastVisit = new Map<string, Date>();
  events.forEach((e) => {
    const ts = e.visitedAt instanceof Date ? e.visitedAt : new Date(e.visitedAt);
    if (!sessionFirstVisit.has(e.sessionId) || ts < sessionFirstVisit.get(e.sessionId)!) {
      sessionFirstVisit.set(e.sessionId, ts);
    }
    if (!sessionLastVisit.has(e.sessionId) || ts > sessionLastVisit.get(e.sessionId)!) {
      sessionLastVisit.set(e.sessionId, ts);
    }
  });

  let totalDuration = 0;
  sessionLastVisit.forEach((last, session) => {
    const first = sessionFirstVisit.get(session)!;
    totalDuration += last.getTime() - first.getTime();
  });
  const avgSessionDuration = uniqueVisitors > 0 ? totalDuration / uniqueVisitors : 0;

  const sessionPageCount = new Map<string, number>();
  events.forEach((e) => {
    sessionPageCount.set(e.sessionId, (sessionPageCount.get(e.sessionId) || 0) + 1);
  });
  const bounces = Array.from(sessionPageCount.values()).filter((count) => count === 1).length;
  const bounceRate = uniqueVisitors > 0 ? (bounces / uniqueVisitors) * 100 : 0;

  const pageCount = new Map<string, number>();
  events.forEach((e) => {
    pageCount.set(e.path, (pageCount.get(e.path) || 0) + 1);
  });
  const topPages = Array.from(pageCount.entries())
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const referrerCount = new Map<string, number>();
  events.forEach((e) => {
    const source = e.referrer || "Direct / None";
    referrerCount.set(source, (referrerCount.get(source) || 0) + 1);
  });
  const referrers = Array.from(referrerCount.entries())
    .map(([source, visits]) => ({ source, visits }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 8);

  const deviceCount = new Map<string, number>();
  events.forEach((e) => {
    const screen = e.screen || "Unknown";
    const isMobile = screen.includes("x") && parseInt(screen.split("x")[0]) < 768;
    const isTablet = screen.includes("x") && parseInt(screen.split("x")[0]) >= 768 && parseInt(screen.split("x")[0]) < 1024;
    const deviceType = isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop";
    deviceCount.set(deviceType, (deviceCount.get(deviceType) || 0) + 1);
  });
  const devices = Array.from(deviceCount.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  const timeMap = new Map<string, { views: number; sessions: Set<string> }>();
  events.forEach((e) => {
    const ts = e.visitedAt instanceof Date ? e.visitedAt : new Date(e.visitedAt);
    let key: string;
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - ts.getTime()) / (24 * 60 * 60 * 1000));

    if (range === "24h") {
      key = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (range === "7d") {
      key = ts.toLocaleDateString([], { weekday: "short", hour: "2-digit" });
    } else {
      key = ts.toLocaleDateString([], { month: "short", day: "numeric" });
    }

    if (!timeMap.has(key)) {
      timeMap.set(key, { views: 0, sessions: new Set() });
    }
    const entry = timeMap.get(key)!;
    entry.views += 1;
    entry.sessions.add(e.sessionId);
  });

  const timeSeries = Array.from(timeMap.entries())
    .map(([date, data]) => ({
      date,
      views: data.views,
      visitors: data.sessions.size,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalPageViews,
    uniqueVisitors,
    avgSessionDuration,
    bounceRate,
    topPages,
    referrers,
    devices,
    timeSeries,
  };
}
