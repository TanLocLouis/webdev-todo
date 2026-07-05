import type { PaginationInfo } from '../types'

interface PaginationProps {
  pagination: PaginationInfo;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ pagination, page, setPage }: PaginationProps) {
  if (pagination.totalPages <= 1) return null;

  return (
    <section className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 p-1">
      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
        Showing Page {pagination.page} of {pagination.totalPages}
      </span>
      <div className="flex items-center gap-1.5 shadow-sm rounded-xl p-1 bg-slate-100">
        <button
          type="button"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-800 disabled:text-slate-300 disabled:pointer-events-none hover:bg-white/80 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {Array.from({ length: pagination.totalPages }).map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all ${
              page === i + 1
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
          disabled={page === pagination.totalPages}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-800 disabled:text-slate-300 disabled:pointer-events-none hover:bg-white/80 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
