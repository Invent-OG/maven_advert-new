"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";

import Lenis from "lenis";
import { usePathname } from "next/navigation";

type LenisContextType = {
  lenis?: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  const pathname = usePathname();
  const isExcluded = pathname.startsWith("/admin");

  useEffect(() => {
    if (typeof window === "undefined" || isExcluded) return;

    // create Lenis instance
    lenisRef.current = new Lenis({
      duration: 1.8,
      orientation: "vertical",
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [isExcluded]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
