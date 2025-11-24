import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
    message: string;
    onDismiss: () => void;
    className?: string;
}

export function Toast({ message, onDismiss, className }: ToastProps) {
    if (!message) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div
                className={cn(
                    "bg-black text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px] justify-between",
                    className
                )}
            >
                <span className="text-sm font-medium">{message}</span>
                <button
                    onClick={onDismiss}
                    className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
