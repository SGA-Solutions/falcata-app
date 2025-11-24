# Falcata App — Consolidated Project Blueprint

This document serves as the implementation reference for the **Falcata App**, a marketplace and logistics platform for the timber/biomass industry. It consolidates the functional requirements and domain model from the original brief with the technical stack and architectural patterns of the reference project.

## 1. Executive Summary

**Product**: A digital marketplace and logistics platform connecting Farm Owners, Harvesters (FREC), Residue Collectors (BRRA), Haulers (CHARIOT), and Buyers (WPP).
**Core Value**: Streamlines the timber supply chain with offline-first data capture, automated payout splits, and chain-of-custody tracking.
**Target Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4, PostgreSQL (with PostGIS), and Sanity (for content).

---

## 2. Tech Stack & Architecture

### 2.1 Core Framework
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router) - *Replaces Quasar/FastAPI for a unified full-stack approach.*
*   **Language**: [TypeScript 5](https://www.typescriptlang.org/)
*   **UI Library**: [React 19](https://react.dev/)
*   **State Management**: React Context API (for global UI state) + SWR/TanStack Query (for data fetching).

### 2.2 Styling & UI
*   **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Fonts**: `next/font` (Geist Sans/Mono or custom).
*   **Icons**: `@sanity/icons` or `lucide-react`.
*   **Components**: Reusable, small, focused components (following `project_reference.md` patterns).

### 2.3 Data & Backend
*   **Transactional Database**: **PostgreSQL 15+** with **PostGIS** extension.
    *   *Crucial for*: Users, Orders, Jobs, Geo-spatial data (farms, routes), Inventory (trees/logs).
    *   *ORM*: Prisma or Drizzle (recommended for TypeScript safety).
*   **Content Management (CMS)**: **Sanity.io**.
    *   *Usage*: Managing static content, help articles, site settings, legal docs, and potentially dynamic "market hints" or "pricing rules" if frequent updates are needed by non-devs.
*   **Backend Logic**: **Next.js Server Actions** and **Route Handlers**.
    *   *Replaces*: The separate FastAPI services (`identity`, `inventory`, `jobs`, etc.) will be implemented as modular domains within the Next.js server layer.
*   **Storage**: Cloud Storage (S3/GCS) for photos/docs (signed URLs).
*   **Caching/Queues**: Redis (optional, or use Vercel KV/Cron for background tasks).

### 2.4 Mobile & Offline Strategy
*   **PWA**: Next.js Progressive Web App.
*   **Offline Storage**: `IndexedDB` (via libraries like `idb` or `Dexie.js`) for caching field data (photos, GPS, forms) when offline.
*   **Sync**: Background sync mechanism to push `IndexedDB` data to Server Actions when online.

---

## 3. Project Structure (Hybrid)

Adopting the `project_reference.md` structure, adapted for a complex app:

```text
app/
  (auth)/           # Auth routes (login, register)
  (dashboard)/      # Protected app routes
    dashboard/
    listings/
    jobs/
    orders/
  api/              # Route Handlers (webhooks, external APIs)
  layout.tsx        # Root layout (Providers: Theme, Auth, OfflineSync)
  globals.css       # Tailwind imports
components/
  ui/               # Base UI components (Buttons, Inputs)
  domain/           # Domain-specific components (LogCard, MapView)
  layout/           # Layout wrappers
hooks/
  use-offline-sync.ts
  use-geolocation.ts
lib/
  db.ts             # DB connection (Prisma/Drizzle)
  sanity/           # Sanity client & queries
  utils.ts          # Helpers
  actions/          # Server Actions (mutations)
    listings.ts
    orders.ts
types/              # TypeScript interfaces (Domain models)
sanity/             # Sanity Studio config
```

---

## 4. Domain Model (Adapted for TypeScript/DB)

*See `application_blueprint.md` for full field details. Key entities:*

*   **Users & Orgs**: `User`, `Organization` (Types: FARM, FREC, BRRA, CHARIOT, WPP).
*   **Inventory**: `Farm`, `TreeStand`, `Tree`, `Log`, `ResidueBundle`.
*   **Marketplace**: `Listing`, `Order`, `OrderItem`, `PricingQuote`.
*   **Logistics**: `Job` (FREC/BRRA/HAUL), `Shipment`, `ProofOfDelivery`.
*   **Finance**: `Wallet`, `Payout`, `PayoutRule`.

---

## 5. Core Features & Workflows

### 5.1 User Roles
*   **Farm Owner**: Manage farms, create listings, view payouts.
*   **FREC (Harvester)**: Claim cutting jobs, log inventory (tagging), QC.
*   **BRRA (Residue)**: Claim residue jobs, bundle recording.
*   **CHARIOT (Hauler)**: Bidding/Accepting haul jobs, route navigation, e-POD.
*   **Buyer (WPP)**: Browse listings, reserve, inspect, approve, pay.
*   **Admin**: Oversight, dispute resolution, compliance.

### 5.2 Key Workflows
1.  **Listing Creation**: Owner captures GPS/Photos → App calculates volume → Listing published.
2.  **Job Execution**: FREC/BRRA claim job → Offline data capture (measurements/tags) → Sync → QC.
3.  **Order Cycle**: Buyer reserves → Inspects → Approves → Order Created.
4.  **Logistics**: Hauler assigned → Dispatch → Geo-fenced Load/Unload → e-POD (Signature + Photo).
5.  **Payouts**: Delivery confirmed → Auto-split calculation → Wallet credit.

---

## 6. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
*   Setup Next.js repo with Tailwind & Sanity.
*   Configure PostgreSQL + ORM.
*   Auth system (NextAuth/Auth.js) with Role-Based Access Control (RBAC).
*   Basic "Organization" and "User" profile management.

### Phase 2: Inventory & Listings (Weeks 3-6)
*   Farm & Tree Stand management (PostGIS integration for polygons).
*   Listing creation wizard (Forms + Photo upload).
*   Offline-first "Field Mode" prototype (IndexedDB).

### Phase 3: Jobs & Operations (Weeks 7-9)
*   Job Boards (FREC/BRRA).
*   Log & Bundle data entry screens.
*   Barcode/Tagging flow.

### Phase 4: Marketplace & Logistics (Weeks 10-12)
*   Buyer search & reservation.
*   Hauling module (Route optimization basics).
*   Shipments & e-POD.

### Phase 5: Finance & Polish (Weeks 13-16)
*   Payout split logic engine.
*   Invoicing & PDF generation.
*   Dashboard analytics.

---

## 7. Design & UX Guidelines
*   **Aesthetics**: Premium, modern feel (Glassmorphism, smooth gradients) per `web_application_development` guidelines.
*   **Responsiveness**: Mobile-first design for Field Ops; Desktop-optimized for Admin/Buyer dashboards.
*   **Interactivity**: Immediate feedback (optimistic UI) for all actions.
