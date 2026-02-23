const barShades = [
  "bg-primary",
  "bg-primary-dark",
  "bg-green-500",
  "bg-primary",
  "bg-primary-dark",
  "bg-green-500",
];

export default function SkillBar({ skills }: { skills: { name: string; level: number }[] }) {
  return (
    <div className="space-y-3">
      {skills.map((skill, i) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
            <span className="text-xs font-normal text-gray-400">{skill.level}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${barShades[i % barShades.length]} transition-all duration-700`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
