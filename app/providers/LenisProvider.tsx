"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenisOptions: ConstructorParameters<typeof Lenis>[0] & {
      smoothTouch?: boolean;
    } = {
      duration: 3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      infinite: false,
    };

    const lenis = new Lenis(lenisOptions);
    setLenisInstance(lenis); // <-- IMPORTANT: forces re-render & updates context

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy?.();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ instance: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
}
