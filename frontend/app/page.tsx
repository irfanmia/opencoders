"use client";
import Link from "next/link";
import { weeklyTrending, latestProjects, leaderboard, timeAgo } from "@/lib/mock-data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  { label: "Developers", value: "1,200+" },
  { label: "Projects", value: "500+" },
  { label: "Contributions", value: "15,000+" },
  { label: "Organizations", value: "50+" },
];

const howItWorks = [
  { emoji: "🔗", title: "Connect Your Accounts", desc: "Link GitHub, GitLab, Bitbucket, or add projects manually from any source." },
  { emoji: "🎨", title: "Build Your Portfolio", desc: "Pin your best contributions, showcase your impact across platforms." },
  { emoji: "🚀", title: "Get Discovered", desc: "Appear in searches, get found by maintainers and recruiters." },
];

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n);
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const top5 = leaderboard.slice(0, 5);

  return (
    <div className="space-y-16">
      {/* Hero (60%) + Top Contributors (40%) */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Hero - 60% */}
        <div className="lg:col-span-3 rounded-xl border border-black/20 bg-brutal-green-light p-8 sm:p-10 shadow-brutal-green flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-tight animate-fade-in-up">
            Your Open Source Story,<br />
            <span className="text-brutal-green">One Portfolio</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg font-bold text-gray-600 max-w-xl animate-fade-in-up-delay">
            Showcase your contributions, discover amazing projects, and connect with maintainers &amp; recruiters — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 animate-fade-in-up-delay-2">
            <Link href="/login" className="btn-brutal text-base px-8 py-3 animate-pulse-subtle">
              Get Started
            </Link>
            <Link href="/explore" className="btn-brutal-outline text-base px-8 py-3">
              Explore Projects
            </Link>
          </div>
        </div>

        {/* Top Contributors - 40% */}
        <div className="lg:col-span-2 rounded-xl border border-black/20 bg-white shadow-brutal overflow-hidden">
          <div className="px-5 py-3 bg-brutal-green-light border-b border-black/15 flex items-center justify-between">
            <h2 className="text-lg font-black uppercase tracking-tight">🏆 Top Contributors</h2>
            <Link href="/explore" className="text-xs font-extrabold text-brutal-green hover:underline uppercase">View All →</Link>
          </div>
          {top5.map((dev, i) => (
            <Link
              key={dev.id}
              href={`/${dev.username}`}
              className="flex items-center gap-3 px-5 py-3 border-b border-black/10 hover:bg-brutal-green-pale transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-xl font-black text-brutal-green w-8">#{dev.rank}</span>
              <img src={dev.avatar_url} alt="" className="h-8 w-8 rounded-lg border border-black/15 shadow-brutal-sm" />
              <div className="flex-1 min-w-0">
                <div className="font-black text-sm truncate">{dev.username}</div>
                <div className="text-[10px] font-semibold text-gray-400">{dev.location}</div>
              </div>
              <div className="font-black text-brutal-green text-sm">{dev.contribution_count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular This Week — Marquee */}
      <FadeIn>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">🔥 Popular This Week</h2>
            <Link href="/launchpad" className="text-sm font-extrabold text-brutal-green hover:underline uppercase">View All →</Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-black/20 bg-white shadow-brutal group">
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {[...weeklyTrending, ...weeklyTrending].map((launch, idx) => (
                <div
                  key={`${launch.id}-${idx}`}
                  className="flex-shrink-0 w-[280px] p-4 border-r border-black/10 transition-all duration-300 hover:scale-[1.02] hover:bg-brutal-green-pale"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🚀</span>
                    <h3 className="font-black uppercase tracking-tight text-sm text-black truncate">{launch.project_detail?.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {launch.project_detail?.tech_stack?.slice(0, 2).map((t) => (
                      <span key={t} className="rounded border border-black/10 bg-brutal-muted px-2 py-0.5 text-[10px] font-bold text-gray-600">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-500">⭐ {formatStars(launch.project_detail?.star_count || 0)}</span>
                    <span className="font-extrabold text-brutal-green">▲ {launch.upvote_count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* How It Works */}
      <section>
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-center mb-8">How It Works</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-6">
          {howItWorks.map((step, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="card-brutal text-center transition-all duration-300 hover:scale-[1.02]">
                <div className="text-5xl mb-4">{step.emoji}</div>
                <div className="badge-brutal bg-brutal-green text-white mx-auto mb-3">Step {i + 1}</div>
                <h3 className="text-lg font-black uppercase">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold text-gray-600">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Latest Projects */}
      <section>
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">🆕 Latest Projects</h2>
            <Link href="/launchpad" className="text-sm font-extrabold text-brutal-green hover:underline uppercase">View All →</Link>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestProjects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 100}>
              <div className="card-brutal transition-all duration-300 hover:scale-[1.02]">
                <h3 className="font-black uppercase tracking-tight text-black">{project.name}</h3>
                <p className="mt-1 text-sm font-semibold text-gray-600 line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.tech_stack?.map((t) => (
                    <span key={t} className="rounded border border-black/10 bg-brutal-muted px-2 py-0.5 text-[10px] font-bold text-gray-600">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <Link href={`/${project.owner.username}`} className="flex items-center gap-1 font-bold text-brutal-green-dark hover:text-brutal-green">
                    <img src={project.owner.avatar_url} alt="" className="h-4 w-4 rounded border border-black/10" />
                    {project.owner.username}
                  </Link>
                  <span className="font-mono text-xs text-gray-400">{timeAgo(project.created_at)}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <FadeIn>
        <section className="rounded-xl border border-black/20 bg-brutal-green p-6 shadow-brutal">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <AnimatedCounter value={s.value} className="text-3xl sm:text-4xl font-black text-white block" />
                <div className="text-sm font-extrabold uppercase text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Bottom CTA */}
      <FadeIn>
        <section className="rounded-xl border border-black/20 bg-brutal-green-light p-8 sm:p-12 shadow-brutal-green text-center">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Ready to showcase your<br />open source journey?
          </h2>
          <p className="mt-3 text-lg font-bold text-gray-600">
            Connect GitHub, GitLab, Bitbucket, or add projects manually — it&apos;s free.
          </p>
          <Link href="/login" className="btn-brutal text-base px-10 py-3 mt-6 inline-flex animate-pulse-subtle">
            Get Started — It&apos;s Free
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
