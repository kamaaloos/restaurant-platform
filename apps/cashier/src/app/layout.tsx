import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { CurrencyBackdrop } from "@/components/currency-backdrop";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cashier",
  description: "Restaurant platform cashier till",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <CurrencyBackdrop />
            <div className="relative z-10 flex min-h-screen flex-1 flex-col">
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
