interface SearchInputProps {
  search: string;
  setSearch: (val: string) => void;
  setPage: (page: number) => void;
}

export default function SearchInput({ search, setSearch, setPage }: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset to page 1 on query updates
        }}
        placeholder="Search keywords..."
        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
      />
      <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {search && (
        <button
          type="button"
          onClick={() => {
            setSearch('');
            setPage(1);
          }}
          className="absolute right-3 top-2.5 p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
