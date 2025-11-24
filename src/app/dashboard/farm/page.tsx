"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, Button, Modal, Toast } from "@/components/ui";
import { TreePine, PlusCircle } from "lucide-react";

export default function FarmOwnerPage() {
    const [toast, setToast] = useState("");
    const [open, setOpen] = useState(false);
    const [listings, setListings] = useState<any[]>([
        { id: 1, name: "Falcata Stand A", areaHa: 2.4, estVol: 320, status: "Verified", brgy: "Tamugan" },
    ]);
    const [form, setForm] = useState({ name: "", areaHa: 1, dbh: 30, trees: 50, lat: "7.14", lng: "125.43" });

    const estVolume = useMemo(() => Math.round((form.dbh / 30) * form.trees * 2.2), [form]);

    function addListing() {
        setListings((prev) => [
            { id: Date.now(), name: form.name || `New Stand #${prev.length + 1}`, areaHa: form.areaHa, estVol: estVolume, status: "Pending", brgy: "Calinan" },
            ...prev,
        ]);
        setOpen(false);
        setToast("Listing submitted for verification.");
    }

    return (
        <section className="space-y-6 p-6 max-w-7xl mx-auto">
            <Toast message={toast} onDismiss={() => setToast("")} />
            <header>
                <h2 className="text-3xl font-bold tracking-tight">👩‍🌾 Farm Owner Dashboard</h2>
                <p className="text-gray-500">Manage your timber stands and track earnings.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg">My Listings</h3>
                            <Button onClick={() => setOpen(true)}><PlusCircle className="mr-2 h-4 w-4" />Add New</Button>
                        </div>
                        <div className="space-y-3 max-h-[500px] overflow-auto pr-2">
                            {listings.map((l) => (
                                <div key={l.id} className="border p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center group">
                                    <div>
                                        <p className="font-semibold flex items-center gap-2 text-lg"><TreePine className="text-green-600" /> {l.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">{l.areaHa} ha • Est. Volume: {l.estVol} m³ • Brgy: {l.brgy}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " + (l.status === "Verified" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800")}>
                                            {l.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="font-bold text-lg mb-4">Income Summary</h3>
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center mb-6">
                                <p className="text-4xl font-bold text-green-700">₱ 28,400</p>
                                <p className="text-sm text-green-600 font-medium mt-1">Total Earned this Month</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <Button className="w-full" size="lg">Withdraw Funds</Button>
                            <Button variant="outline" className="w-full">View Receipts</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Modal open={open} onClose={() => setOpen(false)} title="New Listing">
                <div className="grid grid-cols-2 gap-4">
                    <label className="text-sm font-medium">Name<input className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
                    <label className="text-sm font-medium">Area (ha)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={form.areaHa} onChange={(e) => setForm({ ...form, areaHa: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Avg DBH (cm)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={form.dbh} onChange={(e) => setForm({ ...form, dbh: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Tree Count<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={form.trees} onChange={(e) => setForm({ ...form, trees: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Lat<input className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} /></label>
                    <label className="text-sm font-medium">Lng<input className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} /></label>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mt-2">Estimated volume (rough): <b className="text-black">{estVolume} m³</b></div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={addListing}>Submit Listing</Button>
                </div>
            </Modal>
        </section>
    );
}
