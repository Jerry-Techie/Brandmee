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

const COLLECTION_NAME = "visitorEvents";

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
