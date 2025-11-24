"use client";

import React, { useState } from "react";
import { Card, CardContent, Button, Toast } from "@/components/ui";
import { MapPin } from "lucide-react";

export default function OpsPage() {
    const [toast, setToast] = useState("");
    const [users, setUsers] = useState<any[]>([
        { id: 1, name: "D. Cruz", role: "FREC", status: "Active" },
        { id: 2, name: "L. Reyes", role: "BRRA", status: "Active" },
        { id: 3, name: "M. Santos", role: "CHARIOT", status: "Suspended" },
    ]);
    const [geo, setGeo] = useState({ listings: 4, jobs: 3, trucks: 2 });

    function toggleUser(id: number) {
        setUsers((prev) => prev.map(u => u.id === id ? ({ ...u, status: u.status === "Active" ? "Suspended" : "Active" }) : u));
        setToast("User status updated.");
    }

    return (
        <section className="space-y-6 p-6 max-w-7xl mx-auto">
            <Toast message={toast} onDismiss={() => setToast("")} />
            <header>
                <h2 className="text-3xl font-bold tracking-tight">🛰️ Operations Admin</h2>
                <p className="text-gray-500">Monitor system activity and manage users.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="font-bold text-lg">Live Activity Map</h3>
                        <div className="h-64 bg-gray-100 rounded-xl border flex items-center justify-center text-gray-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/125.6,-7.1,11,0/800x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGZ5In0')] bg-cover opacity-20"></div>
                            <div className="z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-xl shadow-sm text-center">
                                <MapPin className="mx-auto h-6 w-6 text-indigo-600 mb-2" />
                                <div className="flex gap-4 text-sm font-medium">
                                    <span>Listings: {geo.listings}</span>
                                    <span>Jobs: {geo.jobs}</span>
                                    <span>Trucks: {geo.trucks}</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="secondary" onClick={() => setGeo({ listings: geo.listings + 1, jobs: geo.jobs, trucks: geo.trucks })}>+ Listing Marker</Button>
                            <Button variant="secondary" onClick={() => setGeo({ listings: geo.listings, jobs: geo.jobs + 1, trucks: geo.trucks })}>+ Job Marker</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="font-bold text-lg">User Management</h3>
                        <div className="border rounded-xl overflow-hidden">
                            <div className="p-3 font-medium bg-gray-50 border-b">Registered Users</div>
                            <div className="divide-y">
                                {users.map((u) => (
                                    <div key={u.id} className="p-4 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{u.name.charAt(0)}</div>
                                            <div>
                                                <p className="font-medium">{u.name}</p>
                                                <p className="text-xs text-gray-500">{u.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={"px-2 py-0.5 rounded-full text-xs font-medium " + (u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                                                {u.status}
                                            </span>
                                            <Button variant="outline" size="sm" onClick={() => toggleUser(u.id)}>
                                                {u.status === "Active" ? "Suspend" : "Activate"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
