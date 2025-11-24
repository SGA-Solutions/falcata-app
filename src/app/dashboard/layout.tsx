import { RoleTabs } from "@/components/domain/role-tabs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <RoleTabs />
            <main className="animate-in fade-in duration-500">
                {children}
            </main>
        </div>
    );
}
