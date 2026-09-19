"use client";

import { useActionState, useState } from "react";
import { submitWaitlistApplication, type WaitlistState } from "@/app/actions/waitlist";

const disciplines = [
  "Director / Indie Filmmaker",
  "Screenwriter / Showrunner",
  "3D / VFX / Animator",
  "Creative Producer / Studio",
  "Digital Content Creator",
  "Other Creative Discipline",
];

const experienceLevels = [
  { id: "beginner", label: "Beginner", desc: "Curious, little to no AI video experience" },
  { id: "intermediate", label: "Intermediate", desc: "Used Runway, Midjourney, Kling or Pika" },
  { id: "advanced", label: "Advanced", desc: "Actively directing AI video productions" },
];

export default function WaitlistForm() {
  const [state, formAction, isPending] = useActionState<WaitlistState, FormData>(
    submitWaitlistApplication,
    { success: false }
  );

  const [selectedDiscipline, setSelectedDiscipline] = useState(disciplines[0]);
  const [selectedExperience, setSelectedExperience] = useState(experienceLevels[0].id);

  if (state?.success) {
    return (
      <div className="waitlist-success-card">
        <div className="waitlist-success-badge" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="waitlist-success-title">Application Received!</h3>
        <p className="waitlist-success-desc">
          You have secured your place in the applicant review pool for <strong>Osmosis AI Filmmaking Cohort 01</strong>. A confirmation has been sent to your email.
        </p>

        <div className="waitlist-next-steps">
          <div className="next-step-item">
            <span className="step-num">01</span>
            <div>
              <strong>Review & Selection</strong>
              <p>Our directing panel reviews applications on a rolling weekly basis.</p>
            </div>
          </div>
          <div className="next-step-item">
            <span className="step-num">02</span>
            <div>
              <strong>Onboarding & Pilot Credits</strong>
              <p>Selected creators receive access keys and generation compute allocations.</p>
            </div>
          </div>
          <div className="next-step-item">
            <span className="step-num">03</span>
            <div>
              <strong>Live Cohort Sessions</strong>
              <p>Interactive 4-week intensive directing curriculum and 1-on-1 mentorship.</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn secondary"
          style={{ marginTop: "24px" }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="waitlist-form">
      {state?.error && (
        <div className="error-banner" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      <div className="form-grid-2">
        <div className="input-field-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="e.g. Amara Okafor"
            autoComplete="name"
          />
        </div>

        <div className="input-field-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@domain.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="input-field-group">
          <label htmlFor="phone">Phone / WhatsApp Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+234 801 234 5678"
            autoComplete="tel"
          />
        </div>

        <div className="input-field-group">
          <label htmlFor="discipline">Primary Creative Discipline *</label>
          <select
            id="discipline"
            name="discipline"
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="form-select"
          >
            {disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-field-group">
        <label>Experience with Generative AI Video *</label>
        <div className="experience-pills">
          {experienceLevels.map((lvl) => (
            <label
              key={lvl.id}
              className={`exp-pill ${selectedExperience === lvl.id ? "active" : ""}`}
            >
              <input
                type="radio"
                name="experience"
                value={lvl.label}
                checked={selectedExperience === lvl.id}
                onChange={() => setSelectedExperience(lvl.id)}
                className="sr-only"
              />
              <span className="exp-pill-title">{lvl.label}</span>
              <span className="exp-pill-desc">{lvl.desc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="input-field-group">
        <label htmlFor="portfolio">Portfolio, Reel, or Social Profile (Optional)</label>
        <input
          type="url"
          id="portfolio"
          name="portfolio"
          placeholder="https://instagram.com/yourhandle or YouTube/Vimeo"
        />
      </div>

      <div className="input-field-group">
        <label htmlFor="projectPitch">
          What African micro-drama or story do you want to create? (Optional)
        </label>
        <textarea
          id="projectPitch"
          name="projectPitch"
          rows={3}
          placeholder="A quick 1-2 sentence logline of your vision or premise..."
          className="form-textarea"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn waitlist-submit-btn"
      >
        {isPending ? (
          <span className="btn-loading-flex">
            <svg className="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
            </svg>
            Submitting application...
          </span>
        ) : (
          "Apply for Cohort 01 Waitlist"
        )}
      </button>

      <p className="form-disclaimer">
        Free to apply. Applications are reviewed on a rolling basis. Cohort 01 participants will receive dedicated generation compute credits and distribution consideration.
      </p>
    </form>
  );
}
