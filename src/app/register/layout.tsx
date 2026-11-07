import { MinimalLayout } from "@/components/layout";

export default function RegisterLayout({
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
