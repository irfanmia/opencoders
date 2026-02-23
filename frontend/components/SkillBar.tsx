const barShades = [
  "bg-brutal-green",
  "bg-brutal-green-dark",
  "bg-brutal-green-accent",
  "bg-brutal-green",
  "bg-brutal-green-dark",
  "bg-brutal-green-accent",
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
          <div className="h-5 w-full rounded-md border border-black/15 bg-brutal-muted overflow-hidden">
            <div
              className={`h-full ${barShades[i % barShades.length]} transition-all duration-700`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
