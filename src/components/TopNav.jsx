import { useState } from 'react';
import { Rocket, Search, Bell, User, ChevronDown } from 'lucide-react';

export default function TopNav() {
  const [query, setQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white">
            <Rocket size={18} />
          </div>
          <span>FlowForge</span>
        </div>

        <div className="hidden md:flex items-center ml-6 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, cards, people…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white/80 focus:bg-white outline-none focus:ring-2 ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
            Projects <ChevronDown size={16} />
          </button>
          <button className="relative p-2 rounded-md hover:bg-slate-100 text-slate-700 transition">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 border border-slate-200 bg-white">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center text-white text-xs">A</div>
            <User size={16} className="text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
