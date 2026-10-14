"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import BrandMeLoader from "./BrandMeLoader";

const LoadingContext = createContext<{
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  // Default true on both server and client so the first render matches,
  // avoiding a hydration mismatch. The loader is hidden after mount.
  const [showInitial, setShowInitial] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (sessionStorage.getItem("brandme-loaded")) {
      setShowInitial(false);
      return;
    }
    sessionStorage.setItem("brandme-loaded", "true");
    const timer = setTimeout(() => setShowInitial(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, pathname]);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {showInitial && <BrandMeLoader />}
      {isLoading && <BrandMeLoader />}
      {children}
    </LoadingContext.Provider>
  );
}
