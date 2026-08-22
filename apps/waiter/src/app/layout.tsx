import type { Metadata } from "next";
import { Anton, DM_Sans, Noto_Sans_Arabic } from "next/font/google";
import { DiningBackdrop } from "@/components/dining-backdrop";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Waiter Display",
  description: "Live waiter orders and table service requests",
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
            <DiningBackdrop />
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
