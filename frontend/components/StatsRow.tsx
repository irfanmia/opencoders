export default function StatsRow({ stats }: { stats: { label: string; value: string | number }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl bg-white p-4 text-center shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-primary">{stat.value}</div>
          <div className="mt-1 text-xs font-medium text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
