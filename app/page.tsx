"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { plans } from "@/lib/plans";
import WaitlistForm from "@/app/components/waitlist-form";

function LazyVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else {
          el.pause();
        }
      },
      { rootMargin: "100px", threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      data-src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}

const heroReelClips = [
  "/masonry-grid/Drone_over_Lagos_skyline_1080p_20260919121725.mp4",
  "/masonry-grid/Queen_turning_to_face_sun_20260919121645.mp4",
  "/masonry-grid/Maasai_warrior_jumping_in_savanna_20260919131339.mp4",
  "/masonry-grid/Children_chase_football_in_court…_20260919131237.mp4",
  "/masonry-grid/River_spirit_rising_from_water_20260919131647.mp4",
  "/masonry-grid/Model_walking_across_crosswalk_1080p_20260919114334.mp4",
  "/masonry-grid/Man_walking_in_compound_1080p_20260919130500.mp4",
  "/masonry-grid/Figure_walking_through_concrete_…_20260919114428.mp4",
  "/masonry-grid/Man_turning_in_trench_coat_20260919114400.mp4",
];

function HeroReelCardItem({ src, active }: { src: string; active: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin: "150px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isIntersecting && active) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isIntersecting, active]);

  return (
    <div ref={cardRef} className="hero-reel-card">
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "var(--ink-2)" }} />
      )}
    </div>
  );
}

function HeroReelMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerInView, setContainerInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setContainerInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="hero-reel-mobile" aria-hidden="true">
      <div
        className="hero-reel-track"
        style={{
          animationPlayState: containerInView ? "running" : "paused",
        }}
      >
        {[...heroReelClips, ...heroReelClips].map((src, i) => (
          <HeroReelCardItem key={i} src={src} active={containerInView} />
        ))}
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "What is the Osmosis AI Filmmaking Training Program?",
    a: "A 4-week hybrid intensive cohort engineered for African directors, screenwriters, animators, and digital creators. The curriculum covers vertical micro-series narrative architecture, character consistency, multi-model directing (Sora, Runway Gen-3, Kling 1.5, MiniMax), lighting, audio synthesis, and vertical re-cut editing.",
  },
  {
    q: "What do I receive upon acceptance into Cohort 01?",
    a: "Every accepted creator receives 5,000 pilot generation compute credits, access to our multi-model studio cluster, weekly live masterclasses with industry mentors, and direct submission review for revenue-sharing distribution on the Osmosis mobile feed.",
  },
  {
    q: "Do I need prior AI filmmaking experience or high-end computer hardware?",
    a: "No high-end GPU or extensive prior AI filmmaking experience is required. All heavy generation compute runs on Osmosis's cloud clusters. Anyone with a computer, internet access, and a compelling story is encouraged to apply.",
  },
  {
    q: "How are applicants selected for the cohort?",
    a: "Cohort 01 is strictly limited to 25 fellows to ensure high-touch 1-on-1 mentorship. Applications are evaluated on creative vision, original storytelling concepts, and commitment to completing a pilot micro-drama episode.",
  },
  {
    q: "Who owns the rights to the generated micro-dramas?",
    a: "You retain 100% full commercial ownership of all scripts, visual clips, character models, and audio generated through your Osmosis account. You are free to monetize, license, and distribute your series anywhere without royalty clawbacks.",
  },
  {
    q: "Can I still purchase generation credit packages directly?",
    a: "Direct credit package purchases are temporarily reserved as we onboard our inaugural training cohort. Joining the waitlist grants you priority access and special introductory compute credit allocations when general packages re-open.",
  },
];

const curriculumModules = [
  {
    num: "Module 01",
    duration: "Week 1",
    title: "Vertical Screenwriting & Hook Architecture",
    desc: "Crafting serialized African micro-dramas optimized for mobile attention spans. Master 60–90 second three-act structures, relentless cliffhangers, and prompt-ready treatment beat sheets.",
    takeaway: "Deliverable: Completed 5-episode micro-drama script & storyboard bible.",
    tags: ["Screenwriting", "Beat Sheets", "Hook Craft", "Vertical 9:16"],
  },
  {
    num: "Module 02",
    duration: "Week 1",
    title: "Character Consistency & Identity Anchors",
    desc: "Mastering persistent facial vectors, seed locking, and wardrobe consistency across varied camera angles and dramatic scenes without identity morphing.",
    takeaway: "Deliverable: Character model lock sheet with 3 reusable African leads.",
    tags: ["Character Lock", "Seed Control", "Face Consistency", "Wardrobe Anchor"],
  },
  {
    num: "Module 03",
    duration: "Week 2",
    title: "Multi-Model Directing: Camera & Movement",
    desc: "Choosing the optimal model for every shot: Sora for complex physics, Runway Gen-3 for emotional performance, Kling 1.5 for cinematic motion, and MiniMax for natural action.",
    takeaway: "Deliverable: Multi-model camera shot deck with 12 cinematic coverage takes.",
    tags: ["Sora", "Runway Gen-3", "Kling 1.5", "Camera Direction"],
  },
  {
    num: "Module 04",
    duration: "Week 2",
    title: "Cinematic Lighting, Melanin Fidelity & Tone",
    desc: "Directing lighting keys: Lagos golden hour, high-contrast Nollywood noir, vibrant Afrofuturist neon, and true-to-life melanin rendering across high dynamic range.",
    takeaway: "Deliverable: Calibrated lighting preset library for your series universe.",
    tags: ["Melanin Fidelity", "Cinematic 24fps", "Nollywood Noir", "Afrofuturism"],
  },
  {
    num: "Module 05",
    duration: "Week 3",
    title: "Dialogue Synthesis, Dialects & Sound Design",
    desc: "Voice cloning and dialect performance across Nigerian Pidgin, Yoruba, Swahili, Amharic, and South African accents, matched with ambient foley and micro-drama pacing.",
    takeaway: "Deliverable: Mastered multi-track dialogue and atmospheric soundscape.",
    tags: ["Voice Cloning", "African Dialects", "Lip-Sync", "Foley & Ambience"],
  },
  {
    num: "Module 06",
    duration: "Week 4",
    title: "Osmosis Re-Cut Studio & Distribution Launch",
    desc: "Seamless post-production: assembling your cut in the Osmosis Re-Cut Studio, vertical mobile color grading, audio master, and direct pipeline submission to the Osmosis distribution network.",
    takeaway: "Deliverable: Finished pilot episode ready for distribution & revenue share.",
    tags: ["Re-Cut Studio", "Color Grade", "Direct Distribution", "Monetization"],
  },
];

const cohortPerks = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "5,000 Pilot Compute Credits",
    desc: "Dedicated generation credits provided to produce, re-roll, and polish your complete pilot episode.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Live Masterclasses & Mentorship",
    desc: "Weekly live lab sessions with pioneering AI directors, prompt architects, and veteran showrunners.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    title: "Distribution & Revenue Share",
    desc: "Graduating pilots receive direct review for premiere licensing on the Osmosis mobile feed with royalties.",
  },
];

const studioScenes = [
  {
    id: "scene-1",
    title: "Scene 01 · Lagos Skyline",
    label: "Take 01 · 24 FPS",
    prompt: "Cinematic drone sweep over Lagos skyline, golden hour atmospheric haze, 35mm master lens",
    video: "/masonry-grid/Drone_over_Lagos_skyline_1080p_20260919121725.mp4",
  },
  {
    id: "scene-2",
    title: "Scene 02 · Sun Queen",
    label: "Take 02 · 24 FPS",
    prompt: "Close-up portrait of regal African queen turning into direct golden sunlight, micro-drama emotional beat",
    video: "/masonry-grid/Queen_turning_to_face_sun_20260919121645.mp4",
  },
  {
    id: "scene-3",
    title: "Scene 03 · Savannah Jump",
    label: "Take 03 · 24 FPS",
    prompt: "Dynamic slow-motion jump of Maasai warrior against vast African savanna sky, cinematic 4K",
    video: "/masonry-grid/Maasai_warrior_jumping_in_savanna_20260919131339.mp4",
  },
];


export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroNav, setHeroNav] = useState("script");
  const [heroMode, setHeroMode] = useState<"director" | "manual">("director");
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 820px)");
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  function toggleFaq(index: number) {
    setOpenFaq(openFaq === index ? null : index);
  }

  return (
    <div className="landing-wrapper">
      {/* Global Sticky Navigation */}
      <nav className="site-nav section-light">
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <svg className="brand-wordmark" viewBox="0 0 999.64 361.72" fill="currentColor" aria-label="Osmosis">
              <path d="M67.87,0h-26.26C18.67,0,0,18.67,0,41.61v278.17c0,22.94,18.67,41.61,41.61,41.61h26.26c22.94,0,41.61-18.67,41.61-41.61V41.61C109.48,18.67,90.81,0,67.87,0ZM74.98,319.78c0,3.92-3.19,7.11-7.11,7.11h-26.26c-3.92,0-7.11-3.19-7.11-7.11V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v278.17Z" />
              <path d="M622.65,0h-95.7c-22.94,0-41.61,18.67-41.61,41.61v278.17c0,22.94,18.67,41.61,41.61,41.61h95.7c22.94,0,41.61-18.67,41.61-41.61V41.61c0-22.94-18.67-41.61-41.61-41.61ZM629.76,319.78c0,3.92-3.19,7.11-7.11,7.11h-95.7c-3.92,0-7.11-3.19-7.11-7.11V41.61c0-3.92,3.19-7.11,7.11-7.11h95.7c3.92,0,7.11,3.19,7.11,7.11v278.17Z" />
              <path d="M931.77,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C999.64,19.31,981.29.38,958.74,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
              <path d="M733.69,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C801.56,19.31,783.21.38,760.66,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
              <path d="M178.91,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C246.78,19.31,228.44.38,205.88,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
              <path d="M415.91,0h-26.26c-8.75,0-16.32,5.6-23.03,10.23-6.71-4.64-15.39-10.23-24.14-10.23h-26.26c-22.94,0-41.61,18.67-41.61,41.61v320.12h34.5V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v320.12h32.95V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v320.12h34.5V41.61c0-22.94-18.67-41.61-41.61-41.61Z" />
              <rect x="829.39" y="0" width="32.95" height="361.55" />
            </svg>
          </Link>

          <div className="nav-links">
            <a href="#showreel" className="nav-link">Showreel</a>
            <a href="#workflow" className="nav-link">Workflow</a>
            <a href="#training" className="nav-link">AI Training</a>
            <Link href="/distribution" className="nav-link">Distribution</Link>
            <Link href="/waitlist" className="nav-link">Waitlist</Link>
          </div>

          <Link href="/waitlist" className="nav-cta">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero section-light">
          <div className="wrap">
            {/* Headline (left) + supporting copy (right) side by side,
                ElevenLabs-style, instead of one centered stacked column. */}
            <div className="hero-top">
              <div className="hero-top-left">
                <h1>Direct African
                  <br />
                  micro-dramas with AI.</h1>
                <div className="hero-actions">
                  <Link href="/waitlist" className="btn">
                    Join Cohort Waitlist
                  </Link>
                  <a href="#showreel" className="btn secondary">
                    Watch showreel
                  </a>
                </div>
              </div>
              <div className="hero-top-right">
                <p className="tag">
                  Empowering Africa&rsquo;s new wave of creators to produce viral micro-dramas and episodic micro-series. From script to cinematic 4K render and vertical distribution — direct consistent characters, capture audience attention, and monetize your stories across Africa and the diaspora.
                </p>
              </div>
            </div>

            {/* Product demo: Osmosis Studio as a real app shell on desktop */}
            {!isMobile && (
              <div id="studio" className="hero-stage">
              <aside className="stage-sidebar">
                <div className="stage-brand">
                  <svg className="brand-wordmark" viewBox="0 0 999.64 361.72" fill="currentColor" aria-label="Osmosis" style={{ height: "15px", width: "auto" }}>
                    <path d="M67.87,0h-26.26C18.67,0,0,18.67,0,41.61v278.17c0,22.94,18.67,41.61,41.61,41.61h26.26c22.94,0,41.61-18.67,41.61-41.61V41.61C109.48,18.67,90.81,0,67.87,0ZM74.98,319.78c0,3.92-3.19,7.11-7.11,7.11h-26.26c-3.92,0-7.11-3.19-7.11-7.11V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v278.17Z" />
                    <path d="M622.65,0h-95.7c-22.94,0-41.61,18.67-41.61,41.61v278.17c0,22.94,18.67,41.61,41.61,41.61h95.7c22.94,0,41.61-18.67,41.61-41.61V41.61c0-22.94-18.67-41.61-41.61-41.61ZM629.76,319.78c0,3.92-3.19,7.11-7.11,7.11h-95.7c-3.92,0-7.11-3.19-7.11-7.11V41.61c0-3.92,3.19-7.11,7.11-7.11h95.7c3.92,0,7.11,3.19,7.11,7.11v278.17Z" />
                    <path d="M931.77,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C999.64,19.31,981.29.38,958.74,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
                    <path d="M733.69,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C801.56,19.31,783.21.38,760.66,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
                    <path d="M178.91,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C246.78,19.31,228.44.38,205.88,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
                    <path d="M415.91,0h-26.26c-8.75,0-16.32,5.6-23.03,10.23-6.71-4.64-15.39-10.23-24.14-10.23h-26.26c-22.94,0-41.61,18.67-41.61,41.61v320.12h34.5V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v320.12h32.95V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v320.12h34.5V41.61c0-22.94-18.67-41.61-41.61-41.61Z" />
                    <rect x="829.39" y="0" width="32.95" height="361.55" />
                  </svg>
                </div>

                <button type="button" className="stage-workspace">
                  <span className="workspace-dot" />
                  My Studio
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="stage-nav-group">
                  <div className="stage-nav-label">Create</div>
                  <button
                    type="button"
                    className={heroNav === "script" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("script")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M2 6h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M2 6l1.4-3h2.1L4.1 6M6.7 6l1.4-3h2.1L8.8 6M11.4 6l1.4-3h1.2l-1 3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                    Script to Micro-Series
                  </button>
                  <button
                    type="button"
                    className={heroNav === "storyboard" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("storyboard")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    Storyboard
                  </button>
                  <button
                    type="button"
                    className={heroNav === "recut" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("recut")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M13 8A5 5 0 1 1 8 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M8 1l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Re-cut Studio
                  </button>
                </div>

                <div className="stage-nav-group">
                  <div className="stage-nav-label">My</div>
                  <button
                    type="button"
                    className={heroNav === "projects" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("projects")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2l5.2 3v6L8 14l-5.2-3V5L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      <path d="M8 8v6M8 8L2.8 5M8 8l5.2-3" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    Projects
                  </button>
                  <button
                    type="button"
                    className={heroNav === "assets" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("assets")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.6l1.2 1.5H12.5A1.5 1.5 0 0 1 14 6v6a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12V4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                    Assets
                  </button>
                </div>

                <div className="stage-nav-group">
                  <div className="stage-nav-label">Configure</div>
                  <button
                    type="button"
                    className={heroNav === "team" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("team")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M2.3 13c0-2 1.7-3.5 3.7-3.5s3.7 1.5 3.7 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="11.6" cy="5.4" r="1.6" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M9.9 9.1c.5-.3 1.1-.4 1.7-.4 1.7 0 3.1 1.3 3.1 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Team
                  </button>
                  <button
                    type="button"
                    className={heroNav === "usage" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("usage")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13V7M8 13V3M13 13V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    Usage
                  </button>
                  <button
                    type="button"
                    className={heroNav === "watermark" ? "stage-nav-item active" : "stage-nav-item"}
                    onClick={() => setHeroNav("watermark")}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2l4.5 1.8v3.4c0 2.9-1.9 4.9-4.5 6.2-2.6-1.3-4.5-3.3-4.5-6.2V3.8L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                    Watermark
                  </button>
                </div>
              </aside>

              <div className="stage-main">
                <div className="stage-header-row">
                  <div className="stage-scene-info">
                    <span className="stage-status-badge">
                      <span className="rec-dot" /> LIVE PREVIEW
                    </span>
                    <h3 className="stage-scene-title">{studioScenes[activeSceneIndex].title}</h3>
                  </div>

                  <div className="stage-controls">
                    <div className="mode-toggle">
                      <button
                        type="button"
                        className={heroMode === "director" ? "mode-btn active" : "mode-btn"}
                        onClick={() => setHeroMode("director")}
                      >
                        Director Mode
                      </button>
                      <button
                        type="button"
                        className={heroMode === "manual" ? "mode-btn active" : "mode-btn"}
                        onClick={() => setHeroMode("manual")}
                      >
                        Manual
                      </button>
                    </div>

                    <div className="stage-dropdown">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <rect x="4.5" y="2" width="7" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      9:16
                    </div>

                    <div className="stage-dropdown">
                      4K
                    </div>

                    <div className="stage-dropdown style-select">
                      <span className="style-swatch" />
                      Anamorphic Noir
                    </div>
                  </div>
                </div>

                {/* Desktop: Option A (Tabbed / Active Viewport: 9:16 micro-drama player + 3 clickable scene clips below) */}
                <div className="stage-cinema-desktop">
                  <div className="cinema-viewport">
                    <video
                      key={studioScenes[activeSceneIndex].video}
                      src={studioScenes[activeSceneIndex].video}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="viewport-hud-top">
                      <span className="hud-pill hud-rec">
                        <span className="rec-dot" /> REC 00:04:18:12
                      </span>
                      <span className="hud-pill">SeeDance 4K · 24 FPS</span>
                      <span className="hud-pill">9:16 Micro-Drama</span>
                    </div>
                    <div className="viewport-hud-bottom">
                      <p className="hud-prompt-text">
                        <strong>Prompt:</strong> &ldquo;{studioScenes[activeSceneIndex].prompt}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="cinema-thumbnails">
                    {studioScenes.map((scene, idx) => (
                      <button
                        key={scene.id}
                        type="button"
                        className={`scene-thumb-btn ${activeSceneIndex === idx ? "active" : ""}`}
                        onClick={() => setActiveSceneIndex(idx)}
                      >
                        <div className="thumb-video-box">
                          <video src={scene.video} muted playsInline preload="none" />
                          {activeSceneIndex === idx && (
                            <span className="thumb-active-tag">Active Camera</span>
                          )}
                        </div>
                        <div className="thumb-meta">
                          <span className="thumb-title">{scene.title}</span>
                          <span className="thumb-label">{scene.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="stage-footer-bar">
                  <div className="stage-prompt-preview">
                    <span className="stage-prompt-dot" />
                    <span>Rendering pipeline: <strong>BytePlus SeeDance Engine</strong></span>
                  </div>
                  <Link href="/waitlist" className="stage-cta">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.2 4.8L14 7l-4.8 1.2L8 13l-1.2-4.8L2 7l4.8-1.2L8 1z" />
                    </svg>
                    Apply For Cohort 01
                  </Link>
                </div>
              </div>
            </div>
            )}

            {/* Mobile-only vertical reel: rendered ONLY when client is mobile viewport (< 820px) */}
            {isMobile && <HeroReelMobile />}

          </div>
        </section>

        {/* Showreel — real generated clips (not stock footage), demonstrating
            range across macro, action, fashion, and architectural moves. */}
        <section id="showreel">
          <div className="wrap">
            <div className="kicker">Showreel</div>
            <h2>Generated entirely from a prompt.</h2>
            <p className="lede">
              No stock footage, no reshoots — turn African scripts and cultural narratives into cinematic micro-drama motion.
            </p>

            <div className="masonry-grid">
              <div className="masonry-item tall">
                <LazyVideo src="/masonry-grid/Children_chase_football_in_court…_20260919131237.mp4" />
              </div>
              <div className="masonry-item taller">
                <LazyVideo src="/masonry-grid/Drone_over_Lagos_skyline_1080p_20260919121725.mp4" />
              </div>
              <div className="masonry-item tall">
                <LazyVideo src="/masonry-grid/Queen_turning_to_face_sun_20260919121645.mp4" />
              </div>
              <div className="masonry-item taller">
                <LazyVideo src="/masonry-grid/Maasai_warrior_jumping_in_savanna_20260919131339.mp4" />
              </div>
              <div className="masonry-item taller">
                <LazyVideo src="/masonry-grid/River_spirit_rising_from_water_20260919131647.mp4" />
              </div>
              <div className="masonry-item tall">
                <LazyVideo src="/masonry-grid/Model_walking_across_crosswalk_1080p_20260919114334.mp4" />
              </div>
              <div className="masonry-item taller">
                <LazyVideo src="/masonry-grid/Man_walking_in_compound_1080p_20260919130500.mp4" />
              </div>
              <div className="masonry-item tall">
                <LazyVideo src="/masonry-grid/Figure_walking_through_concrete_…_20260919114428.mp4" />
              </div>
              <div className="masonry-item tall">
                <LazyVideo src="/masonry-grid/Man_turning_in_trench_coat_20260919114400.mp4" />
              </div>
              <div className="masonry-item taller">
                <LazyVideo src="/masonry-grid/Iris_contracting_in_warm_light_20260919115330.mp4" />
              </div>
              <div className="masonry-item tall">
                <LazyVideo src="/masonry-grid/Person_climbing_modern_building_…_20260919115314.mp4" />
              </div>
              <div className="masonry-item taller">
                <LazyVideo src="/masonry-grid/Dancer_tumbling_beside_glass_sur…_20260919115312.mp4" />
                <div className="masonry-cta-overlay">
                  <Link href="/waitlist" className="masonry-cta">
                    Join Cohort Waitlist
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section: Pipeline */}
        <section id="workflow" className="section-light">
          <div className="wrap">
            <div className="kicker">Pipeline</div>
            <h2>How micro-series production works in Osmosis</h2>
            <p className="lede">
              A studio built specifically for African directors: turn written narrative into episodic micro-dramas, continuous cinematic footage, and direct mobile distribution.
            </p>

            <div className="pipeline-grid four-col">
              <div className="pipeline-card">
                <div className="num">01</div>
                <h3>Script &amp; Scene Direction</h3>
                <p>
                  Input screenplays or naturalistic scene prompts. The engine interprets camera blocking, atmosphere, and lighting notes directly into scene vectors.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">02</div>
                <h3>Character &amp; World Lock</h3>
                <p>
                  Maintain character identity, wardrobe textures, and set geography across diverse camera setups, angles, and scene lighting conditions.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">03</div>
                <h3>Mastering &amp; Soundscapes</h3>
                <p>
                  Generate at 24fps in crisp 4K with synchronized foley, dialogue stems, and ambient sound design ready for the timeline.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">04</div>
                <h3>Direct Distribution &amp; Monetization</h3>
                <p>
                  Publish in one tap to the Osmosis mobile feed, reach phone-first viewers across Africa and worldwide, and earn a direct revenue share on every micro-series episode.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="capabilities">
          <div className="wrap">
            <div className="kicker">Capabilities</div>
            <h2>Directorial control over every frame</h2>
            <p className="lede">
              Not random clips — precision cinematography engineered for African micro-drama filmmakers.
            </p>

            <div className="capabilities-bento">
              {/* Large anchor card — bento's "one dominant visual" cell,
                  paired with the four supporting cards stacked beside it. */}
              <div className="cap-feature">
                <div className="cap-feature-frame">
                  <div className="cap-feature-hud cap-feature-hud-tl">
                    <span className="hud-dot" />
                    REC
                  </div>
                  <div className="cap-feature-hud cap-feature-hud-tr">4K · 24fps</div>
                  <svg className="cap-feature-mark" viewBox="0 0 120 120">
                    <defs>
                      <radialGradient id="g-cap" cx="35%" cy="35%" r="75%">
                        <stop offset="0%" stopColor="#EAFFA0" />
                        <stop offset="45%" stopColor="#DCFF50" />
                        <stop offset="100%" stopColor="#A9CC28" />
                      </radialGradient>
                    </defs>
                    <circle cx="52" cy="62" r="36" fill="none" stroke="currentColor" strokeWidth="6" />
                    <circle cx="82" cy="34" r="18" fill="url(#g-cap)" />
                  </svg>
                  <div className="cap-feature-caption">
                    <span>35mm Prime · f/1.8</span>
                    <span>Dutch 12&deg; · Rack Focus</span>
                  </div>
                </div>
                <h3>Built like a real camera department</h3>
                <p>
                  Rigging, lighting, and cost controls modeled on how a physical set actually works — not generic sliders.
                </p>
              </div>

              <div className="cap-list">
                <div className="cap-item">
                  <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="7.5" />
                    <circle cx="14.5" cy="9" r="1.3" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="cap-item-tag">Optics</span>
                  <h3>Anamorphic Camera Rigging</h3>
                  <p>
                    Direct genuine optical mechanics: dolly zooms, Dutch angles, whip pans, and rack focus with authentic anamorphic oval bokeh.
                  </p>
                </div>

                <div className="cap-item">
                  <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4" />
                    <line x1="12" y1="2" x2="12" y2="4.5" />
                    <line x1="12" y1="19.5" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="4.5" y2="12" />
                    <line x1="19.5" y1="12" x2="22" y2="12" />
                    <line x1="4.9" y1="4.9" x2="6.6" y2="6.6" />
                    <line x1="17.4" y1="17.4" x2="19.1" y2="19.1" />
                    <line x1="4.9" y1="19.1" x2="6.6" y2="17.4" />
                    <line x1="17.4" y1="6.6" x2="19.1" y2="4.9" />
                  </svg>
                  <span className="cap-item-tag">Lighting</span>
                  <h3>Volumetric Lighting Control</h3>
                  <p>
                    Simulate golden hour warmth, overcast rain, neon noir chiaroscuro, or harsh tungsten with physically plausible ray-tracing.
                  </p>
                </div>

                <div className="cap-item">
                  <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M12 3l9 5-9 5-9-5 9-5z" />
                    <path d="M3 13l9 5 9-5" opacity="0.6" />
                  </svg>
                  <span className="cap-item-tag">Reference</span>
                  <h3>Multi-Reference Control</h3>
                  <p>
                    Blend up to 50 reference assets — images, video clips, and audio — into one generation for exact character, prop, and voice consistency.
                  </p>
                </div>

                <div className="cap-item">
                  <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 8V5a1 1 0 0 1 1-1h3" />
                    <path d="M16 4h3a1 1 0 0 1 1 1v3" />
                    <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
                    <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
                    <line x1="7" y1="17" x2="17" y2="7" opacity="0.6" />
                  </svg>
                  <span className="cap-item-tag">Editing</span>
                  <h3>Frame-Accurate Re-Cuts</h3>
                  <p>
                    Modify a generated scene down to individual frames in Re-cut Studio, without re-rendering the whole shot from scratch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Models — the real generation engines behind Osmosis, sourced from
            the BytePlus/SeeDance partnership deck rather than invented names. */}
        <section id="models" className="section-light">
          <div className="wrap">
            <div className="kicker">Engine</div>
            <h2>The models powering every generation.</h2>
            <p className="lede">
              Osmosis runs on BytePlus&rsquo;s SeeDance and SeeDream — the same industrial-grade models behind ByteDance&rsquo;s own AI video and image pipelines.
            </p>

            <div className="models-grid">
              <div className="model-card featured">
                <div className="model-card-tag">Video · Flagship</div>
                <h3>SeeDance 2.5</h3>
                <p>
                  ByteDance&rsquo;s next-generation multimodal video model — stronger instruction-following, more realistic camera movement, and native multilingual generation.
                </p>
                <div className="model-specs">
                  <div className="model-spec-row">
                    <span>Max resolution</span>
                    <strong>4K · 10-bit</strong>
                  </div>
                  <div className="model-spec-row">
                    <span>Native duration</span>
                    <strong>30s per generation</strong>
                  </div>
                  <div className="model-spec-row">
                    <span>Reference assets</span>
                    <strong>Up to 50</strong>
                  </div>
                  <div className="model-spec-row">
                    <span>Cost</span>
                    <strong>140 credits</strong>
                  </div>
                </div>
              </div>

              <div className="model-card">
                <div className="model-card-tag">Video · Draft</div>
                <h3>SeeDance 2.0 Mini</h3>
                <p>
                  A fast, low-cost tier for blocking out a scene before committing to a full-resolution render.
                </p>
                <div className="model-specs">
                  <div className="model-spec-row">
                    <span>Best for</span>
                    <strong>Draft passes</strong>
                  </div>
                  <div className="model-spec-row">
                    <span>Cost</span>
                    <strong>20 credits</strong>
                  </div>
                  <div className="model-spec-row">
                    <span>Savings</span>
                    <strong>7&times; cheaper</strong>
                  </div>
                </div>
              </div>

              <div className="model-card">
                <div className="model-card-tag">Image · Stills</div>
                <h3>SeeDream</h3>
                <p>
                  ByteDance&rsquo;s companion image model, used across Osmosis for storyboard frames, character designs, and reference stills that feed into SeeDance generations.
                </p>
                <div className="model-specs">
                  <div className="model-spec-row">
                    <span>Used for</span>
                    <strong>Storyboards · Character refs</strong>
                  </div>
                  <div className="model-spec-row">
                    <span>Feeds into</span>
                    <strong>SeeDance video generation</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase (9:16 Aspect Ratio Shots per Brand Imagery Guidelines) */}
        <section id="showcase" className="section-light">
          <div className="wrap">
            <div className="kicker">Imagery</div>
            <h2>One studio. Any episodic universe.</h2>
            <p className="lede">
              From Lagos cyber-noir to mythic African dynasties and modern high-stakes drama — your micro-series stays true to whatever world you&rsquo;re directing.
            </p>

            <div className="shot-grid">
              <div className="shot-card">
                <div className="shot-frame shot-1">
                  <span className="shot-tag">Sci-Fi // 24 FPS</span>
                </div>
                <div className="shot-meta">
                  <h4>Chrono Station</h4>
                  <p>Cyberpunk / Atmospheric</p>
                </div>
              </div>

              <div className="shot-card">
                <div className="shot-frame shot-2">
                  <span className="shot-tag">Epic // 24 FPS</span>
                </div>
                <div className="shot-meta">
                  <h4>The Sun Queen</h4>
                  <p>Mythology / Golden Hour</p>
                </div>
              </div>

              <div className="shot-card">
                <div className="shot-frame shot-3">
                  <span className="shot-tag">Noir // 24 FPS</span>
                </div>
                <div className="shot-meta">
                  <h4>Midnight Protocol</h4>
                  <p>Chiaroscuro / Rain</p>
                </div>
              </div>

              <div className="shot-card">
                <div className="shot-frame shot-4">
                  <span className="shot-tag">Brand // 24 FPS</span>
                </div>
                <div className="shot-meta">
                  <h4>Aero Titanium</h4>
                  <p>Commercial / Macro</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Training Program Section */}
        <section id="training">
          <div className="wrap">
            <div className="kicker">Academy &amp; Cohort</div>
            <h2>Master African Micro-Drama Production with AI.</h2>
            <p className="lede">
              A 4-week hybrid intensive engineered for African directors, screenwriters, animators, and digital creators. Master multi-model prompting, identity consistency, cinematic lighting, and vertical micro-series pacing.
            </p>

            <div className="training-grid">
              {curriculumModules.map((mod, idx) => (
                <div key={idx} className="curriculum-card">
                  <div>
                    <div className="curriculum-card-header">
                      <span className="curriculum-num">{mod.num}</span>
                      <span className="curriculum-duration">{mod.duration}</span>
                    </div>
                    <h3 className="curriculum-title">{mod.title}</h3>
                    <p className="curriculum-desc">{mod.desc}</p>
                    <div className="curriculum-takeaway">
                      <strong>Core Outcome</strong>
                      {mod.takeaway}
                    </div>
                  </div>
                  <div className="curriculum-tags">
                    {mod.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="curriculum-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="cohort-perks-bar">
              {cohortPerks.map((perk, pIdx) => (
                <div key={pIdx} className="cohort-perk-item">
                  <div className="cohort-perk-icon" aria-hidden="true">
                    {perk.icon}
                  </div>
                  <div className="cohort-perk-content">
                    <h4>{perk.title}</h4>
                    <p>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/waitlist" className="btn">
                Apply for Cohort 01 Waitlist
              </Link>
            </div>
          </div>
        </section>

        {/* Distribution teaser — the pipeline doesn't end at render;
            links out to the dedicated /distribution page for the full
            mechanics (revenue share terms, FAQ). */}
        <section id="distribution" className="section-light">
          <div className="wrap">
            <div className="kicker">Distribution</div>
            <h2>Your micro-series doesn&rsquo;t stop at render.</h2>
            <p className="lede">
              Publish straight to the Osmosis feed, reach viewers hooked on vertical African micro-dramas, and earn a revenue share on every episode.
            </p>

            <div className="pipeline-grid">
              <div className="pipeline-card">
                <div className="num">01</div>
                <h3>Publish in one tap</h3>
                <p>
                  Send your finished cut straight from Re-cut Studio to the Osmosis feed — auto-formatted for vertical, phone-first playback.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">02</div>
                <h3>Reach a built-in audience across Africa</h3>
                <p>
                  Get discovered by millions of mobile viewers already watching short, serialized African micro-series across the Osmosis distribution network.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">03</div>
                <h3>Earn as your micro-drama streams</h3>
                <p>
                  Collect a revenue share on every view, with optional licensing to partner platforms across Africa and the diaspora as your series grows.
                </p>
              </div>
            </div>

            <div className="distribution-teaser-cta">
              <Link href="/distribution" className="btn secondary">
                See how distribution works
              </Link>
            </div>
          </div>
        </section>

        {/* Cohort 01 Admissions Invitation Section */}
        <section id="waitlist" className="section-light">
          <div id="pricing" /> {/* Anchor alias for legacy links */}
          <div className="wrap waitlist-section-wrap" style={{ textAlign: "center", padding: "60px 20px" }}>
            <div className="kicker">Admissions · Cohort 01</div>
            <h2>Apply for the Osmosis AI Filmmaking Program</h2>
            <p className="lede" style={{ maxWidth: 640, margin: "0 auto 36px" }}>
              Join 25 select directors, writers, and visual creators across Africa mastering end-to-end generative AI micro-drama production. Complete with 5,000 pilot compute credits, live masterclasses, and distribution access.
            </p>

            <div>
              <Link href="/waitlist" className="btn" style={{ padding: "16px 36px", fontSize: 16 }}>
                Go to Waitlist Application &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section-light">
          <div className="wrap">
            <div className="kicker">Reference</div>
            <h2>Frequently asked questions</h2>
            <p className="lede">
              Clear rules, compute economics, and account details.
            </p>

            <div className="faq-group">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="faq-row">
                    <button
                      className="faq-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
                        +
                      </span>
                    </button>
                    {isOpen && <div className="faq-body">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer>
        <div className="wrap footer-inner">
          <div>
            <div className="nav-brand">
              <svg className="brand-wordmark" viewBox="0 0 999.64 361.72" fill="currentColor" aria-label="Osmosis">
                <path d="M67.87,0h-26.26C18.67,0,0,18.67,0,41.61v278.17c0,22.94,18.67,41.61,41.61,41.61h26.26c22.94,0,41.61-18.67,41.61-41.61V41.61C109.48,18.67,90.81,0,67.87,0ZM74.98,319.78c0,3.92-3.19,7.11-7.11,7.11h-26.26c-3.92,0-7.11-3.19-7.11-7.11V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v278.17Z" />
                <path d="M622.65,0h-95.7c-22.94,0-41.61,18.67-41.61,41.61v278.17c0,22.94,18.67,41.61,41.61,41.61h95.7c22.94,0,41.61-18.67,41.61-41.61V41.61c0-22.94-18.67-41.61-41.61-41.61ZM629.76,319.78c0,3.92-3.19,7.11-7.11,7.11h-95.7c-3.92,0-7.11-3.19-7.11-7.11V41.61c0-3.92,3.19-7.11,7.11-7.11h95.7c3.92,0,7.11,3.19,7.11,7.11v278.17Z" />
                <path d="M931.77,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C999.64,19.31,981.29.38,958.74,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
                <path d="M733.69,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C801.56,19.31,783.21.38,760.66,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
                <path d="M178.91,118.79l-3.81-3.29c-2.1-1.81-3.3-4.45-3.3-7.22V41.95c0-2,.83-3.98,2.29-5.41,1.34-1.32,3.03-2.04,4.82-2.04h26.38c3.85.06,6.99,3.25,6.99,7.1v57.75h34.5v-57.15C246.78,19.31,228.44.38,205.88,0h-26.97s0,0,0,0c-10.99,0-21.32,4.22-29.17,11.94-8.02,7.89-12.44,18.42-12.44,29.67v80.07c0,4.62,2.01,9.01,5.5,12.03l67.86,56.73c1.02.89,1.61,2.17,1.61,3.52v125.47c0,2.01-.83,3.98-2.29,5.41-1.34,1.32-3.04,2.03-4.82,2.03h-26.26s-.08,0-.12,0c-3.85-.06-6.99-3.25-6.99-7.11v-123.03h-34.5v122.44c0,22.89,18.35,41.82,40.9,42.2h26.97c10.97,0,21.33-4.22,29.17-11.94,8.02-7.89,12.44-18.42,12.44-29.67v-136.97c0-4.62-2.01-9.01-5.5-12.03l-62.37-51.98Z" />
                <path d="M415.91,0h-26.26c-8.75,0-16.32,5.6-23.03,10.23-6.71-4.64-15.39-10.23-24.14-10.23h-26.26c-22.94,0-41.61,18.67-41.61,41.61v320.12h34.5V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v320.12h32.95V41.61c0-3.92,3.19-7.11,7.11-7.11h26.26c3.92,0,7.11,3.19,7.11,7.11v320.12h34.5V41.61c0-22.94-18.67-41.61-41.61-41.61Z" />
                <rect x="829.39" y="0" width="32.95" height="361.55" />
              </svg>
            </div>
            <p className="footer-note">
              The first AI studio engineered for African directors, visual storytellers, and micro-drama filmmakers.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h5>Platform</h5>
              <ul>
                <li><a href="#showreel">Showreel</a></li>
                <li><a href="#workflow">Pipeline</a></li>
                <li><a href="#capabilities">Capabilities</a></li>
                <li><a href="#models">Models</a></li>
                <li><a href="#showcase">Showcase</a></li>
                <li><a href="#training">AI Training</a></li>
                <li><Link href="/distribution">Distribution</Link></li>
                <li><a href="#waitlist">Cohort Waitlist</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Direct</h5>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="mailto:info@osmosisone.com">Contact</a></li>
                <li><Link href="/pricing">Credit Packages</Link></li>
                <li><Link href="/checkout">Checkout Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <span>&copy; {new Date().getFullYear()} Osmosis. All rights reserved.</span>
          <span>Secured by Paystack &amp; Resend</span>
        </div>
      </footer>
    </div>
  );
}
