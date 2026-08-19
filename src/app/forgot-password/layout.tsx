import { MinimalLayout, MobileBottomNav } from "@/components/layout";

export default function ForgotPasswordLayout({
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
