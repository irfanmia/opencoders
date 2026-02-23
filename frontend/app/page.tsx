"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCounter from "@/components/AnimatedCounter";
import { timeAgo } from "@/lib/utils";

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
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [weeklyTrending, setWeeklyTrending] = useState<any[]>([]);
  const [latestProjects, setLatestProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard').then(r => r.json()).then(setLeaderboard).catch(console.error);
    fetch('/api/launches').then(r => r.json()).then((launches: any[]) => {
      // Prioritize real user projects, then sort by upvotes
      setWeeklyTrending(
        launches.sort((a: any, b: any) => {
          const aReal = a.launched_by?.github_id ? 1 : 0;
          const bReal = b.launched_by?.github_id ? 1 : 0;
          if (aReal !== bReal) return bReal - aReal;
          return (b.upvote_count || 0) - (a.upvote_count || 0);
        }).slice(0, 8)
      );
    }).catch(console.error);
    fetch('/api/projects').then(r => r.json()).then((projects: any[]) => {
      setLatestProjects(
        projects
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 6)
      );
    }).catch(console.error);
  }, []);

  const top5 = leaderboard.slice(0, 5);

  return (
    <div className="space-y-20">
      {/* Hero (60%) + Top Contributors (40%) */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Hero - 60% */}
        <div className="lg:col-span-3 py-8 sm:py-12 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl font-heading text-gray-900 leading-tight animate-fade-in-up">
            Your Open Source Story,<br />
            <span className="text-primary">One Portfolio</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg font-normal text-gray-500 max-w-xl animate-fade-in-up-delay">
            Showcase your contributions, discover amazing projects, and connect with maintainers &amp; recruiters — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up-delay-2">
            <Link href="/login" className="btn-primary text-base px-8 py-3 animate-pulse-subtle">
              Get Started
            </Link>
            <Link href="/explore" className="btn-secondary text-base px-8 py-3">
              Explore Projects
            </Link>
          </div>
        </div>

        {/* Top Contributors - 40% */}
        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 bg-section border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">🏆 Top Contributors</h2>
            <Link href="/explore" className="text-xs font-medium text-primary hover:underline">View All →</Link>
          </div>
          {top5.map((dev: any, i: number) => (
            <Link
              key={dev.id}
              href={`/${dev.username}`}
              className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 hover:bg-section transition-colors duration-200"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-lg font-bold text-primary w-8">#{dev.rank}</span>
              <img src={dev.avatar_url} alt="" className="h-8 w-8 rounded-full border border-gray-200" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 truncate">{dev.username}</div>
                <div className="text-[10px] font-normal text-gray-400">{dev.location}</div>
              </div>
              <div className="font-semibold text-primary text-sm">{dev.contribution_count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular This Week — Marquee */}
      <FadeIn>
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-heading text-gray-900">🔥 Popular This Week</h2>
            <Link href="/launchpad" className="text-sm font-medium text-primary hover:underline">View All →</Link>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 group">
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {[...weeklyTrending, ...weeklyTrending].map((launch: any, idx: number) => (
                <div
                  key={`${launch.id}-${idx}`}
                  className="flex-shrink-0 w-[320px] p-5 border-r border-gray-100 transition-colors duration-200 hover:bg-section cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {launch.project_detail?.logo ? (
                      <img src={launch.project_detail.logo} alt="" className="h-10 w-10 rounded-lg border border-gray-200 object-contain bg-white p-1" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light border border-green-100 text-lg">🚀</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{launch.project_detail?.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <img src={launch.launched_by.avatar_url} alt="" className="h-4 w-4 rounded-full border border-gray-200" />
                        <span className="text-[11px] font-normal text-gray-400">{launch.launched_by.username}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-normal text-gray-500 line-clamp-2 mb-3 leading-relaxed">{launch.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {launch.project_detail?.tech_stack?.slice(0, 3).map((t: string) => (
                      <span key={t} className="rounded-full border border-gray-200 bg-section px-2.5 py-0.5 text-[10px] font-medium text-gray-600">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                    <span className="font-normal text-gray-400">⭐ {formatStars(launch.project_detail?.star_count || 0)}</span>
                    <span className="font-semibold text-primary bg-primary-light rounded-full px-3 py-1 text-xs">▲ {launch.upvote_count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* How It Works — full-width dark section */}
      <FadeIn>
        <section className="-mx-4 px-4 py-16 rounded-2xl bg-[#0a3d1a]">
          <h2 className="text-2xl sm:text-3xl font-heading text-center mb-12 text-white">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {howItWorks.map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{step.emoji}</div>
                <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">Step {i + 1}</span>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm font-normal text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Latest Projects */}
      <section>
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading text-gray-900">🆕 Latest Projects</h2>
            <Link href="/launchpad" className="text-sm font-medium text-primary hover:underline">View All →</Link>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProjects.map((project: any, i: number) => (
            <FadeIn key={project.id} delay={i * 100}>
              <div className="card-clean">
                <div className="flex items-center gap-3 mb-2">
                  {project.logo ? (
                    <img src={project.logo} alt="" className="h-10 w-10 rounded-lg border border-gray-200 object-contain bg-white p-1" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light border border-green-100 text-lg">📦</div>
                  )}
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                </div>
                <p className="mt-1 text-sm font-normal text-gray-500 line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.tech_stack?.map((t: string) => (
                    <span key={t} className="rounded-full border border-gray-200 bg-section px-2 py-0.5 text-[10px] font-medium text-gray-600">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <Link href={`/${project.owner.username}`} className="flex items-center gap-1 font-medium text-primary hover:text-primary-dark">
                    <img src={project.owner.avatar_url} alt="" className="h-4 w-4 rounded-full border border-gray-200" />
                    {project.owner.username}
                  </Link>
                  <div className="flex items-center gap-2">
                    {project.repo_url && (
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-200 bg-section px-2 py-0.5 text-[10px] font-medium text-gray-700 hover:bg-primary-light hover:text-primary transition-colors">
                        Repo →
                      </a>
                    )}
                    <span className="text-xs text-gray-400">{timeAgo(project.created_at)}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <FadeIn>
        <section className="rounded-xl bg-primary-light p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <AnimatedCounter value={s.value} className="text-3xl sm:text-4xl font-bold text-primary block" />
                <div className="text-sm font-medium text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Bottom CTA */}
      <FadeIn>
        <section className="py-12 sm:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading text-gray-900">
            Ready to showcase your<br />open source journey?
          </h2>
          <p className="mt-4 text-lg font-normal text-gray-500">
            Connect GitHub, GitLab, Bitbucket, or add projects manually — it&apos;s free.
          </p>
          <Link href="/login" className="btn-primary text-base px-10 py-3 mt-8 inline-flex animate-pulse-subtle">
            Get Started — It&apos;s Free
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
