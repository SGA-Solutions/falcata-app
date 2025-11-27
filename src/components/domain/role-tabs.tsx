"use client";

import Image from "next/image";

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
        <div className="w-full bg-white border-b sticky top-0 z-40">
            <div className="flex w-full max-w-7xl mx-auto overflow-x-auto gap-2 items-center px-6 py-4 md:justify-center md:flex-wrap no-scrollbar relative">
                <div className="mr-auto md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2 shrink-0">
                    <Image
                        src="/falcata_logo.png"
                        alt="Falcata Logo"
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </div>
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
        </div>
    );
}
