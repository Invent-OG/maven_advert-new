"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisContextType = {
  instance: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ instance: null });

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

  useEffect(() => {
    // Create properly typed options for Lenis and extend to allow smoothTouch if missing
    const lenisOptions: ConstructorParameters<typeof Lenis>[0] & {
      smoothTouch?: boolean;
    } = {
      duration: 3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true, // disable touch smoothing for better mobile UX
      infinite: false,
    };

    const lenis = new Lenis(lenisOptions);

    lenisRef.current = lenis;

    // RAF loop — feed lenis each frame
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // cleanup on unmount
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // safe destroy if available
      lenis.destroy?.();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ instance: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
