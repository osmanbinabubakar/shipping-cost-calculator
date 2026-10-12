
export interface ShippingRate {
  originCountryCode: string;
  destinationCountryCode: string;
  currency: "USD";
  baseCharge: number;
  includedWeightKg: number;
  additionalChargePerKg: number;
  surcharge: number;
}

export interface ShippingCostBreakdown {
  currency: "USD";
  baseCharge: number;
  additionalWeightCharge: number;
  surcharge: number;
  total: number;
  billableWeightKg: number;
}

export type ShippingCalculationResult =
  | {
      success: true;
      breakdown: ShippingCostBreakdown;
    }
  | {
      success: false;
      error: string;
    };
