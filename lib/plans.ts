// lib/plans.ts
//
// Single source of truth for pricing — imported by the page (to render)
// AND by the webhook (to check what a payment actually claims to be for
// against what it actually paid). Never trust a plan's identity or price
// from client-supplied metadata alone; always cross-check against this.

export interface PlanModelAccess {
  name: string;
  resolution: string;
  access: string;
}

export interface Plan {
  id: string;
  name: string;
  points: number;
  listedNaira: number;
  totalNaira: number; // VAT-inclusive — what Paystack actually charges
  minutes: string;
  perSecondNaira: string;
  recommended?: boolean;
  modelLineup?: {
    header: string;
    subtitle: string;
    models: PlanModelAccess[];
  };
}

// Source: Oraya_Points-Pricing-Model.pdf, Sections 2–4.
export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    points: 900,
    listedNaira: 15000,
    totalNaira: 16125,
    minutes: "7.5",
    perSecondNaira: "33.33",
    modelLineup: {
      header: "SEEDANCE & SEEDREAM",
      subtitle: "Full line-up included",
      models: [
        { name: "Seedance 2.5", resolution: "1080p", access: "Full access" },
        { name: "Seedance 2.0", resolution: "4K", access: "Full access" },
        { name: "SeeDream", resolution: "4K Stills", access: "Full access" },
      ],
    },
  },
  {
    id: "growth",
    name: "Growth",
    points: 1900,
    listedNaira: 30000,
    totalNaira: 32250,
    minutes: "15.8",
    perSecondNaira: "31.58",
    recommended: true,
    modelLineup: {
      header: "SEEDANCE & SEEDREAM",
      subtitle: "Full line-up included",
      models: [
        { name: "Seedance 2.5", resolution: "1080p", access: "Full access" },
        { name: "Seedance 2.0", resolution: "4K", access: "Full access" },
        { name: "SeeDream", resolution: "4K Stills", access: "Full access" },
      ],
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    points: 3400,
    listedNaira: 50000,
    totalNaira: 53750,
    minutes: "28.3",
    perSecondNaira: "29.41",
    modelLineup: {
      header: "SEEDANCE & SEEDREAM",
      subtitle: "Full line-up included",
      models: [
        { name: "Seedance 2.5", resolution: "1080p", access: "Full access" },
        { name: "Seedance 2.0", resolution: "4K", access: "Full access" },
        { name: "SeeDream", resolution: "4K Stills", access: "Full access" },
      ],
    },
  },
];

export const testPlan: Plan = {
  id: "test",
  name: "Live Test Pass",
  points: 10,
  listedNaira: 100,
  totalNaira: 100,
  minutes: "0.1",
  perSecondNaira: "10.00",
  modelLineup: {
    header: "TEST SUITE",
    subtitle: "Verification Pass Included",
    models: [
      { name: "Seedance 2.5", resolution: "1080p", access: "Full access" },
      { name: "Seedance 2.0", resolution: "4K", access: "Full access" },
      { name: "SeeDream", resolution: "4K Stills", access: "Full access" },
    ],
  },
};

export function getPlanById(id: string | null | undefined): Plan | undefined {
  if (id === "test" || id === "test-100") return testPlan;
  return plans.find((p) => p.id === id);
}
