# ShipMeter

**A shipping cost calculator built with React and TypeScript.**

ShipMeter is a portfolio project that demonstrates how to build a responsive shipping cost calculator with configurable sample rates, input validation, transparent cost breakdowns, and automated tests.

> **Important:** ShipMeter uses fictional demonstration rates. It does not provide real courier quotes or represent the pricing of any shipping company.

## Features

- **Route selection:** Choose from the configured shipping routes.
- **Weight-based calculations:** Calculate shipping costs based on shipment weight and included weight allowances.
- **Transparent cost breakdown:** View the base charge, additional-weight charge, surcharge, and total.
- **Input validation:** Reject invalid weights and unsupported shipment values.
- **Responsive interface:** Use the calculator on desktop and mobile screens.
- **Automated tests:** Verify calculation rules and edge cases using Vitest.
- **Type safety:** Use TypeScript to define shipping rates and calculation results.

## Demo Rates

ShipMeter currently includes these fictional routes:

| Route | Base Charge | Included Weight | Additional Charge | Surcharge |
|---|---:|---:|---:|---:|
| United States → United Kingdom | $10.00 | 2 kg | $3.00/kg | $2.00 |
| United Kingdom → Germany | $8.00 | 1 kg | $2.50/kg | $0.00 |
| United Arab Emirates → Oman | $7.00 | 1 kg | $2.00/kg | $1.50 |

All amounts are illustrative and expressed in USD. These values are for software demonstration only.

## How Calculations Work

The calculator uses the selected route's configured rates.

1. Validate the shipment weight and configured rate.
2. Apply the route's included weight allowance.
3. Round any additional billable weight up to the next whole kilogram.
4. Calculate the additional-weight charge.
5. Add the base charge and surcharge.
6. Return the total and a breakdown of the charges.

**Example:** A 3.2 kg shipment on the United States → United Kingdom demo route has 1.2 kg above the included 2 kg allowance. That is rounded up to 2 billable kilograms.

- Base charge: $10.00
- Additional-weight charge: 2 × $3.00 = $6.00
- Surcharge: $2.00
- **Total: $18.00**

## Technology Stack

- React
- TypeScript
- Vite
- Vitest
- ESLint
- npm

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/osmanbinabubakar/shipping-cost-calculator.git
cd shipping-cost-calculator
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Quality Checks

Run the automated tests:

```bash
npm test
```

Run TypeScript checks and create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Project Scope and Limitations

ShipMeter is a demonstration project, not a production shipping-rate service.

- Rates are fictional and configurable in the source code.
- USD is the only supported calculation currency.
- The calculator does not fetch live carrier prices.
- Customs duties, taxes, insurance, and other real-world shipping fees are not included.
- Available routes are limited to those configured in the application.

Do not use the displayed estimates to make actual shipping or purchasing decisions.

## Future Improvements

Potential extensions include a user interface for managing shipping rates, additional shipping rules, more comprehensive accessiblity testing, and integration with real carrier APIs.

## License

No license has been specified yet. All rights and permissions remain with the repository owner unless a license is added.
