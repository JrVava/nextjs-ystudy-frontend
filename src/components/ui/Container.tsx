import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    as?: "div" | "section" | "main";
    width?: "shell" | "wrap" | "full";
  }
>;

const widthClass = {
  shell: "container",
  wrap: "wrap",
  full: "w-full",
} as const;

export function Container({
  as: Component = "div",
  width = "shell",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn(widthClass[width], className)} {...props}>
      {children}
    </Component>
  );
}
