"use client";

import { useState } from "react";
import Link from "next/link";
import { plans } from "@/lib/plans";

const faqs = [
  {
    q: "How do generation points work?",
    a: "2 points equals exactly 1 second of AI video generation. For example, the Growth package gives you 1,900 points. Your balance and exact job cost are always displayed in points before you start any generation.",
  },
  {
    q: "Do my purchased points expire?",
    a: "No. Points never expire. Once purchased, your balance remains in your account indefinitely until you choose to use it.",
  },
  {
    q: "Why are retries billed at the standard rate?",
    a: "Every video generation consumes the same dedicated GPU compute cluster time whether you decide to keep the clip for your final cut or re-roll the prompt. We believe in complete transparency: you are buying generation compute time, not a pre-determined count of finished clips.",
  },
  {
    q: "Who owns the rights to the generated films?",
    a: "You retain 100% full commercial ownership of all clips, storyboards, and audio generated through your Osmosis account. You are free to distribute, monetize, and screen your films anywhere without royalty fees.",
  },
  {
    q: "How do I receive my account after completing payment?",
    a: "During this phase, our team manually provisions and calibrates each director account to ensure peak rendering fidelity. Within moments of your Paystack payment confirmation, you will receive an initial receipt email, followed promptly by your login credentials.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            <a href="#workflow" className="nav-link">Workflow</a>
            <a href="#capabilities" className="nav-link">Capabilities</a>
            <a href="#models" className="nav-link">Models</a>
            <a href="#showcase" className="nav-link">Showcase</a>
            <Link href="/distribution" className="nav-link">Distribution</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <Link href="/pricing" className="nav-cta">
            Get Started
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
                <h1>Direct your
                  <br />
                  first film with AI.</h1>
              </div>
              <div className="hero-top-right">
                <p className="tag">
                  From script to final 4K render and direct vertical distribution — direct consistent characters, master cinematic camera motion, reach built-in audiences, and earn revenue as you&rsquo;re watched.
                </p>
              </div>
            </div>

            <div className="hero-actions">
              <Link href="/pricing" className="btn">
                Get generation credits
              </Link>
              <a href="#workflow" className="btn secondary">
                See how it works
              </a>
            </div>

            {/* Showreel-in-hero: real generated clips (not stock footage,
                not a UI mockup) standing in as the hero's visual proof —
                trimmed to a hero-scaled 3-col grid, no in-grid CTA since
                the two buttons above already cover that job. */}
            <div className="masonry-grid">
              <div className="masonry-item tall">
                <video src="/masonry-grid/Macro_push_in_on_iris.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item tall">
                <video src="/masonry-grid/Transitioning_from_smartphone_to.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item wide">
                <video src="/masonry-grid/Dolly_push_through_tunnel.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item tall">
                <video src="/masonry-grid/Model_holding_coffee_and_bags_.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item wide">
                <video src="/masonry-grid/Person_tumbling_near_glass_surface_20260917115714.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item tall">
                <video src="/masonry-grid/Person_sprinting_down_street.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item wide">
                <video src="/masonry-grid/Figure_walking_through_concrete.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item tall">
                <video src="/masonry-grid/Person_turning_in_jacket.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="masonry-item wide">
                <video src="/masonry-grid/Figure_climbing_building_facade.mp4" autoPlay loop muted playsInline />
                <div className="masonry-cta-overlay">
                  <Link href="/pricing" className="masonry-cta">
                    Start creating
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
            <h2>How production works in Osmosis</h2>
            <p className="lede">
              A studio built specifically for directors: turn written narrative into continuous cinematic footage and distribute directly to audiences.
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
                  Publish in one tap to the Osmosis mobile feed, reach phone-first viewers worldwide, and earn a direct revenue share on every view.
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
              Not random clips — precision cinematography engineered for filmmakers.
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
            <h2>One studio. Any cinematic universe.</h2>
            <p className="lede">
              Brand colors never touch the footage. The generated shot stays true to whatever world the director is actually making.
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

        {/* Distribution teaser — the pipeline doesn't end at render;
            links out to the dedicated /distribution page for the full
            mechanics (revenue share terms, FAQ). */}
        <section id="distribution" className="section-light">
          <div className="wrap">
            <div className="kicker">Distribution</div>
            <h2>Your film doesn&rsquo;t stop at render.</h2>
            <p className="lede">
              Publish straight to the Osmosis feed, reach viewers built for vertical, phone-first stories, and earn a revenue share on every view.
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
                <h3>Reach a built-in audience</h3>
                <p>
                  Get discovered by viewers already watching short, serialized vertical series across the Osmosis distribution network.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">03</div>
                <h3>Earn as you&rsquo;re watched</h3>
                <p>
                  Collect a revenue share on every view, with optional licensing to partner platforms as your series grows.
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

        {/* Authoritative Pricing Section (per lib/plans.ts) */}
        <section id="pricing">
          <div className="wrap">
            <div className="kicker">Access</div>
            <h2>Buy generation time. Start today.</h2>
            <p className="lede">
              Pick your tier. One-time purchase in Naira via Paystack with zero recurring commitments.
            </p>

            <div className="swatch-pricing-grid">
              {plans.map((plan) => (
                <div key={plan.id} className={`pricing-box ${plan.recommended ? "popular" : ""}`}>
                  {plan.recommended && <div className="badge-rec">Recommended</div>}
                  <h3>{plan.name}</h3>
                  <div className="pricing-credits">
                    <span className="amt">{plan.points.toLocaleString()}</span>
                    <span className="lbl">credits</span>
                  </div>
                  <div className="pricing-rate">₦{plan.perSecondNaira} / second · 2 points = 1s</div>
                  <div className="pricing-row">
                    <span className="listed">₦{plan.listedNaira.toLocaleString()}</span>
                    <span className="vat">+ VAT</span>
                  </div>
                  <div className="pricing-sub">
                    ₦{plan.totalNaira.toLocaleString()} total
                  </div>

                  {plan.modelLineup && (
                    <div className="pricing-models-card">
                      <div className="models-card-header">
                        <div className="models-card-title-wrap">
                          <span className="models-card-title">
                            ACCESS TO <span className="highlight-cyan">{plan.modelLineup.header}</span>
                          </span>
                          <span className="models-card-sub">{plan.modelLineup.subtitle}</span>
                        </div>
                        <div className="models-card-icon-badge" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <rect x="1" y="6" width="2.2" height="8" rx="1.1" />
                            <rect x="5" y="2" width="2.2" height="12" rx="1.1" />
                            <rect x="9" y="5" width="2.2" height="9" rx="1.1" />
                            <rect x="13" y="1" width="2.2" height="13" rx="1.1" />
                          </svg>
                        </div>
                      </div>

                      <div className="models-card-rows">
                        {plan.modelLineup.models.map((model, idx) => (
                          <div key={idx} className="model-access-row">
                            <div className="model-name-wrap">
                              <svg className="model-row-icon" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                <rect x="1" y="6" width="2.2" height="8" rx="1.1" />
                                <rect x="5" y="2" width="2.2" height="12" rx="1.1" />
                                <rect x="9" y="5" width="2.2" height="9" rx="1.1" />
                                <rect x="13" y="1" width="2.2" height="13" rx="1.1" />
                              </svg>
                              <span className="model-name">{model.name}</span>
                            </div>
                            <div className="model-badges">
                              <span className="badge-resolution">{model.resolution}</span>
                              <span className="badge-access">{model.access}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href={`/checkout?plan=${plan.id}`} className="btn">
                    Choose {plan.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="disclosures-wrap">
              <p>2 points = 1 second of generation. Balance and job cost are always shown in points before you confirm.</p>
              <p>Every generation is billed at the same rate whether you keep it or discard it — retries aren&apos;t free. This buys generation time, not a promised number of finished videos.</p>
              <p>Points don&apos;t expire. Purchases are final and non-refundable.</p>
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
              The first AI studio engineered for directors, visual storytellers, and independent film creators.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h5>Platform</h5>
              <ul>
                <li><a href="#workflow">Pipeline</a></li>
                <li><a href="#capabilities">Capabilities</a></li>
                <li><a href="#models">Models</a></li>
                <li><a href="#showcase">Showcase</a></li>
                <li><Link href="/distribution">Distribution</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Direct</h5>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="mailto:info@osmosisone.com">Contact</a></li>
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
