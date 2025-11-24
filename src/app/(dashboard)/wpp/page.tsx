"use client";

import React, { useState } from "react";
import { Card, CardContent, Button, Modal, Toast } from "@/components/ui";
import { Filter, TreePine, Calendar } from "lucide-react";

export default function WPPPage() {
    const [toast, setToast] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [reserveOpen, setReserveOpen] = useState(false);
    const [filters, setFilters] = useState({ minD: 20, maxD: 60, radius: 50 });
    const [listings] = useState<any[]>([
        { id: 101, stand: "Stand C", logs: 60, dRange: [30, 50], vol: 120, km: 18 },
        { id: 102, stand: "Stand B", logs: 35, dRange: [22, 40], vol: 62, km: 9 },
    ]);
    const filtered = listings.filter(l => l.dRange[0] >= filters.minD && l.dRange[1] <= filters.maxD && l.km <= filters.radius);
    const [reserve, setReserve] = useState({ id: 0, qty: 20, visit: "2025-11-14 09:00" });

    function openReserve(id: number) { setReserve({ id, qty: 20, visit: "2025-11-14 09:00" }); setReserveOpen(true); }
    function confirmReserve() { setReserveOpen(false); setToast(`Reserved ${reserve.qty} logs from #${reserve.id}. Inspection ${reserve.visit}`); }

    return (
        <section className="space-y-6 p-6 max-w-7xl mx-auto">
            <Toast message={toast} onDismiss={() => setToast("")} />
            <header>
                <h2 className="text-3xl font-bold tracking-tight">🏭 WPP Buyer</h2>
                <p className="text-gray-500">Source timber, schedule inspections, and manage orders.</p>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="font-bold text-xl">Available Listings</h3>
                        <Button variant="outline" onClick={() => setFilterOpen(true)} className="w-full sm:w-auto"><Filter className="mr-2 h-4 w-4" />Filter Results</Button>
                    </div>

                    <div className="grid gap-4">
                        {filtered.map((l) => (
                            <div key={l.id} className="border p-5 rounded-xl bg-white hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <p className="font-bold text-lg flex items-center gap-2"><TreePine className="text-green-700" />{l.stand} — {l.logs} logs</p>
                                    <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-gray-500 mt-2">
                                        <span className="bg-gray-100 px-2 py-1 rounded whitespace-nowrap">Ø {l.dRange[0]}–{l.dRange[1]} cm</span>
                                        <span className="bg-gray-100 px-2 py-1 rounded whitespace-nowrap">Vol: {l.vol} m³</span>
                                        <span className="bg-gray-100 px-2 py-1 rounded whitespace-nowrap">{l.km} km away</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button onClick={() => openReserve(l.id)} className="w-full sm:w-auto">Reserve Stock</Button>
                                    <Button variant="secondary" className="w-full sm:w-auto"><Calendar className="mr-2 h-4 w-4" />Schedule Inspection</Button>
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && <div className="p-12 text-center border rounded-xl bg-gray-50 text-gray-500">No listings match your filters. Try adjusting the diameter range or radius.</div>}
                    </div>
                </CardContent>
            </Card>

            <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter Listings">
                <div className="grid grid-cols-3 gap-4">
                    <label className="text-sm font-medium">Min Ø (cm)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={filters.minD} onChange={(e) => setFilters({ ...filters, minD: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Max Ø (cm)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={filters.maxD} onChange={(e) => setFilters({ ...filters, maxD: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Radius (km)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={filters.radius} onChange={(e) => setFilters({ ...filters, radius: Number(e.target.value) })} /></label>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="secondary" onClick={() => setFilterOpen(false)}>Close</Button>
                    <Button onClick={() => setToast("Filters applied.")}>Apply Filters</Button>
                </div>
            </Modal>

            <Modal open={reserveOpen} onClose={() => setReserveOpen(false)} title={`Reserve Listing #${reserve.id}`}>
                <div className="grid grid-cols-2 gap-4">
                    <label className="text-sm font-medium">Quantity (logs)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={reserve.qty} onChange={(e) => setReserve({ ...reserve, qty: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Inspection (YYYY-MM-DD HH:MM)<input className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={reserve.visit} onChange={(e) => setReserve({ ...reserve, visit: e.target.value })} /></label>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="secondary" onClick={() => setReserveOpen(false)}>Cancel</Button>
                    <Button onClick={confirmReserve}>Confirm Reservation</Button>
                </div>
            </Modal>
        </section>
    );
}
