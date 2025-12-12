import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Landing Factory",
  description: "Gerador de Landing Pages com IA",
  manifest: "/manifest.json",
  themeColor: "#020024",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LandingFactory"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${outfit.variable} ${playfair.variable} font-sans bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
