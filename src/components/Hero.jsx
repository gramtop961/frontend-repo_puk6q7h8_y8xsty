import { Search, Star } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            <Star size={14} className="text-amber-500" /> All-in-one event management
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Discover, book, and manage events like a pro
          </h1>
          <p className="max-w-2xl text-slate-600">
            Browse curated conferences, workshops, and concerts. Secure your tickets in seconds and keep everything organized in your dashboard.
          </p>

          <div className="w-full max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch?.(searchQuery);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
            >
              <div className="px-3 text-slate-500">
                <Search size={18} />
              </div>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 py-2"
                placeholder="Search for events, cities, or categories"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
