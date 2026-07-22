import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className={cn("dash-shell")}>
      <Container width="shell">{children}</Container>
    </div>
  );
}

export function MinimalLayout({ children }: PropsWithChildren) {
  return <div className="minimal-shell">{children}</div>;
}

export function CourseDetailLayout({ children }: PropsWithChildren) {
  return <div className="course-detail-shell ys-unified ys-theme-sunset">{children}</div>;
}

export function ToolLayout({ children }: PropsWithChildren) {
  return (
    <div className="ys-unified ys-theme-split">{children}</div>
  );
}

export function GuideLayout({ children }: PropsWithChildren) {
  return (
    <div className="guide-shell ys-unified golden-page">{children}</div>
  );
}
