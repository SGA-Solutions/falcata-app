import React, { useMemo, useState } from "react";
import { Card, CardContent, Button } from "@/components/ui";
import { MapPin, TreePine, Truck, ClipboardCheck, PlusCircle, Filter, Calendar, Barcode } from "lucide-react";

// --- lightweight UI helpers (inline; no extra libs) ---
function Modal({ open, onClose, title, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>
        <div className="p-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black text-white px-4 py-2 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <span>{message}</span>
          <button onClick={onDismiss} className="text-white/70 hover:text-white">Dismiss</button>
        </div>
      </div>
    </div>
  );
}

const roles = [
  { key: "FARM", label: "Farm Owner" },
  { key: "FREC", label: "FREC" },
  { key: "BRRA", label: "BRRA" },
  { key: "CHARIOT", label: "CHARIOT" },
  { key: "WPP", label: "WPP Buyer" },
  { key: "OPS", label: "Ops Admin" },
];

function RoleTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {roles.map((r) => (
        <Button
          key={r.key}
          onClick={() => onChange(r.key)}
          className={
            "rounded-2xl px-4 py-2 shadow " +
            (value === r.key ? "" : "opacity-70 hover:opacity-100")
          }
          variant={value === r.key ? undefined : "secondary"}
        >
          {r.label}
        </Button>
      ))}
    </div>
  );
}

// --- FARM OWNER ---
function FarmOwnerView() {
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
    <section className="space-y-4">
      <Toast message={toast} onDismiss={() => setToast("")} />
      <h2 className="text-2xl font-semibold">👩‍🌾 Farm Owner Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">My Listings</h3>
              <Button onClick={() => setOpen(true)}><PlusCircle className="mr-2"/>Add New</Button>
            </div>
            <div className="space-y-2 max-h-80 overflow-auto">
              {listings.map((l) => (
                <div key={l.id} className="border p-3 rounded-md bg-gray-50">
                  <p className="font-medium flex items-center gap-2"><TreePine/> {l.name} — {l.areaHa} ha</p>
                  <p className="text-sm text-gray-500">Est. Volume: {l.estVol} m³ • Brgy: {l.brgy}</p>
                  <p className={"text-sm font-medium " + (l.status === "Verified" ? "text-green-600" : "text-amber-600")}>Status: {l.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Income Summary</h3>
            <p className="text-3xl font-semibold">₱ 28,400</p>
            <p className="text-sm text-gray-500">Total Earned this Month</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button className="w-full">Withdraw</Button>
              <Button variant="secondary" className="w-full">View Receipts</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New Listing">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">Name<input className="mt-1 w-full border rounded-md p-2" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}/></label>
          <label className="text-sm">Area (ha)<input type="number" className="mt-1 w-full border rounded-md p-2" value={form.areaHa} onChange={(e)=>setForm({...form, areaHa: Number(e.target.value)})}/></label>
          <label className="text-sm">Avg DBH (cm)<input type="number" className="mt-1 w-full border rounded-md p-2" value={form.dbh} onChange={(e)=>setForm({...form, dbh: Number(e.target.value)})}/></label>
          <label className="text-sm">Tree Count<input type="number" className="mt-1 w-full border rounded-md p-2" value={form.trees} onChange={(e)=>setForm({...form, trees: Number(e.target.value)})}/></label>
          <label className="text-sm">Lat<input className="mt-1 w-full border rounded-md p-2" value={form.lat} onChange={(e)=>setForm({...form, lat:e.target.value})}/></label>
          <label className="text-sm">Lng<input className="mt-1 w-full border rounded-md p-2" value={form.lng} onChange={(e)=>setForm({...form, lng:e.target.value})}/></label>
        </div>
        <div className="text-sm text-gray-600">Estimated volume (rough): <b>{estVolume} m³</b></div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={addListing}>Submit</Button>
        </div>
      </Modal>
    </section>
  );
}

// --- FREC ---
function FRECView() {
  const [toast, setToast] = useState("");
  const [job, setJob] = useState<any>({ id: 23, site: "Brgy. Tamugan", trees: 12, est: 50, status: "Assigned" });
  const [logs, setLogs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState({ len: 2.4, sEnd: 28, lEnd: 32, grade: "B" });

  function startJob() { setJob({ ...job, status: "In-Progress" }); setToast("Job started. Remember safety checklist."); }
  function completeJob() { setJob({ ...job, status: "For QC" }); setToast("Submitted for QC."); }
  function addLog() {
    setLogs((prev) => [{ id: Date.now(), ...entry, vol: Number((((entry.sEnd/100)**2 + (entry.lEnd/100)**2)/2) * Math.PI * entry.len).toFixed(3) }, ...prev]);
    setOpen(false); setToast("Log recorded.");
  }

  const totalVol = logs.reduce((a,b)=>a + b.vol, 0).toFixed(3);

  return (
    <section className="space-y-4">
      <Toast message={toast} onDismiss={() => setToast("")} />
      <h2 className="text-2xl font-semibold">🪚 FREC (Cutting Crew)</h2>
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Active Job: #{job.id} — {job.site}</h3>
              <p className="text-sm text-gray-500">{job.trees} trees | Est. {job.est} m³ | Status: <b>{job.status}</b></p>
            </div>
            <div className="flex gap-2">
              <Button onClick={startJob}>Start</Button>
              <Button variant="secondary" onClick={()=>setOpen(true)}>Record Log</Button>
              <Button onClick={completeJob}>Submit for QC</Button>
            </div>
          </div>
          <div className="border rounded-md">
            <div className="p-3 font-medium bg-gray-50">Recorded Logs (total: {logs.length}) — Volume: {totalVol} m³</div>
            <div className="max-h-64 overflow-auto divide-y">
              {logs.map((l)=> (
                <div key={l.id} className="p-3 text-sm flex justify-between">
                  <div className="flex gap-6">
                    <span className="font-medium"><Barcode className="inline mr-1"/>#{l.id.toString().slice(-5)}</span>
                    <span>L: {l.len} m</span>
                    <span>Øs: {l.sEnd} cm</span>
                    <span>Øl: {l.lEnd} cm</span>
                    <span>Grade: {l.grade}</span>
                  </div>
                  <div className="font-semibold">{l.vol} m³</div>
                </div>
              ))}
              {logs.length === 0 && <div className="p-3 text-sm text-gray-500">No logs yet. Click "Record Log".</div>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal open={open} onClose={()=>setOpen(false)} title="Record Log">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">Length (m)<input type="number" className="mt-1 w-full border rounded-md p-2" value={entry.len} onChange={(e)=>setEntry({...entry, len:Number(e.target.value)})}/></label>
          <label className="text-sm">Small End Ø (cm)<input type="number" className="mt-1 w-full border rounded-md p-2" value={entry.sEnd} onChange={(e)=>setEntry({...entry, sEnd:Number(e.target.value)})}/></label>
          <label className="text-sm">Large End Ø (cm)<input type="number" className="mt-1 w-full border rounded-md p-2" value={entry.lEnd} onChange={(e)=>setEntry({...entry, lEnd:Number(e.target.value)})}/></label>
          <label className="text-sm">Grade<select className="mt-1 w-full border rounded-md p-2" value={entry.grade} onChange={(e)=>setEntry({...entry, grade:e.target.value})}><option>A</option><option>B</option><option>C</option></select></label>
        </div>
        <div className="text-sm text-gray-600">Smalian est. updates automatically on save.</div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={addLog}>Save</Button>
        </div>
      </Modal>
    </section>
  );
}

// --- BRRA ---
function BRRAView() {
  const [toast, setToast] = useState("");
  const [bundles, setBundles] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [b, setB] = useState({ weight: 35, moisture: 18, notes: "" });

  function recordBundle() {
    setBundles((prev) => [{ id: Date.now(), ...b }, ...prev]);
    setOpen(false); setToast("Bundle recorded.");
  }

  const totalKg = bundles.reduce((a,b)=>a + Number(b.weight), 0);

  return (
    <section className="space-y-4">
      <Toast message={toast} onDismiss={() => setToast("")} />
      <h2 className="text-2xl font-semibold">🌿 BRRA (Biomass Handlers)</h2>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Residue Collection</h3>
            <Button onClick={()=>setOpen(true)}><PlusCircle className="mr-2"/>Record Bundle</Button>
          </div>
          <div className="border rounded-md">
            <div className="p-3 font-medium bg-gray-50">Bundles: {bundles.length} • Total: {totalKg} kg</div>
            <div className="max-h-64 overflow-auto divide-y">
              {bundles.map((x)=> (
                <div key={x.id} className="p-3 text-sm flex justify-between">
                  <div className="flex gap-6">
                    <span className="font-medium">#{x.id.toString().slice(-5)}</span>
                    <span>Weight: {x.weight} kg</span>
                    <span>Moisture: {x.moisture}%</span>
                    {x.notes && <span>Notes: {x.notes}</span>}
                  </div>
                </div>
              ))}
              {bundles.length === 0 && <div className="p-3 text-sm text-gray-500">No bundles yet.</div>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal open={open} onClose={()=>setOpen(false)} title="New Residue Bundle">
        <div className="grid grid-cols-3 gap-3">
          <label className="text-sm col-span-1">Weight (kg)<input type="number" className="mt-1 w-full border rounded-md p-2" value={b.weight} onChange={(e)=>setB({...b, weight:Number(e.target.value)})}/></label>
          <label className="text-sm col-span-1">Moisture (%)<input type="number" className="mt-1 w-full border rounded-md p-2" value={b.moisture} onChange={(e)=>setB({...b, moisture:Number(e.target.value)})}/></label>
          <label className="text-sm col-span-3">Notes<textarea className="mt-1 w-full border rounded-md p-2" value={b.notes} onChange={(e)=>setB({...b, notes:e.target.value})}/></label>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={recordBundle}>Save</Button>
        </div>
      </Modal>
    </section>
  );
}

// --- CHARIOT ---
function CHARIOTView() {
  const [toast, setToast] = useState("");
  const [routeOn, setRouteOn] = useState(false);
  const [scans, setScans] = useState<any[]>([]);

  function startRoute() { setRouteOn(true); setToast("Route started. Geofence active."); }
  function scan(event: string) {
    setScans((prev)=> [{ id: Date.now(), event, ts: new Date().toLocaleTimeString(), point: "7.094, 125.61" }, ...prev]);
    setToast(event + " scan recorded.");
  }

  return (
    <section className="space-y-4">
      <Toast message={toast} onDismiss={() => setToast("")} />
      <h2 className="text-2xl font-semibold">🚚 CHARIOT (Hauling Operator)</h2>
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-bold">Haul Assignment</h3>
          <div className="border p-3 rounded-md bg-gray-50">
            <p className="font-medium flex items-center gap-2"><Truck/>Pickup: Brgy. Calinan → Drop: Veneer Plant</p>
            <p className="text-sm text-gray-500">Distance: 15.2 km | Load: 4.8 tons</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button onClick={startRoute}>Navigate & Start</Button>
              <Button variant="secondary" onClick={()=>scan("LOAD")}>Scan at Load</Button>
              <Button variant="secondary" onClick={()=>scan("DEPART")}>Depart</Button>
              <Button variant="secondary" onClick={()=>scan("ARRIVE")}>Arrive</Button>
              <Button onClick={()=>scan("UNLOAD")}>Unload & POD</Button>
            </div>
          </div>
          <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
            <MapPin className="mr-2"/>{routeOn ? "Live route preview with checkpoints" : "Map preview (start route to activate)"}
          </div>
          <div className="border rounded-md">
            <div className="p-3 font-medium bg-gray-50">Event Timeline</div>
            <div className="max-h-48 overflow-auto divide-y">
              {scans.map((s)=>(
                <div key={s.id} className="p-3 text-sm flex justify-between">
                  <span>{s.ts}</span>
                  <span className="font-medium">{s.event}</span>
                  <span className="text-gray-500">{s.point}</span>
                </div>
              ))}
              {scans.length===0 && <div className="p-3 text-sm text-gray-500">No scans yet.</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// --- WPP BUYER ---
function WPPView() {
  const [toast, setToast] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [filters, setFilters] = useState({ minD: 20, maxD: 60, radius: 50 });
  const [listings] = useState<any[]>([
    { id: 101, stand: "Stand C", logs: 60, dRange: [30,50], vol: 120, km: 18 },
    { id: 102, stand: "Stand B", logs: 35, dRange: [22,40], vol: 62, km: 9 },
  ]);
  const filtered = listings.filter(l => l.dRange[0] >= filters.minD && l.dRange[1] <= filters.maxD && l.km <= filters.radius);
  const [reserve, setReserve] = useState({ id: 0, qty: 20, visit: "2025-11-14 09:00" });

  function openReserve(id: number) { setReserve({ id, qty: 20, visit: "2025-11-14 09:00" }); setReserveOpen(true); }
  function confirmReserve() { setReserveOpen(false); setToast(`Reserved ${reserve.qty} logs from #${reserve.id}. Inspection ${reserve.visit}`); }

  return (
    <section className="space-y-4">
      <Toast message={toast} onDismiss={() => setToast("")} />
      <h2 className="text-2xl font-semibold">🏭 WPP Buyer</h2>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Available Listings</h3>
            <Button variant="secondary" onClick={()=>setFilterOpen(true)}><Filter className="mr-2"/>Filter</Button>
          </div>
          <div className="grid gap-2">
            {filtered.map((l)=>(
              <div key={l.id} className="border p-3 rounded-md bg-gray-50 flex items-center justify-between">
                <div>
                  <p className="font-medium flex items-center gap-2"><TreePine/>{l.stand} — {l.logs} logs</p>
                  <p className="text-sm text-gray-500">Diameter: {l.dRange[0]}–{l.dRange[1]} cm | Volume: {l.vol} m³ | {l.km} km away</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={()=>openReserve(l.id)}>Reserve</Button>
                  <Button variant="secondary"><Calendar className="mr-2"/>Schedule Inspection</Button>
                </div>
              </div>
            ))}
            {filtered.length===0 && <div className="text-sm text-gray-500">No results for current filters.</div>}
          </div>
        </CardContent>
      </Card>

      <Modal open={filterOpen} onClose={()=>setFilterOpen(false)} title="Filter Listings">
        <div className="grid grid-cols-3 gap-3">
          <label className="text-sm">Min Ø (cm)<input type="number" className="mt-1 w-full border rounded-md p-2" value={filters.minD} onChange={(e)=>setFilters({...filters, minD:Number(e.target.value)})}/></label>
          <label className="text-sm">Max Ø (cm)<input type="number" className="mt-1 w-full border rounded-md p-2" value={filters.maxD} onChange={(e)=>setFilters({...filters, maxD:Number(e.target.value)})}/></label>
          <label className="text-sm">Radius (km)<input type="number" className="mt-1 w-full border rounded-md p-2" value={filters.radius} onChange={(e)=>setFilters({...filters, radius:Number(e.target.value)})}/></label>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={()=>setFilterOpen(false)}>Close</Button>
          <Button onClick={()=>setToast("Filters applied.")}>Apply</Button>
        </div>
      </Modal>

      <Modal open={reserveOpen} onClose={()=>setReserveOpen(false)} title={`Reserve Listing #${reserve.id}`}>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">Quantity (logs)<input type="number" className="mt-1 w-full border rounded-md p-2" value={reserve.qty} onChange={(e)=>setReserve({...reserve, qty:Number(e.target.value)})}/></label>
          <label className="text-sm">Inspection (YYYY-MM-DD HH:MM)<input className="mt-1 w-full border rounded-md p-2" value={reserve.visit} onChange={(e)=>setReserve({...reserve, visit:e.target.value})}/></label>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={()=>setReserveOpen(false)}>Cancel</Button>
          <Button onClick={confirmReserve}>Confirm</Button>
        </div>
      </Modal>
    </section>
  );
}

// --- OPS ---
function OpsView() {
  const [toast, setToast] = useState("");
  const [users, setUsers] = useState<any[]>([
    { id: 1, name: "D. Cruz", role: "FREC", status: "Active" },
    { id: 2, name: "L. Reyes", role: "BRRA", status: "Active" },
    { id: 3, name: "M. Santos", role: "CHARIOT", status: "Suspended" },
  ]);
  const [geo, setGeo] = useState({ listings: 4, jobs: 3, trucks: 2 });

  function toggleUser(id: number) {
    setUsers((prev)=> prev.map(u => u.id===id ? ({...u, status: u.status==="Active"?"Suspended":"Active"}) : u));
    setToast("User status updated.");
  }

  return (
    <section className="space-y-4">
      <Toast message={toast} onDismiss={() => setToast("")} />
      <h2 className="text-2xl font-semibold">🛰️ Operations Admin</h2>
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-bold">Live Activity Map</h3>
          <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
            <MapPin className="mr-2"/>Listings: {geo.listings} • Jobs: {geo.jobs} • Trucks: {geo.trucks}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button variant="secondary" onClick={()=>setGeo({ listings: geo.listings+1, jobs: geo.jobs, trucks: geo.trucks })}>+ Listing Marker</Button>
            <Button variant="secondary" onClick={()=>setGeo({ listings: geo.listings, jobs: geo.jobs+1, trucks: geo.trucks })}>+ Job Marker</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-bold">User Management</h3>
          <div className="border rounded-md">
            <div className="p-3 font-medium bg-gray-50">Users</div>
            <div className="divide-y">
              {users.map((u)=> (
                <div key={u.id} className="p-3 text-sm flex items-center justify-between">
                  <div className="flex gap-6">
                    <span className="font-medium">{u.name}</span>
                    <span className="text-gray-500">{u.role}</span>
                    <span className={u.status === "Active" ? "text-green-600" : "text-amber-600"}>{u.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={()=>toggleUser(u.id)}>{u.status === "Active" ? "Suspend" : "Activate"}</Button>
                    <Button>View</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default function FalcataAppMockups() {
  const [role, setRole] = useState("FARM");

  return (
    <div className="p-6 space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-center">🌳 Falcata App — UI Mockups by Role</h1>
        <RoleTabs value={role} onChange={setRole} />
      </header>

      {role === "FARM" && <FarmOwnerView />}
      {role === "FREC" && <FRECView />}
      {role === "BRRA" && <BRRAView />}
      {role === "CHARIOT" && <CHARIOTView />}
      {role === "WPP" && <WPPView />}
      {role === "OPS" && <OpsView />}
    </div>
  );
}
