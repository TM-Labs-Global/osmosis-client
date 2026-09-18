"use client";

import { useState } from "react";
import Link from "next/link";

const distributionFaqs = [
  {
    q: "Do I have to publish everything I generate?",
    a: "No. Publishing to the Osmosis feed is entirely optional and happens per project. Keep drafts, tests, and unfinished cuts private, and publish only the films you're ready to put in front of an audience.",
  },
  {
    q: "How is my revenue share calculated?",
    a: "You earn a share of the ad and platform revenue driven by verified views on your published series. Views are tallied continuously and your share accrues to your account balance in real time.",
  },
  {
    q: "Do I keep the rights to what I publish?",
    a: "Yes. Publishing to Osmosis never transfers ownership — you retain 100% full commercial rights to every clip, storyboard, and frame you generate, whether it's published or not.",
  },
  {
    q: "Can I also publish my film elsewhere?",
    a: "Yes. Distribution through Osmosis isn't exclusive. License or publish your films anywhere else you like, in parallel — nothing about using Osmosis's feed restricts what you do with your own work.",
  },
  {
    q: "When do I start earning, and when do I get paid?",
    a: "Revenue share begins accruing from your very first published view. Payouts are issued monthly to the account you connect at publish time, once your balance crosses the ₦5,000 minimum threshold.",
  },
];

export default function DistributionPage() {
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
            <Link href="/distribution" className="nav-link">Distribution</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
          </div>

          <Link href="/pricing" className="nav-cta">
            Get Started
          </Link>
        </div>
      </nav>

      <main>
        {/* Page Header */}
        <section className="hero section-light">
          <div className="wrap">
            <div className="pricing-page-header">
              <div className="kicker">Distribution</div>
              <h1>Your film finds<br />its audience.</h1>
              <p className="lede" style={{ marginTop: 20, marginBottom: 0 }}>
                Generation is only the first half. Publish straight to the Osmosis feed, reach viewers built for vertical, phone-first stories, and get paid for every view.
              </p>
            </div>
          </div>
        </section>

        {/* How distribution works */}
        <section id="how-it-works">
          <div className="wrap">
            <div className="kicker">Mechanics</div>
            <h2>From render to revenue in three steps</h2>
            <p className="lede">
              No separate upload, no second platform to manage — distribution is built into the same studio you already direct in.
            </p>

            <div className="pipeline-grid">
              <div className="pipeline-card">
                <div className="num">01</div>
                <h3>Publish in one tap</h3>
                <p>
                  Send your finished cut straight from Re-cut Studio to the Osmosis feed — auto-formatted for vertical, phone-first playback, no re-export required.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">02</div>
                <h3>Reach a built-in audience</h3>
                <p>
                  Get discovered by viewers already watching short, serialized vertical series across the Osmosis distribution network — no ad spend required to launch.
                </p>
              </div>

              <div className="pipeline-card">
                <div className="num">03</div>
                <h3>Earn as you&rsquo;re watched</h3>
                <p>
                  Collect a revenue share on every verified view, with optional licensing to partner platforms as your series builds an audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue share terms */}
        <section id="terms" className="section-light">
          <div className="wrap">
            <div className="kicker">Terms</div>
            <h2>Simple, creator-first terms</h2>
            <p className="lede">
              No exclusivity, no forced publishing, no surprise cuts to what you keep.
            </p>

            <div className="cap-list">
              <div className="cap-item">
                <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10M9.5 9.5c0-1.4 1.2-2.2 2.5-2.2s2.5.8 2.5 2c0 1.6-2 2-2.5 2.7v.5M9.5 15.2c0 1.4 1.2 2.3 2.5 2.3s2.5-.9 2.5-2.3" strokeLinecap="round" />
                </svg>
                <span className="cap-item-tag">Payouts</span>
                <h3>70/30 revenue share</h3>
                <p>
                  You keep 70% of every view-based payout your published series earns. Balances accrue continuously and pay out monthly to your linked account.
                </p>
              </div>

              <div className="cap-item">
                <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                  <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
                  <path d="M9 12l2 2 4-4.5" strokeLinecap="round" />
                </svg>
                <span className="cap-item-tag">Ownership</span>
                <h3>You keep your rights</h3>
                <p>
                  Publishing never transfers ownership. You retain full commercial rights to every clip you generate, whether it&rsquo;s published, private, or licensed elsewhere.
                </p>
              </div>

              <div className="cap-item">
                <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                  <path d="M4 12h2M18 12h2M12 4v2M12 18v2" />
                </svg>
                <span className="cap-item-tag">Licensing</span>
                <h3>Optional licensing</h3>
                <p>
                  Opt in to license your series to partner platforms across the Osmosis network for additional revenue, on top of your feed earnings.
                </p>
              </div>

              <div className="cap-item">
                <svg className="cap-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="8" width="18" height="8" rx="4" />
                  <circle cx="8" cy="12" r="2.4" fill="currentColor" stroke="none" />
                </svg>
                <span className="cap-item-tag">Flexible</span>
                <h3>Never required</h3>
                <p>
                  Distribution is entirely optional, per project. Keep every generation private, or publish only the cuts you actually want in front of an audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Distribution FAQ */}
        <section id="distribution-faq">
          <div className="wrap">
            <div className="kicker">Reference</div>
            <h2>Distribution questions</h2>
            <p className="lede">
              How publishing, reach, and payouts actually work.
            </p>

            <div className="faq-group">
              {distributionFaqs.map((faq, index) => {
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

        {/* Closing CTA */}
        <section id="distribution-cta" className="section-light">
          <div className="wrap distribution-cta-wrap">
            <h2>Ready to make something worth publishing?</h2>
            <p className="lede" style={{ marginBottom: 0 }}>
              Buy generation time, direct your first film, and publish it to the Osmosis feed the moment it&rsquo;s ready.
            </p>
            <div className="distribution-teaser-cta">
              <Link href="/pricing" className="btn">
                Get generation credits
              </Link>
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
                <li><Link href="/#workflow">Pipeline</Link></li>
                <li><Link href="/#capabilities">Capabilities</Link></li>
                <li><Link href="/#models">Models</Link></li>
                <li><Link href="/#showcase">Showcase</Link></li>
                <li><Link href="/distribution">Distribution</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
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
