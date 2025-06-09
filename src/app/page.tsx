"use client";
import Hero from "@/components/Dashboard";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Overview from "@/components/Overview";
import { WaveGlobe } from "@/components/Dashboard/globe";
export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (token) {
      setToken(token);
    }
  }, [pathname]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.scrollY;
      const maxDistance = window.innerHeight * 1.5;
      const progress = Math.min(Math.max(scrollDistance / maxDistance, 0), 1);
      setScrollProgress(progress);
      let disThreshold = 1040;
      if (maxDistance > 1150) {
        disThreshold = 1040;
      } else {
        disThreshold = 900;
      }
      if (canvasContainerRef.current && scrollDistance > disThreshold) {
        const canvasYOffset = (scrollDistance - disThreshold) * 0.8;
        canvasContainerRef.current.style.transform = `translateY(-${canvasYOffset}px)`;
      } else if (canvasContainerRef.current) {
        canvasContainerRef.current.style.transform = "translateY(0)";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* <Hero /> */}
      {/* <Overview /> */}
      {!token ? (
        <div>
          <div
            className="fixed left-0 top-0 z-[30] h-screen w-full"
            ref={canvasContainerRef}
          >
            <Canvas
              ref={canvasRef}
              camera={{ position: [0, 0, 5], fov: 60 }}
              style={{ background: "" }}
              dpr={[1, 2]}
            >
              <WaveGlobe scrollProgress={scrollProgress} />
            </Canvas>
          </div>
          <Hero />
        </div>
      ) : (
        <div className="flex flex-col ">
          <Overview />
        </div>
      )}
    </>
  );
}
