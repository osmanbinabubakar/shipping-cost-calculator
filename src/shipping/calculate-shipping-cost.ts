
import type {
  ShippingCalculationResult,
  ShippingRate,
} from "./types";

const MAX_SHIPMENT_WEIGHT_KG = 1000;
const MAX_CHARGE_USD = 1_000_000;
const MINOR_CURRENCY_UNITS = 100;

function isFiniteNonNegativeNumber(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

function isValidRate(rate: ShippingRate): boolean {
  return (
    rate.currency === "USD" &&
    typeof rate.originCountryCode === "string" &&
    /^[A-Z]{2}$/.test(rate.originCountryCode) &&
    typeof rate.destinationCountryCode === "string" &&
    /^[A-Z]{2}$/.test(rate.destinationCountryCode) &&
    rate.originCountryCode !== rate.destinationCountryCode &&
    isFiniteNonNegativeNumber(rate.baseCharge) &&
    rate.baseCharge <= MAX_CHARGE_USD &&
    isFiniteNonNegativeNumber(rate.includedWeightKg) &&
    rate.includedWeightKg <= MAX_SHIPMENT_WEIGHT_KG &&
    isFiniteNonNegativeNumber(rate.additionalChargePerKg) &&
    rate.additionalChargePerKg <= MAX_CHARGE_USD &&
    isFiniteNonNegativeNumber(rate.surcharge) &&
    rate.surcharge <= MAX_CHARGE_USD
  );
}

function failure(error: string): ShippingCalculationResult {
  return { success: false, error };
}

export function calculateShippingCost(
  weightKg: number,
  rate: ShippingRate,
): ShippingCalculationResult {
  if (!Number.isFinite(weightKg)) {
    return failure("Shipment weight must be a finite number.");
  }

  if (weightKg <= 0) {
    return failure("Shipment weight must be greater than zero.");
  }

  if (weightKg > MAX_SHIPMENT_WEIGHT_KG) {
    return failure(
      `Shipment weight cannot exceed ${MAX_SHIPMENT_WEIGHT_KG} kg.`,
    );
  }

  if (!isValidRate(rate)) {
    return failure("The configured shipping rate is invalid.");
  }

  const additionalWeightKg = Math.max(
    0,
    weightKg - rate.includedWeightKg,
  );

 const precisionTolerance =
  Number.EPSILON * Math.max(1, Math.abs(additionalWeightKg));

const billableWeightKg =
  additionalWeightKg === 0
    ? 0
    : Math.ceil(additionalWeightKg - precisionTolerance);

  const baseChargeInMinorUnits = Math.round(
    rate.baseCharge * MINOR_CURRENCY_UNITS,
  );

  const surchargeInMinorUnits = Math.round(
    rate.surcharge * MINOR_CURRENCY_UNITS,
  );

  const additionalWeightChargeInMinorUnits = Math.round(
    billableWeightKg *
      rate.additionalChargePerKg *
      MINOR_CURRENCY_UNITS,
  );

  const totalInMinorUnits =
    baseChargeInMinorUnits +
    additionalWeightChargeInMinorUnits +
    surchargeInMinorUnits;

  if (!Number.isSafeInteger(totalInMinorUnits)) {
    return failure(
      "The calculated shipping cost exceeds the supported range.",
    );
  }

  const breakdown = {
    currency: "USD" as const,
    baseCharge: baseChargeInMinorUnits / MINOR_CURRENCY_UNITS,
    additionalWeightCharge:
      additionalWeightChargeInMinorUnits / MINOR_CURRENCY_UNITS,
    surcharge: surchargeInMinorUnits / MINOR_CURRENCY_UNITS,
    total: totalInMinorUnits / MINOR_CURRENCY_UNITS,
    billableWeightKg,
  };

  return { success: true, breakdown };
}
