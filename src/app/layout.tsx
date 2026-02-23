import type { Metadata } from "next";
import "./globals.css";
import { SearchBar } from "@/components/SearchBar";

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
            <div className="nav__links">
              <a href="/hotels">Hotels</a>
              <a href="/attractions">Attractions</a>
              <SearchBar />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="footer">
          <div className="footer__inner">
            <span className="footer__logo">kathmandu.im</span>
            <span className="footer__copy">
              © {new Date().getFullYear()} kathmandu.im — The Kathmandu Valley Travel Guide
            </span>
            <div className="footer__links">
              <a href="/hotels">Hotels</a>
              <a href="/attractions">Attractions</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
