import { CalendarDays, MapPin, Clock, Ticket, Filter } from 'lucide-react';

const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

const mockEvents = [
  {
    id: 'e1',
    title: 'Tech Innovators Summit 2025',
    date: '2025-11-20T09:00:00Z',
    location: 'San Francisco, CA',
    price: 299,
    category: 'Conference',
    cover: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'e2',
    title: 'Indie Night Live',
    date: '2025-12-05T19:30:00Z',
    location: 'Austin, TX',
    price: 59,
    category: 'Concert',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'e3',
    title: 'Creative Coding Workshop',
    date: '2025-11-12T14:00:00Z',
    location: 'Remote',
    price: 39,
    category: 'Workshop',
    cover: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'e4',
    title: 'Product Design Meetup',
    date: '2025-11-28T18:00:00Z',
    location: 'New York, NY',
    price: 25,
    category: 'Meetup',
    cover: 'https://images.unsplash.com/photo-1529336953121-4f1c2b6f2a54?q=80&w=1600&auto=format&fit=crop',
  },
];

const categories = ['All', 'Conference', 'Concert', 'Workshop', 'Meetup'];

export default function EventsGrid({ searchQuery, selectedCategory, setSelectedCategory, onBook }) {
  const filtered = mockEvents.filter((e) => {
    const q = (searchQuery || '').toLowerCase();
    const catOk = selectedCategory === 'All' || e.category === selectedCategory;
    const qOk = !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    return catOk && qOk;
  });

  return (
    <section id="events" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Upcoming events</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700"><Filter size={16}/> Filters</div>
            <div className="flex items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selectedCategory === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <article key={e.id} className="group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-44 overflow-hidden">
                <img src={e.cover} alt={e.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700 shadow">
                  {e.category}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h3 className="font-semibold text-slate-900 line-clamp-2">{e.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1"><CalendarDays size={16}/> {formatDate(e.date)}</span>
                  <span className="inline-flex items-center gap-1"><Clock size={16}/> 2h</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1"><MapPin size={16}/> {e.location}</span>
                  <span className="font-semibold text-slate-900">${e.price}</span>
                </div>
                <div className="pt-2">
                  <button onClick={() => onBook(e)} className="inline-flex items-center gap-2 w-full justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                    <Ticket size={16}/> Book tickets
                  </button>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-600">No matching events found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
