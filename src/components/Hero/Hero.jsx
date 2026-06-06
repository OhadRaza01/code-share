import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] bg-black flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Orange glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(234,88,12,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded border border-orange-600/30 bg-orange-600/[0.07] text-orange-400 font-mono text-[11px] font-medium tracking-widest [animation:heroUp_0.5s_ease_both] [animation-fill-mode:both]">
        <span className="w-1.25 h-1.25 rounded-full bg-orange-600 animate-pulse" />
        JOIN FREE
      </div>

      {/* Headline */}
      <h1
        className="relative z-10 font-extrabold text-white leading-none tracking-[-0.035em] text-[clamp(2.8rem,7vw,5rem)] max-w-225 [animation:heroUp_0.5s_0.08s_ease_both] [animation-fill-mode:both]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Code Shared.
        <br />
        <span className="text-orange-600">Reviewed.</span>
        <br />
        Perfected.
      </h1>

      {/* Subtext */}
      <p className="relative z-10 mt-5 text-gray-400 font-mono text-[15px] leading-[1.8] max-w-100 [animation:heroUp_0.5s_0.16s_ease_both] [animation-fill-mode:both]">
        Post snippets. Get real feedback.
        <br />
        Level up with a community that ships.
      </p>

      {/* Buttons */}
      <div className="relative z-10 flex items-center gap-3 mt-10 [animation:heroUp_0.5s_0.24s_ease_both] [animation-fill-mode:both]">
        <Link
          to="/signup"
          className="flex items-center gap-2 px-7 py-3.5 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold  transition-all duration-200  active:scale-[0.97]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Start sharing
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10m0 0L8 3m5 5-5 5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <button
          className="px-6 py-3.5 rounded-md bg-transparent border border-[#1f1f1f] hover:border-gray-700 text-gray-500 hover:text-gray-300 text-sm font-semibold transition-all duration-200 active:scale-[0.97]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Browse snippets
        </button>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 [animation:heroUp_0.5s_0.5s_ease_both] [animation-fill-mode:both]">
        <span className="font-mono text-[10px] text-gray-800 tracking-[0.12em]">
          SCROLL
        </span>
        <div
          className="w-px h-9"
          style={{
            background: "linear-gradient(to bottom, #ea580c, transparent)",
            animation: "drip 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Fonts + Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes heroUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drip {
          0%  { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100%{ transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}