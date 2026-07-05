interface StatsDashboardProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div className="glass-card p-5 flex items-center justify-between border-slate-100 hover:border-slate-200 transition-all duration-300 group">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tasks</p>
          <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{stats.total}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
      </div>

      <div className="glass-card p-5 flex items-center justify-between border-slate-100 hover:border-slate-200 transition-all duration-300 group">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed</p>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.completed}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div className="glass-card p-5 flex items-center justify-between border-slate-100 hover:border-slate-200 transition-all duration-300 group">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending</p>
          <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{stats.pending}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
