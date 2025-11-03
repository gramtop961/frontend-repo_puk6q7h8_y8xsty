import { X, Mail, Lock, User } from 'lucide-react';
import { useState, useEffect } from 'react';

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AuthModals({ showLogin, showSignup, onClose, onAuth }) {
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (type) => (e) => {
    e.preventDefault();
    onAuth?.({ type, ...form });
  };

  return (
    <>
      <Modal open={showLogin} onClose={onClose} title="Welcome back">
        <form onSubmit={handleSubmit('login')} className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
            <Mail size={16} className="text-slate-500" />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full py-2 outline-none bg-transparent"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
            <Lock size={16} className="text-slate-500" />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full py-2 outline-none bg-transparent"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Log in</button>
        </form>
      </Modal>

      <Modal open={showSignup} onClose={onClose} title="Create your account">
        <form onSubmit={handleSubmit('signup')} className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
            <User size={16} className="text-slate-500" />
            <input
              type="text"
              required
              placeholder="Full name"
              className="w-full py-2 outline-none bg-transparent"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
            <Mail size={16} className="text-slate-500" />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full py-2 outline-none bg-transparent"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
            <Lock size={16} className="text-slate-500" />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full py-2 outline-none bg-transparent"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Sign up</button>
        </form>
      </Modal>
    </>
  );
}
