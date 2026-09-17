"use client";

import { useState, useEffect, Suspense } from "react";
import Script from "next/script";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { plans, getPlanById, type Plan } from "@/lib/plans";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: {
        key: string;
        email: string;
        amount: number; // in kobo
        currency?: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

type CheckoutState = "idle" | "processing" | "success" | "error";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planQuery = searchParams.get("plan");

  const [selectedPlan, setSelectedPlan] = useState<Plan>(() => {
    return getPlanById(planQuery) || plans.find((p) => p.recommended) || plans[0];
  });
  const [email, setEmail] = useState("");
  const [state, setState] = useState<CheckoutState>("idle");
  const [verifiedReference, setVerifiedReference] = useState<string | null>(null);

  useEffect(() => {
    const found = getPlanById(planQuery);
    if (found && found.id !== selectedPlan.id) {
      setSelectedPlan(found);
    }
  }, [planQuery]);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  function handlePlanChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const plan = getPlanById(e.target.value);
    if (plan) {
      setSelectedPlan(plan);
      router.replace(`/checkout?plan=${plan.id}`, { scroll: false });
    }
  }

  function startCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!publicKey) {
      alert("Paystack public key is not configured.");
      return;
    }
    if (!window.PaystackPop) {
      alert("Paystack payment engine is initializing. Please try again in a few seconds.");
      return;
    }

    setState("processing");

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: selectedPlan.totalNaira * 100, // VAT-inclusive total in kobo
      currency: "NGN",
      metadata: {
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        points: selectedPlan.points,
      },
      callback: (response) => {
        setVerifiedReference(response.reference);
        fetch(`/api/checkout/verify?reference=${encodeURIComponent(response.reference)}`)
          .then((r) => r.json())
          .then((data) => setState(data.success ? "success" : "error"))
          .catch(() => setState("error"));
      },
      onClose: () => {
        if (state === "processing") {
          setState("idle");
        }
      },
    });

    handler.openIframe();
  }

  const vatAmount = selectedPlan.totalNaira - selectedPlan.listedNaira;

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <Link href="/" className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Plans
        </Link>
        <Link href="/" className="brand-link">
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
      </header>

      {state === "success" ? (
        <section className="checkout-card receipt-card">
          <div className="success-icon-badge">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#DCFF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1>Payment Confirmed!</h1>
          <p className="receipt-card-subtitle">
            You are enrolled in the <strong>{selectedPlan.name}</strong> package ({selectedPlan.points.toLocaleString()} points).
          </p>
          <div className="receipt-summary-box">
            <div className="receipt-data-row">
              <span>Account Email</span>
              <strong>{email}</strong>
            </div>
            {verifiedReference && (
              <div className="receipt-data-row">
                <span>Transaction Reference</span>
                <strong className="monospace">{verifiedReference}</strong>
              </div>
            )}
            <div className="receipt-data-row">
              <span>Amount Paid</span>
              <strong>₦{selectedPlan.totalNaira.toLocaleString()} NGN</strong>
            </div>
          </div>
          <p className="receipt-closing-message">
            A confirmation receipt has been sent to your inbox. We are provisioning your generation account manually—your platform credentials will land shortly.
          </p>
          <Link href="/" className="home-return-button">
            Return to Homepage
          </Link>
        </section>
      ) : (
        <div className="checkout-grid">
          {/* Order Summary Column */}
          <section className="checkout-card">
            <div className="card-header-row">
              <h2>Order Summary</h2>
              <div className="plan-select-box">
                <label htmlFor="plan-select">Package</label>
                <select id="plan-select" value={selectedPlan.id} onChange={handlePlanChange}>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.points.toLocaleString()} credits) — ₦{p.totalNaira.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="package-hero-box">
              <div className="package-title-row">
                <span className="package-title">{selectedPlan.name}</span>
                {selectedPlan.recommended && <span className="tag-recommended">Recommended</span>}
              </div>
              <div className="package-minutes-row">
                <span className="minutes-num">{selectedPlan.points.toLocaleString()}</span>
                <span className="minutes-text">generation credits</span>
              </div>
              <div className="pills-row">
                <span className="pill-item">{selectedPlan.name} Tier</span>
                <span className="pill-item">₦{selectedPlan.perSecondNaira} / sec</span>
                <span className="pill-item">2 points = 1 sec</span>
              </div>
            </div>

            <div className="pricing-table">
              <div className="pricing-row">
                <span>Base Package</span>
                <span>₦{selectedPlan.listedNaira.toLocaleString()}</span>
              </div>
              <div className="pricing-row">
                <span>VAT (7.5%)</span>
                <span>₦{vatAmount.toLocaleString()}</span>
              </div>
              <div className="pricing-row total-line">
                <span>Total Due</span>
                <span className="total-amount">₦{selectedPlan.totalNaira.toLocaleString()}</span>
              </div>
            </div>

            <div className="terms-box">
              <p>• Retries are billed at the standard rate (2 points = 1s). Buys generation time, not finished clips.</p>
              <p>• Points never expire. Purchases are final and non-refundable.</p>
            </div>
          </section>

          {/* Payment & Email Column */}
          <section className="checkout-card">
            <h2>Customer Details</h2>
            <p className="card-instruction">
              Enter the email where you want your generation account confirmation and access delivered.
            </p>

            <form onSubmit={startCheckout}>
              <div className="input-field-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "processing"}
                  autoFocus
                />
              </div>

              {state === "error" && (
                <div className="error-banner">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Payment was not completed or verification failed. Please try again.
                </div>
              )}

              <button type="submit" className="submit-cta" disabled={state === "processing"}>
                {state === "processing" ? "Opening Secure Checkout…" : `Pay ₦${selectedPlan.totalNaira.toLocaleString()} Now`}
              </button>
            </form>

            <div className="security-footer">
              <div className="security-point">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Secured by Paystack</span>
              </div>
              <div className="security-point">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Bank-grade 256-bit encryption</span>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      <main className="checkout-page-wrapper">
        <Suspense fallback={<div className="loading">Loading checkout…</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
    </>
  );
}
