import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-blue-500/30">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}