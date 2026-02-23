import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Open Coders — Developer Portfolio & Launchpad",
  description:
    "Showcase your open source contributions, launch projects, and connect with developers worldwide.",
  metadataBase: new URL("https://opencoders.org"),
  openGraph: {
    title: "Open Coders",
    description: "Developer Portfolio & Project Launchpad",
    url: "https://opencoders.org",
    siteName: "Open Coders",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Coders",
    description: "Developer Portfolio & Project Launchpad",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
