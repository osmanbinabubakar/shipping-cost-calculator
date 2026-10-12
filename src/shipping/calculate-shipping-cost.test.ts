
import { describe, expect, it } from "vitest";
import { calculateShippingCost } from "./calculate-shipping-cost";
import type { ShippingRate } from "./types";

const standardRate: ShippingRate = {
  originCountryCode: "US",
  destinationCountryCode: "GB",
  currency: "USD",
  baseCharge: 10,
  includedWeightKg: 2,
  additionalChargePerKg: 3,
  surcharge: 2,
};

describe("calculateShippingCost", () => {
  it("calculates the total for additional billable weight", () => {
    const result = calculateShippingCost(3.2, standardRate);

    expect(result).toEqual({
      success: true,
      breakdown: {
        currency: "USD",
        baseCharge: 10,
        additionalWeightCharge: 6,
        surcharge: 2,
        total: 18,
        billableWeightKg: 2,
      },
    });
  });

  it("charges no additional weight within the included limit", () => {
    const result = calculateShippingCost(2, standardRate);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.breakdown.additionalWeightCharge).toBe(0);
      expect(result.breakdown.total).toBe(12);
    }
  });

  it("rounds a fractional additional kilogram up", () => {
    const result = calculateShippingCost(2.01, standardRate);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.breakdown.billableWeightKg).toBe(1);
      expect(result.breakdown.total).toBe(15);
    }
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects invalid shipment weight: %s",
    (weight) => {
      const result = calculateShippingCost(weight, standardRate);

      expect(result.success).toBe(false);
    },
  );

  it("rejects shipment weight above the supported maximum", () => {
    const result = calculateShippingCost(1000.01, standardRate);

    expect(result).toEqual({
      success: false,
      error: "Shipment weight cannot exceed 1000 kg.",
    });
  });

  it("rejects a negative configured surcharge", () => {
    const invalidRate = { ...standardRate, surcharge: -1 };
    const result = calculateShippingCost(1, invalidRate);

    expect(result).toEqual({
      success: false,
      error: "The configured shipping rate is invalid.",
    });
  });

  it("rejects a rate with identical origin and destination", () => {
    const invalidRate = {
      ...standardRate,
      destinationCountryCode: "US",
    };

    const result = calculateShippingCost(1, invalidRate);

    expect(result.success).toBe(false);
  });

  it("rejects an unsupported currency", () => {
    const invalidRate = {
      ...standardRate,
      currency: "EUR",
    } as unknown as ShippingRate;

    const result = calculateShippingCost(1, invalidRate);

    expect(result.success).toBe(false);
  });

  it("calculates correctly for exactly one additional kilogram", () => {
    const result = calculateShippingCost(3, standardRate);

    expect(result).toEqual({
      success: true,
      breakdown: {
        currency: "USD",
        baseCharge: 10,
        additionalWeightCharge: 3,
        surcharge: 2,
        total: 15,
        billableWeightKg: 1,
      },
    });
  });

  it("rejects a non-finite configured base charge", () => {
    const invalidRate = {
      ...standardRate,
      baseCharge: Number.NaN,
    };

    const result = calculateShippingCost(1, invalidRate);

    expect(result).toEqual({
      success: false,
      error: "The configured shipping rate is invalid.",
    });
  });
});
