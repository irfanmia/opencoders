import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="card-brutal-lime max-w-md w-full text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-xl border-3 border-black bg-brutal-yellow text-5xl shadow-brutal">
          🚀
        </div>

        <h1 className="text-4xl font-black uppercase tracking-tight text-black">
          Join <span className="text-brutal-blue">Open</span>
          <span className="text-brutal-pink">Coders</span>
        </h1>

        <p className="mt-4 text-base font-semibold text-gray-600">
          Showcase your open source contributions, launch projects, and connect
          with developers worldwide.
        </p>

        <div className="mt-4 flex justify-center gap-4">
          {[
            { label: "Developers", value: "2,400+" },
            { label: "Projects", value: "890+" },
            { label: "Contributions", value: "12K+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-black text-brutal-pink">{s.value}</div>
              <div className="text-[10px] font-bold uppercase text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="btn-brutal mt-8 w-full justify-center py-4 text-base"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Continue with GitHub
        </a>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-[3px] flex-1 bg-black/10" />
          <span className="text-xs font-extrabold uppercase text-gray-400">What you get</span>
          <div className="h-[3px] flex-1 bg-black/10" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: "🎯", label: "Portfolio", bg: "bg-brutal-lime/20" },
            { icon: "🚀", label: "Launches", bg: "bg-brutal-yellow/20" },
            { icon: "⭐", label: "Stars", bg: "bg-brutal-pink/20" },
            { icon: "🤝", label: "Community", bg: "bg-brutal-cyan/20" },
          ].map((item) => (
            <div key={item.label} className={`rounded-lg border-2 border-black ${item.bg} p-3 text-center shadow-brutal-sm`}>
              <div className="text-2xl">{item.icon}</div>
              <div className="mt-1 text-xs font-extrabold uppercase text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs font-bold text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
