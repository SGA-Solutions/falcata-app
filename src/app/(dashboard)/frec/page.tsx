"use client";

import React, { useState } from "react";
import { Card, CardContent, Button, Modal, Toast } from "@/components/ui";
import { Barcode, ClipboardCheck } from "lucide-react";

export default function FRECPage() {
    const [toast, setToast] = useState("");
    const [job, setJob] = useState<any>({ id: 23, site: "Brgy. Tamugan", trees: 12, est: 50, status: "Assigned" });
    const [logs, setLogs] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [entry, setEntry] = useState({ len: 2.4, sEnd: 28, lEnd: 32, grade: "B" });

    function startJob() { setJob({ ...job, status: "In-Progress" }); setToast("Job started. Remember safety checklist."); }
    function completeJob() { setJob({ ...job, status: "For QC" }); setToast("Submitted for QC."); }
    function addLog() {
        setLogs((prev) => [{ id: Date.now(), ...entry, vol: Number((((entry.sEnd / 100) ** 2 + (entry.lEnd / 100) ** 2) / 2) * Math.PI * entry.len).toFixed(3) }, ...prev]);
        setOpen(false); setToast("Log recorded.");
    }

    const totalVol = logs.reduce((a, b) => a + Number(b.vol), 0).toFixed(3);

    return (
        <section className="space-y-6 p-6 max-w-7xl mx-auto">
            <Toast message={toast} onDismiss={() => setToast("")} />
            <header>
                <h2 className="text-3xl font-bold tracking-tight">🪚 FREC (Cutting Crew)</h2>
                <p className="text-gray-500">Manage cutting jobs and record log inventory.</p>
            </header>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border">
                        <div>
                            <h3 className="font-bold text-xl flex items-center gap-2"><ClipboardCheck className="h-5 w-5" /> Active Job: #{job.id} — {job.site}</h3>
                            <p className="text-sm text-gray-500 mt-1">{job.trees} trees | Est. {job.est} m³ | Status: <b className="text-black">{job.status}</b></p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button onClick={startJob} disabled={job.status !== "Assigned"}>Start Job</Button>
                            <Button variant="secondary" onClick={() => setOpen(true)} disabled={job.status !== "In-Progress"}>Record Log</Button>
                            <Button onClick={completeJob} disabled={job.status !== "In-Progress"} variant="outline">Submit for QC</Button>
                        </div>
                    </div>

                    <div className="border rounded-xl overflow-hidden">
                        <div className="p-4 font-medium bg-gray-100/50 border-b flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                            <span>Recorded Logs ({logs.length})</span>
                            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">Total Volume: {totalVol} m³</span>
                        </div>
                        <div className="max-h-[400px] overflow-auto divide-y">
                            {logs.map((l) => (
                                <div key={l.id} className="p-4 text-sm flex justify-between items-center hover:bg-gray-50 transition-colors">
                                    <div className="flex gap-6 items-center">
                                        <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded"><Barcode className="inline mr-1 h-3 w-3" />#{l.id.toString().slice(-5)}</span>
                                        <div className="grid grid-cols-3 gap-6 text-gray-600">
                                            <span>L: <b className="text-black">{l.len}</b> m</span>
                                            <span>Øs: <b className="text-black">{l.sEnd}</b> cm</span>
                                            <span>Øl: <b className="text-black">{l.lEnd}</b> cm</span>
                                        </div>
                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">Grade {l.grade}</span>
                                    </div>
                                    <div className="font-bold text-lg">{l.vol} m³</div>
                                </div>
                            ))}
                            {logs.length === 0 && <div className="p-8 text-center text-gray-500">No logs recorded yet. Click "Record Log" to start.</div>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Modal open={open} onClose={() => setOpen(false)} title="Record Log">
                <div className="grid grid-cols-2 gap-4">
                    <label className="text-sm font-medium">Length (m)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={entry.len} onChange={(e) => setEntry({ ...entry, len: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Small End Ø (cm)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={entry.sEnd} onChange={(e) => setEntry({ ...entry, sEnd: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Large End Ø (cm)<input type="number" className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={entry.lEnd} onChange={(e) => setEntry({ ...entry, lEnd: Number(e.target.value) })} /></label>
                    <label className="text-sm font-medium">Grade<select className="mt-1.5 w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black focus:outline-none bg-white" value={entry.grade} onChange={(e) => setEntry({ ...entry, grade: e.target.value })}><option>A</option><option>B</option><option>C</option></select></label>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mt-2">Smalian volume estimate updates automatically on save.</div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={addLog}>Save Log</Button>
                </div>
            </Modal>
        </section>
    );
}
