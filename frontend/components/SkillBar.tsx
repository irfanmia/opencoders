const barColors = [
  "bg-brutal-lime",
  "bg-brutal-pink",
  "bg-brutal-blue",
  "bg-brutal-yellow",
  "bg-brutal-orange",
  "bg-brutal-cyan",
];

export default function SkillBar({ skills }: { skills: { name: string; level: number }[] }) {
  return (
    <div className="space-y-3">
      {skills.map((skill, i) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-extrabold uppercase">{skill.name}</span>
            <span className="text-xs font-bold text-gray-500">{skill.level}%</span>
          </div>
          <div className="h-5 w-full rounded-md border-2 border-black bg-brutal-muted overflow-hidden">
            <div
              className={`h-full ${barColors[i % barColors.length]} border-r-2 border-black transition-all duration-700`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
