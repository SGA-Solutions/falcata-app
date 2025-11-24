"use client";

import React, { useState } from "react";
import { Card, CardContent, Button, Toast } from "@/components/ui";
import { MapPin, Truck } from "lucide-react";

export default function CHARIOTPage() {
    const [toast, setToast] = useState("");
    const [routeOn, setRouteOn] = useState(false);
    const [scans, setScans] = useState<any[]>([]);

    function startRoute() { setRouteOn(true); setToast("Route started. Geofence active."); }
    function scan(event: string) {
        setScans((prev) => [{ id: Date.now(), event, ts: new Date().toLocaleTimeString(), point: "7.094, 125.61" }, ...prev]);
        setToast(event + " scan recorded.");
    }

    return (
        <section className="space-y-6 p-6 max-w-7xl mx-auto">
            <Toast message={toast} onDismiss={() => setToast("")} />
            <header>
                <h2 className="text-3xl font-bold tracking-tight">🚚 CHARIOT (Hauling Operator)</h2>
                <p className="text-gray-500">Route navigation and e-POD scanning.</p>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="font-bold text-xl">Haul Assignment #8821</h3>
                        <div className="flex gap-2">
                            <Button onClick={startRoute} className={routeOn ? "bg-green-600 hover:bg-green-700" : ""}>
                                {routeOn ? "Navigation Active" : "Start Navigation"}
                            </Button>
                        </div>
                    </div>

                    <div className="border p-4 rounded-xl bg-blue-50/50 border-blue-100">
                        <p className="font-semibold flex items-center gap-2 text-lg"><Truck className="text-blue-600" /> Pickup: Brgy. Calinan → Drop: Veneer Plant</p>
                        <p className="text-sm text-gray-500 mt-1 ml-8">Distance: 15.2 km | Load: 4.8 tons | Est. Time: 45 mins</p>

                        <div className="flex flex-wrap gap-2 mt-4 ml-8">
                            <Button variant="secondary" size="sm" onClick={() => scan("LOAD")}>Scan at Load</Button>
                            <Button variant="secondary" size="sm" onClick={() => scan("DEPART")}>Depart</Button>
                            <Button variant="secondary" size="sm" onClick={() => scan("ARRIVE")}>Arrive</Button>
                            <Button size="sm" onClick={() => scan("UNLOAD")}>Unload & POD</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 h-64 bg-gray-100 rounded-xl border flex items-center justify-center text-gray-500 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/125.6,-7.1,12,0/800x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGZ5In0')] bg-cover opacity-10 group-hover:opacity-20 transition-opacity"></div>
                            <div className="z-10 flex items-center bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                                <MapPin className="mr-2 h-5 w-5 text-red-500" />
                                {routeOn ? "Live route preview active" : "Map preview (start route to activate)"}
                            </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden flex flex-col">
                            <div className="p-3 font-medium bg-gray-50 border-b">Event Timeline</div>
                            <div className="flex-1 overflow-auto max-h-56 divide-y bg-white">
                                {scans.map((s) => (
                                    <div key={s.id} className="p-3 text-sm flex justify-between items-center">
                                        <span className="text-gray-400 text-xs font-mono">{s.ts}</span>
                                        <span className="font-semibold">{s.event}</span>
                                    </div>
                                ))}
                                {scans.length === 0 && <div className="p-6 text-center text-gray-400 text-sm">No events recorded.</div>}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
