# ShipMeter

**A shipping cost calculator built with React and TypeScript.**

ShipMeter is a portfolio project that demonstrates a responsive shipping cost
calculator with configurable demonstration rates, input validation, transparent
cost breakdowns, and automated tests.

> **Important:** ShipMeter uses fictional demonstration rates. It does not
> provide live courier quotes or represent the pricing of any shipping company.

## Features

- **Route selection:** Choose from the shipping routes configured in the
  application.
- **Weight-based calculations:** Calculate shipping costs using shipment weight
  and the selected route's included weight allowance.
- **Transparent cost breakdown:** View the base charge, additional-weight
  charge, surcharge, and total estimated cost.
- **Input validation:** Reject invalid shipment weights and unsupported
  shipping-rate configurations.
- **Responsive interface:** Use the calculator on desktop and mobile screens.
- **Automated tests:** Verify calculation rules and edge cases with Vitest.
- **Type safety:** Use TypeScript to define shipping rates and calculation
  results.

## Demo Shipping Rates

ShipMeter currently includes three fictional shipping routes.

| Route                          | Base Charge | Included Weight | Additional Charge | Surcharge |
| ------------------------------ | ----------: | --------------: | ----------------: | --------: |
| United States → United Kingdom |      $10.00 |            2 kg |          $3.00/kg |     $2.00 |
| United Kingdom → Germany       |       $8.00 |            1 kg |          $2.50/kg |     $0.00 |
| United Arab Emirates → Oman    |       $7.00 |            1 kg |          $2.00/kg |     $1.50 |

All rates are illustrative and expressed in USD. They are provided solely to
demonstrate the application's calculation logic.

## How It Works

The calculator uses the selected route's configured rates to estimate the
shipping cost.

1. Validate the shipment weight and shipping-rate configuration.
2. Apply the route's included weight allowance.
3. Round any additional billable weight up to the next whole kilogram.
4. Calculate the additional-weight charge.
5. Add the base charge and surcharge.
6. Return the total cost and a breakdown of the charges.

### Calculation Example

Consider a 3.2 kg shipment from the United States to the United Kingdom.

The route includes 2 kg in its base charge, leaving 1.2 kg of additional weight.
The calculator rounds this up to 2 billable kilograms.

| Charge                   | Calculation           |     Amount |
| ------------------------ | --------------------- | ---------: |
| Base charge              | Fixed route rate      |     $10.00 |
| Additional-weight charge | 2 kg × $3.00          |      $6.00 |
| Surcharge                | Fixed route surcharge |      $2.00 |
| **Estimated total**      |                       | **$18.00** |

This example illustrates the configured calculation rules and does not represent
an actual courier quotation.

## Technology Stack

- **React** — User interface
- **TypeScript** — Static typing
- **Vite** — Development server and production build
- **Vitest** — Automated testing
- **ESLint** — Code quality and linting
- **npm** — Dependency and script management

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/osmanbinabubakar/shipping-cost-calculator.git
cd shipping-cost-calculator
```

Install the dependencies:

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

## Project Structure

```text
src/
├── shipping/
│   ├── calculate-shipping-cost.ts
│   ├── calculate-shipping-cost.test.ts
│   ├── shipping-rate-config.ts
│   └── types.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

The shipping calculation logic is separated from the React interface. Shipping
rates are maintained in a dedicated configuration file, while TypeScript types
define the structure of rates and calculation results. Automated tests cover the
calculation rules and important validation cases.

## Scope and Limitations

ShipMeter is a demonstration project, not a production shipping-rate service.

- Shipping rates are fictional and configured in the source code.
- USD is the only supported calculation currency.
- Only the routes configured in the application are supported.
- The calculator does not retrieve live carrier prices.
- Customs duties, taxes, insurance, and other real-world shipping fees are not
  included.
- The estimates are not intended for actual shipping or purchasing decisions.

## Future Improvements

Potential extensions include a user interface for managing shipping rates,
additional configurable shipping rules, more comprehensive accessibility
testing, and integrations with real carrier APIs.

These are possible future enhancements, not features currently implemented.

## License

No license has been specified for this repository. All rights remain with the
repository owner unless a license is added. Public visibility does not, by
itself, grant permission to reuse, modify, or redistribute the code.
