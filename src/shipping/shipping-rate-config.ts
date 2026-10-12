
import type { ShippingRate } from "./types";

export const SHIPPING_RATE_CONFIG: readonly ShippingRate[] = [
  {
    originCountryCode: "US",
    destinationCountryCode: "GB",
    currency: "USD",
    baseCharge: 10,
    includedWeightKg: 2,
    additionalChargePerKg: 3,
    surcharge: 2,
  },
  {
    originCountryCode: "GB",
    destinationCountryCode: "DE",
    currency: "USD",
    baseCharge: 8,
    includedWeightKg: 1,
    additionalChargePerKg: 2.5,
    surcharge: 0,
  },
  {
    originCountryCode: "AE",
    destinationCountryCode: "OM",
    currency: "USD",
    baseCharge: 7,
    includedWeightKg: 1,
    additionalChargePerKg: 2,
    surcharge: 1.5,
  },
];
