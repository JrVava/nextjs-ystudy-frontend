import { MinimalLayout } from "@/components/layout";

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MinimalLayout>
      {children}
    </MinimalLayout>
  );
}
