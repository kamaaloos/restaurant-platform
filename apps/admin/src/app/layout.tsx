import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { DiningBackdrop } from "@/components/dining-backdrop";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
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
  title: "Admin console",
  description: "Restaurant platform operations console",
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
            <DiningBackdrop />
            <div className="relative z-10 flex min-h-screen flex-1 flex-col">
              <div className="flex flex-1 flex-col">{children}</div>
              <SiteFooter />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
