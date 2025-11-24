"use client";

import React, { useState } from "react";
import { Card, CardContent, Button, Modal, Toast } from "@/components/ui";
import { PlusCircle } from "lucide-react";

export default function BRRAPage() {
    const [toast, setToast] = useState("");
    const [bundles, setBundles] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [b, setB] = useState({ weight: 35, moisture: 18, notes: "" });

    function recordBundle() {
        setBundles((prev) => [{ id: Date.now(), ...b }, ...prev]);
        setOpen(false); setToast("Bundle recorded.");
    }

    const totalKg = bundles.reduce((a, b) => a + Number(b.weight), 0);

    return (
        <section className="space-y-6 p-6 max-w-7xl mx-auto">
            <Toast message={toast} onDismiss={() => setToast("")} />
            <header>
                <h2 className="text-3xl font-bold tracking-tight">🌿 BRRA (Biomass Handlers)</h2>
                <p className="text-gray-500">Record residue bundles and track biomass recovery.</p>
            </header>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Residue Collection</h3>
                        <Button onClick={() => setOpen(true)}><PlusCircle className="mr-2 h-4 w-4" />Record Bundle</Button>
                    </div>

                    <div className="border rounded-xl overflow-hidden">
                        <div className="p-4 font-medium bg-gray-100/50 border-b flex justify-between items-center">
                            <span>Bundles: {bundles.length}</span>
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Total: {totalKg} kg</span>
                        </div>
                        <div className="max-h-[500px] overflow-auto divide-y">
                            {bundles.map((x) => (
                                <div key={x.id} className="p-4 text-sm flex justify-between items-center hover:bg-gray-50 transition-colors">
                                    <div className="flex gap-8 items-center">
                                        <span className="font-mono font-medium text-gray-500">#{x.id.toString().slice(-5)}</span>
                                        <div className="flex gap-6">
                                            <span>Weight: <b className="text-black">{x.weight}</b> kg</span>
                                            <span>Moisture: <b className="text-black">{x.moisture}</b>%</span>
                                        </div>
                                        {x.notes && <span className="text-gray-500 italic max-w-xs truncate border-l pl-4">{x.notes}</span>}
                                    </div>
                                </div>
                            ))}
                            {bundles.length === 0 && <div className="p-8 text-center text-gray-500">No bundles recorded yet.</div>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Modal open={open} onClose={() => setOpen(false)} title="New Residue Bundle">
                <div className="grid grid-cols-2 gap-4">
                    <label className="text-sm font-medium">Weight (kg)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={b.weight} onChange={(e) => setB({ ...b, weight: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Moisture (%)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={b.moisture} onChange={(e) => setB({ ...b, moisture: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium col-span-2">Notes<textarea className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none min-h-[80px]" value={b.notes} onChange={(e) => setB({ ...b, notes: e.target.value })} /></label>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={recordBundle}>Save Bundle</Button>
                </div>
            </Modal>
        </section>
    );
}
