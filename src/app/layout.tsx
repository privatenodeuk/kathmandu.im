import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kathmandu.im";

export const metadata: Metadata = {
  title: { default: "kathmandu.im — Kathmandu Valley Travel Guide", template: "%s | kathmandu.im" },
  description:
    "The definitive guide to hotels, attractions and travel in the Kathmandu Valley — UNESCO heritage sites, five-star hotels, temples, stupas and more.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "kathmandu.im",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav__inner">
            <a href="/" className="nav__logo">kathmandu.im</a>
            <NavBar />
          </div>
        </nav>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
