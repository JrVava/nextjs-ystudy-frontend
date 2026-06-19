import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type EyebrowTone = "orange" | "blue" | "glass" | "gold";

type EyebrowProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: EyebrowTone;
  }
>;

const toneClass: Record<EyebrowTone, string> = {
  orange: "eyebrow o",
  blue: "eyebrow b",
  glass: "eyebrow glass",
  gold: "eyebrow gold",
};

export function Eyebrow({
  tone = "orange",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span className={cn(toneClass[tone], className)} {...props}>
      {children}
    </span>
  );
}

export function Kicker({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span className={cn("kicker", className)} {...props}>
      {children}
    </span>
  );
}
