"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import WhySection from "./components/WhySection";
import DemoSection from "./components/DemoSection";
import TeamSection from "./components/TeamSection";

const NAV_LINKS = [
  { label: "Problem", id: "problem" },
  { label: "Solution", id: "solution" },
  { label: "Why", id: "why" },
  { label: "Demo", id: "demo" },
  { label: "Team", id: "team" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActiveSection(id);
            sectionRefs.current.set(id, entry);
          }
        });
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full bg-(--bg)">
      <Nav
        links={NAV_LINKS}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
      <main className="pt-10 flex flex-col w-full gap-16">
        <HeroSection onScrollToDemo={() => handleNavClick("demo")} />
        <ProblemSection />
        <SolutionSection />
        <WhySection />
        <DemoSection />
        <TeamSection />
        <div className="h-32"></div>
      </main>
    </div>
  );
}
