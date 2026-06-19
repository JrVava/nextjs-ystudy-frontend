"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

type ToastProps = {
  message: string | null;
  visible?: boolean;
  className?: string;
  durationMs?: number;
  onDismiss?: () => void;
};

export function Toast({
  message,
  visible = false,
  className,
  durationMs = 2600,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (!visible || !message || !onDismiss) return;

    const timer = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(timer);
  }, [durationMs, message, onDismiss, visible]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("save-toast ys-toast", visible && "show", className)}
    >
      {message}
    </div>
  );
}
