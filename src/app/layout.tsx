import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { AppProviders } from "@/components/providers";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import Script from "next/script";

// Import original CSS files directly to ensure exact styling
import "../styles/globals.css";
import "../../public/assets/css/design-tokens.css";
import "../../public/assets/css/styles.css";
import "../../public/assets/css/ds-v2.css";
import "../../public/assets/css/v718-launch-polish.css";
import "../../public/assets/css/v719-interactive-funding.css";
import "../../public/assets/css/v722-mobile-gutter.css";
import "../../public/assets/css/v731-carousel-system.css";
import "../../public/assets/css/ystudy-carousel-system.css";
import "../../public/assets/css/v738-mobile-12px-gutter-fix.css";
import "../../public/assets/css/tool-operational.css";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YStudy — Home",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/assets/ystudy-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased" style={{ margin: 0, padding: 0 }}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
