import type { Metadata } from "next";
import { Bebas_Neue, Noto_Sans_Arabic, Source_Sans_3 } from "next/font/google";
import { CookingBackdrop } from "@/components/cooking-backdrop";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Kitchen Display",
  description: "Live kitchen tickets for restaurant devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${arabic.variable} antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <CookingBackdrop />
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
