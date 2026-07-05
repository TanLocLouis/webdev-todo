interface LimitSelectorProps {
  limit: number;
  onChangeLimit: (newLimit: number) => void;
}

export default function LimitSelector({ limit, onChangeLimit }: LimitSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Per Page</span>
      <select
        value={limit}
        onChange={(e) => onChangeLimit(Number(e.target.value))}
        className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}
