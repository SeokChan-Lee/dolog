"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/utils/helper";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030614]/70"
      onClick={onClose}
    >
      <div
        className={cn(
          "w-[90%] max-w-[1300px] max-h-[85vh] overflow-y-auto bg-[#030614] rounded-xl p-6",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
