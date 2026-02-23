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
          className={`rounded-lg border border-black/20 px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-all ${
            active === tab
              ? "bg-brutal-green text-white shadow-none translate-x-[1px] translate-y-[1px]"
              : "bg-white shadow-brutal-sm hover:bg-brutal-green-light hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
