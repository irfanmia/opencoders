import Link from "next/link";
import { weeklyTrending, latestProjects, leaderboard, timeAgo } from "@/lib/mock-data";

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

const features = [
  { emoji: "📁", title: "Contributor Portfolio", desc: "Your developer Behance. Showcase PRs, commits, and projects across platforms." },
  { emoji: "🚀", title: "Project Launchpad", desc: "Launch your open source project. Get upvotes, find contributors." },
  { emoji: "📖", title: "Open Source Wiki", desc: "Dedicated hubs for major projects. Leaderboards, stats, community." },
];

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n);
}

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="rounded-xl border border-black/20 bg-brutal-green-light p-8 sm:p-12 shadow-brutal-green text-center">
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-tight">
          Your Open Source Story,<br />
          <span className="text-brutal-green">One Portfolio</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl font-bold text-gray-600 max-w-2xl mx-auto">
          Showcase your contributions, discover amazing projects, and connect with maintainers &amp; recruiters — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/login" className="btn-brutal text-base px-8 py-3">
            Get Started
          </Link>
          <Link href="/explore" className="btn-brutal-outline text-base px-8 py-3">
            Explore Projects
          </Link>
        </div>
        {/* Mock illustration area */}
        <div className="mt-10 mx-auto max-w-3xl rounded-xl border border-black/20 bg-white p-6 shadow-brutal">
          <div className="grid grid-cols-3 gap-3">
            {["🔗 GitHub", "🦊 GitLab", "🪣 Bitbucket"].map((p) => (
              <div key={p} className="rounded-lg border border-black/10 bg-brutal-green-pale p-3 text-center text-sm font-extrabold">{p}</div>
            ))}
          </div>
          <div className="mt-3 h-24 rounded-lg border border-black/10 bg-brutal-green-pale flex items-center justify-center text-gray-400 font-black text-sm uppercase">
            📊 Your Contribution Graph
          </div>
        </div>
      </section>

      {/* Popular This Week */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">🔥 Popular This Week</h2>
          <Link href="/launchpad" className="text-sm font-extrabold text-brutal-green hover:underline uppercase">View All →</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {weeklyTrending.map((launch) => (
            <div key={launch.id} className="min-w-[280px] max-w-[320px] shrink-0 rounded-xl border border-black/20 bg-white p-5 shadow-brutal transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚀</span>
                <h3 className="font-black uppercase tracking-tight text-black truncate">{launch.project_detail?.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {launch.project_detail?.tech_stack?.map((t) => (
                  <span key={t} className="rounded border border-black/10 bg-brutal-muted px-2 py-0.5 text-[10px] font-bold text-gray-600">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-gray-500">⭐ {formatStars(launch.project_detail?.star_count || 0)}</span>
                <span className="font-extrabold text-brutal-green">▲ {launch.upvote_count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-center mb-8">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {howItWorks.map((step, i) => (
            <div key={i} className="card-brutal text-center">
              <div className="text-5xl mb-4">{step.emoji}</div>
              <div className="badge-brutal bg-brutal-green text-white mx-auto mb-3">Step {i + 1}</div>
              <h3 className="text-lg font-black uppercase">{step.title}</h3>
              <p className="mt-2 text-sm font-semibold text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-center mb-8">Key Features</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card-brutal-green">
              <div className="text-4xl mb-3">{f.emoji}</div>
              <h3 className="text-lg font-black uppercase">{f.title}</h3>
              <p className="mt-2 text-sm font-semibold text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Projects */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">🆕 Latest Projects</h2>
          <Link href="/launchpad" className="text-sm font-extrabold text-brutal-green hover:underline uppercase">View All →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestProjects.map((project) => (
            <div key={project.id} className="card-brutal">
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
          ))}
        </div>
      </section>

      {/* Contributor Leaderboard */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">🏆 Top Contributors</h2>
          <Link href="/explore" className="text-sm font-extrabold text-brutal-green hover:underline uppercase">View Full Leaderboard →</Link>
        </div>
        <div className="rounded-xl border border-black/20 bg-white shadow-brutal overflow-hidden">
          <div className="hidden sm:grid grid-cols-[60px_1fr_120px_1fr] gap-4 px-6 py-3 bg-brutal-green-light border-b border-black/15 text-xs font-extrabold uppercase text-gray-500">
            <span>Rank</span><span>Developer</span><span>Contributions</span><span>Top Languages</span>
          </div>
          {leaderboard.slice(0, 8).map((dev) => (
            <Link key={dev.id} href={`/${dev.username}`} className="grid sm:grid-cols-[60px_1fr_120px_1fr] gap-4 px-6 py-4 border-b border-black/10 hover:bg-brutal-green-pale transition-colors items-center">
              <span className="text-2xl font-black text-brutal-green">#{dev.rank}</span>
              <div className="flex items-center gap-3">
                <img src={dev.avatar_url} alt="" className="h-9 w-9 rounded-lg border border-black/15 shadow-brutal-sm" />
                <div>
                  <div className="font-black text-sm">{dev.username}</div>
                  <div className="text-xs font-semibold text-gray-400">{dev.location}</div>
                </div>
              </div>
              <div className="font-black text-brutal-green text-lg">{dev.contribution_count}</div>
              <div className="flex flex-wrap gap-1">
                {dev.topLanguages.map((lang) => (
                  <span key={lang} className="rounded border border-black/10 bg-brutal-muted px-2 py-0.5 text-[10px] font-bold text-gray-600">{lang}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Social Proof Stats Bar */}
      <section className="rounded-xl border border-black/20 bg-brutal-green p-6 shadow-brutal">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">{s.value}</div>
              <div className="text-sm font-extrabold uppercase text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="rounded-xl border border-black/20 bg-brutal-green-light p-8 sm:p-12 shadow-brutal-green text-center">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          Ready to showcase your<br />open source journey?
        </h2>
        <p className="mt-3 text-lg font-bold text-gray-600">
          Connect GitHub, GitLab, Bitbucket, or add projects manually — it&apos;s free.
        </p>
        <Link href="/login" className="btn-brutal text-base px-10 py-3 mt-6 inline-flex">
          Get Started — It&apos;s Free
        </Link>
      </section>
    </div>
  );
}
