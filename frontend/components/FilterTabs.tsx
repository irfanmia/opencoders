"use client";

export default function FilterTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`rounded-lg border-3 border-black px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-all ${
            active === tab
              ? "bg-brutal-lime shadow-none translate-x-[2px] translate-y-[2px]"
              : "bg-white shadow-brutal-sm hover:bg-brutal-lime/20 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
