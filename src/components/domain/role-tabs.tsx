"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const roles = [
    { key: "farm", label: "Farm Owner" },
    { key: "frec", label: "FREC" },
    { key: "brra", label: "BRRA" },
    { key: "chariot", label: "CHARIOT" },
    { key: "wpp", label: "WPP Buyer" },
    { key: "ops", label: "Ops Admin" },
];

export function RoleTabs() {
    const router = useRouter();
    const pathname = usePathname();

    const currentRole = pathname?.split("/")[1] || "farm";

    return (
        <div className="flex w-full overflow-x-auto gap-2 items-center p-4 bg-white border-b sticky top-0 z-40 md:justify-center md:flex-wrap no-scrollbar">
            {roles.map((r) => (
                <Button
                    key={r.key}
                    onClick={() => router.push(`/${r.key}`)}
                    className={
                        "rounded-2xl px-4 py-2 shadow transition-all whitespace-nowrap " +
                        (pathname?.includes(r.key) ? "ring-2 ring-offset-2 ring-black" : "opacity-70 hover:opacity-100")
                    }
                    variant={pathname?.includes(r.key) ? "default" : "secondary"}
                >
                    {r.label}
                </Button>
            ))}
        </div>
    );
}
