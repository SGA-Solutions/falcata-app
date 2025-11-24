import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
                className={cn(
                    "bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200",
                    className
                )}
            >
                <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black hover:bg-gray-100 rounded-full p-1 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-4 space-y-4">{children}</div>
            </div>
        </div>
    );
}
