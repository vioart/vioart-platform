export default function Footer() {
  return (
    <footer className="relative mt-0 border-t border-white/10 overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] bottom-[-100px] w-[400px] h-[400px] bg-blue-500/10 blur-[120px]" />
        <div className="absolute right-[-200px] bottom-[-100px] w-[400px] h-[400px] bg-purple-500/10 blur-[120px]" />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
        {/* LEFT */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Vio Arvendha</span>. All
          rights reserved.
        </p>

        {/* RIGHT */}
        <p className="text-center md:text-right text-gray-500">
          Backend Developer • Scalable Systems
        </p>
      </div>
    </footer>
  );
}
