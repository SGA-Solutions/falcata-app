import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface HelpModalProps {
    open: boolean;
    onClose: () => void;
}

export function HelpModal({ open, onClose }: HelpModalProps) {
    return (
        <Modal open={open} onClose={onClose} title="Falcata App - Product Guide">
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6 text-sm text-gray-700">
                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. Executive Summary</h3>
                    <p>
                        <strong>Falcata App</strong> is a comprehensive digital marketplace and logistics platform designed to streamline the timber and biomass supply chain. It connects all key stakeholders—from <strong>Farm Owners</strong> growing the trees to <strong>Buyers (WPP)</strong> purchasing the wood—into a single, unified ecosystem.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Transparency</strong>: Real-time tracking of inventory from source to destination.</li>
                        <li><strong>Efficiency</strong>: Automated matching of buyers and sellers, and optimized logistics.</li>
                        <li><strong>Reliability</strong>: Offline-first capabilities for field operations and secure digital payments.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. Core Process Flow</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Listing (Farm Owner)</strong>: A farm owner lists a stand of trees, providing GPS coordinates, estimated volume, and photos.</li>
                        <li><strong>Verification (Ops Admin)</strong>: The platform or an admin verifies the listing to ensure legitimacy.</li>
                        <li><strong>Marketplace (Buyer)</strong>: Buyers browse verified listings, filter by criteria (diameter, location), and reserve stock.</li>
                        <li><strong>Harvesting (FREC)</strong>: A Harvester (FREC) claims the cutting job, tags individual logs/trees, and records precise measurements.</li>
                        <li><strong>Residue Collection (BRRA)</strong>: A Residue Collector (BRRA) gathers the leftovers (branches/tops) and bundles them for biomass.</li>
                        <li><strong>Logistics (CHARIOT)</strong>: A Hauler (CHARIOT) accepts a transport job, picks up the load (logs or residue), and delivers it to the buyer.</li>
                        <li><strong>Completion & Payout</strong>: The buyer accepts the delivery (e-POD), and the platform automatically calculates and distributes payouts to all parties.</li>
                    </ol>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. User Views & Functionalities</h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-900">👩‍🌾 Farm Owner</h4>
                            <p className="text-xs text-gray-500 mb-1">Goal: Maximize profit from their timber assets and track earnings.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Dashboard</strong>: View active listings, total earnings, and recent transactions.</li>
                                <li><strong>My Listings</strong>: Create listings with wizard, track status (Pending/Verified/Sold).</li>
                                <li><strong>Financials</strong>: View income summaries, withdraw funds, access receipts.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900">🪓 FREC (Harvester)</h4>
                            <p className="text-xs text-gray-500 mb-1">Goal: Efficiently execute cutting jobs and accurately record inventory.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Job Board</strong>: Browse and claim harvesting jobs.</li>
                                <li><strong>Field Mode (Offline)</strong>: Tag individual logs, perform QC checks.</li>
                                <li><strong>Sync</strong>: Auto-sync data when online.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900">🧹 BRRA (Residue Collector)</h4>
                            <p className="text-xs text-gray-500 mb-1">Goal: Monetize harvest waste by collecting and bundling biomass.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Residue Jobs</strong>: View locations with available residue.</li>
                                <li><strong>Bundle Recording</strong>: Log count and weight of biomass bundles.</li>
                                <li><strong>Handover</strong>: Coordinate pickup with haulers.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900">🚚 CHARIOT (Hauler)</h4>
                            <p className="text-xs text-gray-500 mb-1">Goal: Optimize transport routes and ensure timely delivery.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Load Board</strong>: View transport jobs with rates and locations.</li>
                                <li><strong>Navigation</strong>: In-app routing to farm locations.</li>
                                <li><strong>e-POD</strong>: Capture photos and signatures for pickup and delivery.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900">🏭 WPP Buyer (Wood Processing Plant)</h4>
                            <p className="text-xs text-gray-500 mb-1">Goal: Source consistent, high-quality raw material.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Marketplace</strong>: Search/filter timber by specs and location. Map view.</li>
                                <li><strong>Order Management</strong>: Reserve stock, schedule inspections, approve deliveries.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900">🛡️ Ops Admin</h4>
                            <p className="text-xs text-gray-500 mb-1">Goal: Maintain platform integrity.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Oversight</strong>: Monitor system activity and listings.</li>
                                <li><strong>User Management</strong>: Verify accounts (KYC).</li>
                                <li><strong>Dispute Resolution</strong>: Resolve issues between parties.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">4. Key Technical Features</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Offline-First</strong>: Critical for field ops. Local storage + sync.</li>
                        <li><strong>Geo-Spatial</strong>: PostGIS for accurate mapping of farms and routes.</li>
                        <li><strong>Automated Financials</strong>: Smart split logic for transparent payouts.</li>
                    </ul>
                </section>
            </div>
            <div className="flex justify-end mt-4">
                <Button onClick={onClose}>Close</Button>
            </div>
        </Modal>
    );
}
