import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supplier Ikan Hias Santo Group | Tulungagung",
  description:
    "Supplier ikan hias Santo Group, melayani grosir dan eceran, pengiriman luar kota, buka 24 jam. Hubungi kami lewat WhatsApp.",
  openGraph: {
    title: "Supplier Ikan Hias Santo Group",
    description: "Ikan hias pilihan, grosir & eceran. Buka 24 jam di Tulungagung.",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#061a25",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
