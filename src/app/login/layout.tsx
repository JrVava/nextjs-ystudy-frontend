import { MinimalLayout } from "@/components/layout";

export default function LoginLayout({
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
