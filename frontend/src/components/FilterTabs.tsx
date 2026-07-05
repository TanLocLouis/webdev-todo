interface FilterTabsProps {
  statusFilter: 'all' | 'active' | 'completed';
  changeFilter: (newFilter: 'all' | 'active' | 'completed') => void;
}

export default function FilterTabs({ statusFilter, changeFilter }: FilterTabsProps) {
  return (
    <div className="flex rounded-xl bg-slate-100 p-1 self-start sm:self-auto shadow-sm">
      <button
        type="button"
        onClick={() => changeFilter('all')}
        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
          statusFilter === 'all'
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => changeFilter('active')}
        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
          statusFilter === 'active'
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => changeFilter('completed')}
        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
          statusFilter === 'completed'
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        Completed
      </button>
    </div>
  );
}
