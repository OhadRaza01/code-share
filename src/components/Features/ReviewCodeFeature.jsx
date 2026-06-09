import React from "react";

export default function ReviewCodeFeature() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center px-6 py-20 md:px-16 overflow-hidden">

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Orange glow — right */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(234,88,12,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Same equal two-column grid as ShareCodeFeature */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Left — Feature number + Review card */}
        <div className="flex flex-col gap-6">



          {/* Review Card */}
          <div className="w-full bg-[#111] border border-[#1f1f1f] rounded-md p-5 hover:border-orange-600/20 hover:shadow-[0_0_40px_rgba(234,88,12,0.06)] transition-all duration-300">
            <div className="space-y-4">

              {/* Reviewer info */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-orange-600/15 border border-orange-600/20 flex items-center justify-center text-orange-500 text-sm font-bold shrink-0"
                >
                  O
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Ohad Raza</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-orange-500 tracking-wide">★★★★★</span>
                    <span className="text-xs text-gray-700 font-mono">· Junior Dev</span>
                  </div>
                </div>
              </div>

              {/* Review text */}
              <p className="text-gray-500 font-mono text-xs md:text-sm lg:text-md leading-relaxed">
                "Clean code! Just add{" "}
                <span className="text-orange-400">error handling</span>{" "}
                for the API call."
              </p>

              {/* Code suggestion */}
              <div className="bg-black rounded-md p-4 border-l-2 border-orange-600/40 border-t border-r border-b">
                <code className="font-mono text-xs md:text-sm lg:text-md text-gray-500 leading-6">
                  <span className="text-purple-400">try</span>{" "}
                  <span className="text-gray-400">{"{"}</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-blue-400">await</span>{" "}
                  <span className="text-gray-300">fetchData()</span>
                  <br />
                  <span className="text-gray-400">{"}"}</span>{" "}
                  <span className="text-purple-400">catch</span>
                  <span className="text-gray-400">(err) {"{"}</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-gray-300">console</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-blue-400">error</span>
                  <span className="text-gray-400">(err)</span>
                  <br />
                  <span className="text-gray-400">{"}"}</span>
                </code>
              </div>

              {/* Helpful button */}
              <button className="font-mono text-xs text-gray-600 hover:text-orange-500 transition-colors duration-200">
                👍 Helpful (8)
              </button>
            </div>
          </div>
        </div>

        {/* Right — Text */}
        <div className="flex flex-col gap-5">

          <h2
            className="text-4xl md:text-5xl font-extrabold leading-none tracking-[-0.03em]"
          >
            Get{" "}
            <span className="text-orange-600">Quality</span>
            <br />
            <span className="text-orange-600">Reviews</span>
          </h2>

          <p className="text-gray-500 font-mono text-xs md:text-sm lg:text-md leading-relaxed">
            Receive constructive feedback from experienced developers. Learn best practices, improve code quality, and write cleaner code with actionable suggestions.
          </p>

          <ul className="space-y-3">
            {[
              "Detailed code reviews within hours",
              "Suggestions with real code examples",
              "Build reputation with quality contributions",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-xs md:text-sm lg:text-md font-mono text-gray-500">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}