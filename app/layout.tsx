import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";


const font = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vioart | Full-Stack Web Developer",
  description:
    "Portfolio Vio Arvendha - Full-Stack Developer yang fokus pada backend, sistem scalable, dan pengalaman pengguna.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${font.className}`}
    >
      <body className="min-h-screen flex flex-col antialiased selection:bg-blue-500/30">
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 w-full pt-20">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
