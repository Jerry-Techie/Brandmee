"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VisitorTracker from "@/components/VisitorTracker";

type SiteUser = {
  isLoggedIn: boolean;
  role: string;
} | null;

type SiteChromeProps = {
  children: React.ReactNode;
  user: SiteUser;
};

export default function SiteChrome({ children, user }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <VisitorTracker />
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
