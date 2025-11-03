import { useState } from 'react';
import { Calendar, Menu, X, User, Ticket } from 'lucide-react';

export default function Navbar({ onLogin, onSignup, onGoToDashboard }) {
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
      <a href="#events" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
        <Calendar size={18} /> Events
      </a>
      <button onClick={onGoToDashboard} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
        <User size={18} /> Dashboard
      </button>
    </div>
  );

  const AuthButtons = () => (
    <div className="flex items-center gap-3">
      <button onClick={onLogin} className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Log in</button>
      <button onClick={onSignup} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-semibold shadow hover:bg-slate-800">
        <Ticket size={16} /> Sign up
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-slate-900 font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
              <Calendar size={18} />
            </span>
            <span className="text-lg">Evently Pro</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
          </nav>
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 border-t border-slate-200 pt-4 flex flex-col gap-4">
            <NavLinks />
            <AuthButtons />
          </div>
        )}
      </div>
    </header>
  );
}
