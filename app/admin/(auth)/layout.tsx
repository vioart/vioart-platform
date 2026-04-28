export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">

      {/* Animated gradient blobs */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

      {/* subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* content */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        {children}
      </div>
    </div>
  );
}