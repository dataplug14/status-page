import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usenubis Status",
  description:
    "Live service health, incident history, and maintenance windows across Usenubis properties.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
