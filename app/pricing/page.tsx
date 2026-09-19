"use client";

import { useState } from "react";
import Link from "next/link";
import { plans } from "@/lib/plans";

const pricingFaqs = [
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
    q: "Can I upgrade to a bigger package later?",
    a: "Yes. Every package is a one-time, top-up purchase — buy Starter today and add a Growth or Enterprise package whenever you need more credits. Nothing expires and nothing is lost in between.",
  },
  {
    q: "Who owns the rights to the generated micro-dramas and series?",
    a: "You retain 100% full commercial ownership of all clips, storyboards, and audio generated through your Osmosis account. You are free to distribute, monetize, and screen your micro-series anywhere across Africa or global platforms without royalty fees.",
  },
];

export default function PricingPage() {
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
            <Link href="/#showreel" className="nav-link">Showreel</Link>
            <Link href="/#workflow" className="nav-link">Workflow</Link>
            <Link href="/#training" className="nav-link">AI Training</Link>
            <Link href="/distribution" className="nav-link">Distribution</Link>
            <Link href="/waitlist" className="nav-link">Waitlist</Link>
          </div>

          <Link href="/waitlist" className="nav-cta">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <main>
        {/* Page Header */}
        <section className="hero section-light">
          <div className="wrap">
            <div className="pricing-page-header">
              <div className="kicker">Access</div>
              <h1>Simple pricing.<br />Produce your micro-series.</h1>
              <p className="lede" style={{ marginTop: 20, marginBottom: 0 }}>
                Transparent generation compute for African creators producing episodic micro-dramas. One-time purchase in Naira via Paystack with zero recurring subscriptions — buy credits, direct your episodes in 4K, and retain 100% of your IP.
              </p>

              <div style={{
                marginTop: 28,
                background: "rgba(220, 255, 80, 0.08)",
                border: "1px solid rgba(220, 255, 80, 0.3)",
                borderRadius: 14,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}>
                <div>
                  <strong style={{ color: "var(--aura-solid)", display: "block", fontSize: 14 }}>Admissions Update · Cohort 01 Waitlist</strong>
                  <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--screen)" }}>
                    We are currently onboarding creators for <strong>Early Studio Platform Access</strong>. Apply now to get early access and platform walkthroughs.
                  </p>
                </div>
                <Link href="/waitlist" className="btn" style={{ padding: "10px 18px", fontSize: 13.5 }}>
                  Apply for Waitlist
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Grid (shared source: lib/plans.ts) */}
        <section id="packages">
          <div className="wrap">
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

        {/* Pricing FAQ */}
        <section id="pricing-faq" className="section-light">
          <div className="wrap">
            <div className="kicker">Reference</div>
            <h2>Billing questions</h2>
            <p className="lede">
              Clear rules and compute economics before you buy.
            </p>

            <div className="faq-group">
              {pricingFaqs.map((faq, index) => {
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
                <li><Link href="/#workflow">Pipeline</Link></li>
                <li><Link href="/#capabilities">Capabilities</Link></li>
                <li><Link href="/#models">Models</Link></li>
                <li><Link href="/#showcase">Showcase</Link></li>
                <li><Link href="/#training">AI Training</Link></li>
                <li><Link href="/distribution">Distribution</Link></li>
                <li><Link href="/waitlist">Cohort Waitlist</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Direct</h5>
              <ul>
                <li><Link href="/#faq">FAQ</Link></li>
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
