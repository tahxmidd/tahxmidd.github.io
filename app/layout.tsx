import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tahmid Bhuiyan",
  description:
    "IT Student & Developer at UCF. Building things at the intersection of AI and software.",
  openGraph: {
    title: "Tahmid Bhuiyan",
    description: "IT Student & Developer at UCF.",
    url: "https://tahmidbhuiyan.com",
    siteName: "Tahmid Bhuiyan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-[#1d1d1f]">{children}</body>
    </html>
  );
}
