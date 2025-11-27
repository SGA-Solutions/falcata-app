# Falcata App - Product Description & Process Flow

## 1. Executive Summary

**Falcata App** is a comprehensive digital marketplace and logistics platform designed to streamline the timber and biomass supply chain. It connects all key stakeholders—from **Farm Owners** growing the trees to **Buyers (WPP)** purchasing the wood—into a single, unified ecosystem.

The platform solves critical industry challenges by providing:
*   **Transparency**: Real-time tracking of inventory from source to destination.
*   **Efficiency**: Automated matching of buyers and sellers, and optimized logistics.
*   **Reliability**: Offline-first capabilities for field operations and secure digital payments.

---

## 2. Core Process Flow

The lifecycle of timber on the Falcata platform follows a linear, tracked journey:

1.  **Listing (Farm Owner)**: A farm owner lists a stand of trees, providing GPS coordinates, estimated volume, and photos.
2.  **Verification (Ops Admin)**: The platform or an admin verifies the listing to ensure legitimacy.
3.  **Marketplace (Buyer)**: Buyers browse verified listings, filter by criteria (diameter, location), and reserve stock.
4.  **Harvesting (FREC)**: A Harvester (FREC) claims the cutting job, tags individual logs/trees, and records precise measurements.
5.  **Residue Collection (BRRA)**: A Residue Collector (BRRA) gathers the leftovers (branches/tops) and bundles them for biomass.
6.  **Logistics (CHARIOT)**: A Hauler (CHARIOT) accepts a transport job, picks up the load (logs or residue), and delivers it to the buyer.
7.  **Completion & Payout**: The buyer accepts the delivery (e-POD), and the platform automatically calculates and distributes payouts to all parties (Farmer, FREC, BRRA, Hauler).

---

## 3. User Views & Functionalities

The application provides distinct, role-based views tailored to the specific needs of each stakeholder.

### 👩‍🌾 Farm Owner
**Goal**: Maximize profit from their timber assets and track earnings.
*   **Dashboard**: View active listings, total earnings, and recent transactions.
*   **My Listings**:
    *   **Create Listing**: A wizard to input tree stand details (Area, DBH, Tree Count) and location.
    *   **Status Tracking**: See if a listing is "Pending", "Verified", or "Sold".
*   **Financials**: View income summaries, withdraw funds, and access digital receipts.

### 🪓 FREC (Harvester)
**Goal**: Efficiently execute cutting jobs and accurately record inventory.
*   **Job Board**: Browse and claim available harvesting jobs based on location and volume.
*   **Field Mode (Offline)**:
    *   **Tagging**: Input data for individual logs (Length, Diameter, Grade) while offline in the field.
    *   **QC Checklist**: Perform quality control checks before finalizing a batch.
*   **Sync**: Automatically sync captured data when internet connectivity is restored.

### 🧹 BRRA (Residue Collector)
**Goal**: Monetize harvest waste by collecting and bundling biomass.
*   **Residue Jobs**: View locations where harvesting is complete and residue is available.
*   **Bundle Recording**: Log the number and weight of biomass bundles collected.
*   **Handover**: Coordinate with haulers for the pickup of bundled residue.

### 🚚 CHARIOT (Hauler)
**Goal**: Optimize transport routes and ensure timely delivery.
*   **Load Board**: View available transport jobs (Logs or Residue) with pickup/drop-off points and rates.
*   **Navigation**: In-app routing to the specific farm location (often off-road).
*   **e-POD (Electronic Proof of Delivery)**:
    *   **Pickup**: Confirm load details and take photos at the source.
    *   **Delivery**: Capture digital signature and photos upon delivery to the buyer.

### 🏭 WPP Buyer (Wood Processing Plant)
**Goal**: Source consistent, high-quality raw material for processing.
*   **Marketplace**:
    *   **Search & Filter**: Find timber by diameter class, volume, species, and distance.
    *   **Map View**: Visualize supply sources geographically.
*   **Order Management**:
    *   **Reservations**: Lock in supply from specific stands.
    *   **Inspection**: Schedule on-site visits to verify quality before final purchase.
    *   **Approvals**: Review delivered loads and authorize payments.

### 🛡️ Ops Admin
**Goal**: Maintain platform integrity and smooth operations.
*   **Oversight Dashboard**: High-level view of all system activity (active jobs, pending listings, disputes).
*   **User Management**: Verify and approve new user accounts (KYC).
*   **Dispute Resolution**: Tools to investigate and resolve issues between buyers, sellers, and service providers.

---

## 4. Key Technical Features

*   **Offline-First Architecture**: Critical for remote field operations. Data is stored locally (IndexedDB) and synced when connectivity returns.
*   **Geo-Spatial Integration**: Uses PostGIS to accurately map farm boundaries, tree locations, and transport routes.
*   **Automated Financials**: Smart logic splits a single buyer payment into correct portions for the Farmer, Harvester, Collector, and Hauler, ensuring transparency and trust.
