"use client";

import Link from "next/link";
import { useLoading } from "./LoadingProvider";

type BrandMeLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
};

export default function BrandMeLink({
  href,
  children,
  className,
  onClick,
  prefetch = true,
}: BrandMeLinkProps) {
  const { startLoading } = useLoading();

  const handleClick = () => {
    // Skip loader for hash-only links (e.g. #portfolio on same page)
    if (!href.startsWith("#")) {
      startLoading();
    }
    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick} prefetch={prefetch}>
      {children}
    </Link>
  );
}
