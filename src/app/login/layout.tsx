import { MinimalLayout, MobileBottomNav } from "@/components/layout";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MinimalLayout>
      {children}
      <MobileBottomNav />
    </MinimalLayout>
  );
}
