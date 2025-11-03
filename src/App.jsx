import { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import EventsGrid from './components/EventsGrid.jsx';
import AuthModals from './components/AuthModals.jsx';
import { X, Shield, Settings, BarChart3 } from 'lucide-react';

function BookingModal({ open, event, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(1);
  const [tier, setTier] = useState('Standard');

  const total = useMemo(() => (event ? (event.price * quantity) : 0), [event, quantity]);

  if (!open || !event) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative z-10 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Book tickets</h3>
            <p className="text-sm text-slate-600">{event.title}</p>
          </div>
          <button onClick={onClose} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {['Standard', 'VIP'].map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium ${tier === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="w-10 text-right text-sm font-semibold text-slate-900">{quantity}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-slate-600">Total</span>
            <span className="text-lg font-bold text-slate-900">${total}</span>
          </div>
          <button
            onClick={() => onConfirm({ eventId: event.id, tier, quantity })}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Confirm booking
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Management dashboard</h2>
          <p className="text-slate-600 max-w-2xl">Track sales, manage listings, and check-in attendees in one place. This preview shows the kind of information you would see after signing in.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-2"><BarChart3 size={18}/> Sales today</div>
            <div className="text-3xl font-extrabold text-slate-900">$4,320</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">+12% vs yesterday</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-2"><Shield size={18}/> Check-ins</div>
            <div className="text-3xl font-extrabold text-slate-900">184</div>
            <div className="text-xs text-slate-500 mt-1">Across 3 events</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-2"><Settings size={18}/> Listings</div>
            <div className="text-3xl font-extrabold text-slate-900">12</div>
            <div className="text-xs text-slate-500 mt-1">Active & upcoming</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [bookingFor, setBookingFor] = useState(null);

  const handleAuth = (payload) => {
    // Placeholder for backend integration
    alert(`${payload.type === 'login' ? 'Logged in' : 'Signed up'} as ${payload.email}`);
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleBook = (ev) => setBookingFor(ev);
  const handleConfirmBooking = ({ eventId, tier, quantity }) => {
    alert(`Booked ${quantity} ${tier} ticket(s) for ${eventId}.`);
    setBookingFor(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
        onGoToDashboard={() => {
          const el = document.getElementById('dashboard');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={() => {}} />

      <EventsGrid
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onBook={handleBook}
      />

      <div id="dashboard">
        <DashboardPreview />
      </div>

      <footer className="border-t border-slate-200 py-10 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="font-medium">Evently Pro</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-slate-900" href="#events">Browse events</a>
            <a className="hover:text-slate-900" href="#dashboard">Dashboard</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <AuthModals
        showLogin={showLogin}
        showSignup={showSignup}
        onClose={() => { setShowLogin(false); setShowSignup(false); }}
        onAuth={handleAuth}
      />

      <BookingModal
        open={!!bookingFor}
        event={bookingFor}
        onClose={() => setBookingFor(null)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
