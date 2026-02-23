export default function StatsRow({ stats }: { stats: { label: string; value: string | number }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-black/20 bg-white p-4 text-center shadow-brutal-sm">
          <div className="text-3xl font-black text-brutal-green">{stat.value}</div>
          <div className="mt-1 text-xs font-extrabold uppercase text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
