
"use client";

import { useState } from "react";

const THRESHOLDS: Record<
  string,
  {
    monthly: number;
    weekly: number;
    annual: number;
    rate: number;
  }
> = {
  "1": {
    monthly: 2241,
    weekly: 517,
    annual: 26900,
    rate: 0.09,
  },
  "2": {
    monthly: 2448,
    weekly: 565,
    annual: 29385,
    rate: 0.09,
  },
  "4": {
    monthly: 2816,
    weekly: 649,
    annual: 33795,
    rate: 0.09,
  },
  "5": {
    monthly: 2083,
    weekly: 480,
    annual: 25000,
    rate: 0.09,
  },
  pg: {
    monthly: 1750,
    weekly: 403,
    annual: 21000,
    rate: 0.06,
  },
};

const fmt = (n: number) =>
  "£" +
  n.toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  });

function estimate(
  t: (typeof THRESHOLDS)[string] | undefined,
  salary: number,
  periods: number
): number {
  if (!t) return 0;

  const threshold =
    periods === 12
      ? t.monthly
      : periods === 52
        ? t.weekly
        : t.annual / periods;

  return Math.max(
    0,
    Math.floor((salary / periods - threshold) * t.rate)
  );
}

export default function RepaymentEstimator() {
  const [plan, setPlan] = useState("5");
  const [pgChecked, setPgChecked] = useState(false);
  const [income, setIncome] = useState(32000);
  const [freq, setFreq] = useState(12);

  const t = THRESHOLDS[plan];

  const periods = freq;

  const u = estimate(t, income, periods);

  const p = pgChecked
    ? estimate(THRESHOLDS.pg, income, periods)
    : 0;

  const unit =
    periods === 12
      ? "month"
      : periods === 52
        ? "week"
        : "fortnight";

  const detail =
    (t
      ? `Undergraduate threshold: ${fmt(t.annual)}/year. `
      : "No undergraduate plan selected. ") +
    (pgChecked
      ? "Postgraduate threshold: £21,000/year. "
      : "") +
    "Rounded down to whole pounds per illustrative pay period.";

  return (
    <div className="ysrep-layout">
      {/* Controls */}
      <div className="ysrep-panel">
        <label htmlFor="ysrep-plan">
          Undergraduate loan plan
        </label>

        <select
          id="ysrep-plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="5">
            Plan 5 — England, courses from August 2023
          </option>
          <option value="2">
            Plan 2 — England/Wales, older courses
          </option>
          <option value="1">Plan 1 — older loans</option>
          <option value="4">Plan 4 — Scotland</option>
          <option value="none">No undergraduate loan</option>
        </select>

        <label className="ysrep-check">
          <input
            id="ysrep-pg"
            type="checkbox"
            checked={pgChecked}
            onChange={(e) =>
              setPgChecked(e.target.checked)
            }
          />
          I also have an English Postgraduate Loan
        </label>

        <label htmlFor="ysrep-income">
          Gross annual employment income{" "}
          <output id="ysrep-income-label">
            {fmt(income)}
          </output>
        </label>

        <input
          id="ysrep-income"
          type="range"
          min={0}
          max={120000}
          step={500}
          value={income}
          onChange={(e) =>
            setIncome(Number(e.target.value))
          }
        />

        <div className="ysrep-range">
          <span>£0</span>
          <span>£120,000</span>
        </div>

        <label htmlFor="ysrep-frequency">
          Pay frequency
        </label>

        <select
          id="ysrep-frequency"
          value={freq}
          onChange={(e) =>
            setFreq(Number(e.target.value))
          }
        >
          <option value={12}>Monthly</option>
          <option value={52}>Weekly</option>
          <option value={26}>
            Fortnightly (illustrative)
          </option>
        </select>

        <p className="ysrep-note">
          For PAYE, deductions are assessed by pay period,
          not by simply dividing annual repayments. The
          figures below are illustrative and exclude other
          deductions, refunds and arrears.
        </p>
      </div>

      {/* Results */}
      <div
        aria-live="polite"
        className="ysrep-result"
      >
        <p>Estimated total repayment</p>

        <strong id="ysrep-total">
          {fmt(u + p)} / {unit}
        </strong>

        <div className="ysrep-split">
          <span>Undergraduate loan</span>
          <b>{fmt(u)} / {unit}</b>
        </div>

        <div className="ysrep-split">
          <span>Postgraduate loan</span>
          <b>{fmt(p)} / {unit}</b>
        </div>

        <div className="ysrep-split">
          <span>Approximate annual equivalent</span>
          <b>{fmt((u + p) * periods)}</b>
        </div>

        <p className="ysrep-note">{detail}</p>

        <a
          className="ysrep-official"
          href="https://www.gov.uk/repaying-your-student-loan/what-you-pay"
          rel="noopener noreferrer"
          target="_blank"
        >
          Check official repayment thresholds ↗
        </a>
      </div>
    </div>
  );
}
