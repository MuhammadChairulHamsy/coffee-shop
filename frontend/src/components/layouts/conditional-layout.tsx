"use client";

import { usePathname } from "next/navigation";

const disableNavbarFooter = ["/login"];

export default function ConditionalLayout({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = disableNavbarFooter.includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  if(isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      {!hideLayout && navbar}
      
      <main className="w-full flex-1">
        {children}
      </main>

      {!hideLayout && footer}
    </>
  );
}