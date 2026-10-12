
import { useState } from "react";
import { calculateShippingCost } from "./shipping/calculate-shipping-cost";
import { SHIPPING_RATE_CONFIG } from "./shipping/shipping-rate-config";
import type { ShippingCalculationResult } from "./shipping/types";
import "./App.css";

function App() {
  const [selectedRoute, setSelectedRoute] = useState("US-GB");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<ShippingCalculationResult | null>(
    null,
  );

  const selectedRate = SHIPPING_RATE_CONFIG.find(
    (rate) =>
      `${rate.originCountryCode}-${rate.destinationCountryCode}` ===
      selectedRoute,
  );

  const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!weight.trim()) {
      setResult({
        success: false,
        error: "Enter the shipment weight to calculate the cost.",
      });
      return;
    }

    if (!selectedRate) {
      setResult({
        success: false,
        error: "Please select a supported shipping route.",
      });
      return;
    }

    setResult(calculateShippingCost(Number(weight), selectedRate));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ShipMeter home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>
            Ship<span className="brand-accent">Meter</span>
          </span>
        </a>

        <span className="header-label">SHIPPING ESTIMATOR</span>
      </header>

      <main className="main-content">
        <section className="intro">
          <span className="eyebrow">INTERNATIONAL SHIPPING</span>
          <h1>Know your shipping cost.</h1>
          <p>
            Estimate shipping charges with a transparent breakdown.
            Simple, clear, and built for better decisions.
          </p>
        </section>

        <div className="calculator-layout">
          <section className="calculator-card">
            <div className="card-heading">
              <div>
                <span className="section-label">SHIPMENT DETAILS</span>
                <h2>Calculate your rate</h2>
              </div>
              <span className="step-indicator">01 / 01</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label htmlFor="route">Shipping route</label>
                <select
                  id="route"
                  value={selectedRoute}
                  onChange={(event) => {
                    setSelectedRoute(event.target.value);
                    setResult(null);
                  }}
                >
                  {SHIPPING_RATE_CONFIG.map((rate) => (
                    <option
                      key={`${rate.originCountryCode}-${rate.destinationCountryCode}`}
                      value={`${rate.originCountryCode}-${rate.destinationCountryCode}`}
                    >
                      {rate.originCountryCode} → {rate.destinationCountryCode}
                    </option>
                  ))}
                </select>
                <span className="field-hint">
                  Choose one of the currently configured routes.
                </span>
              </div>

              <div className="field-group">
                <label htmlFor="weight">Shipment weight</label>
                <div className="weight-input">
                  <input
                    id="weight"
                    type="number"
                    min="0"
                    max="1000"
                    step="any"
                    inputMode="decimal"
                    placeholder="e.g. 3.5"
                    value={weight}
                    onChange={(event) => {
                      setWeight(event.target.value);
                      setResult(null);
                    }}
                    aria-describedby="weight-hint"
                  />
                  <span className="weight-unit">KG</span>
                </div>
                <span className="field-hint" id="weight-hint">
                  Enter a weight greater than 0 kg, up to 1,000 kg.
                </span>
              </div>

              <button className="calculate-button" type="submit">
                Calculate shipping cost
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className="demo-note">
              <span aria-hidden="true">ⓘ</span>
              Uses fictional demonstration rates, not live carrier prices.
            </p>
          </section>

          <section className="result-card" aria-live="polite">
            <span className="section-label">COST ESTIMATE</span>

            {result === null ? (
              <div className="empty-result">
                <div className="result-icon" aria-hidden="true">
                  ↗
                </div>
                <h2>Your estimate starts here.</h2>
                <p>
                  Select a route, enter the shipment weight, and calculate
                  to see your estimated shipping charges.
                </p>
                <div className="empty-divider" />
                <div className="feature-row">
                  <span aria-hidden="true">✓</span>
                  Transparent cost breakdown
                </div>
                <div className="feature-row">
                  <span aria-hidden="true">✓</span>
                  Additional weight calculation
                </div>
              </div>
            ) : !result.success ? (
              <div className="error-result" role="alert">
                <div className="result-icon error-icon" aria-hidden="true">
                  !
                </div>
                <h2>Unable to calculate</h2>
                <p>{result.error}</p>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => setResult(null)}
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="success-result">
                <p className="total-caption">Estimated total</p>
                <p className="total-amount">
                  {formatCurrency(
                    result.breakdown.total,
                    result.breakdown.currency,
                  )}
                </p>
                <p className="estimate-status">
                  <span aria-hidden="true">✓</span>
                  Estimate calculated
                </p>

                <div className="result-divider" />

                <div className="breakdown-heading">
                  <h2>Cost breakdown</h2>
                  <span>{result.breakdown.currency}</span>
                </div>

                <div className="breakdown-row">
                  <span>Base shipping charge</span>
                  <strong>
                    {formatCurrency(
                      result.breakdown.baseCharge,
                      result.breakdown.currency,
                    )}
                  </strong>
                </div>

                <div className="breakdown-row">
                  <span>Additional weight</span>
                  <strong>
                    {formatCurrency(
                      result.breakdown.additionalWeightCharge,
                      result.breakdown.currency,
                    )}
                  </strong>
                </div>

                <div className="breakdown-row">
                  <span>Surcharge</span>
                  <strong>
                    {formatCurrency(
                      result.breakdown.surcharge,
                      result.breakdown.currency,
                    )}
                  </strong>
                </div>

                <div className="breakdown-row billable-row">
                  <span>Billable additional weight</span>
                  <strong>
                    {result.breakdown.billableWeightKg} kg
                  </strong>
                </div>

                <p className="result-disclaimer">
                  Demonstration estimate only. Actual carrier charges,
                  taxes, customs duties, and other fees may differ.
                </p>
              </div>
            )}
          </section>
        </div>

        <footer className="page-footer">
          <span>ShipMeter · Shipping cost estimation</span>
          <span>Sample rates · USD</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
