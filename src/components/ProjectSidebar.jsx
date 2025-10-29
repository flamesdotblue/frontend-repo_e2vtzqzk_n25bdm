import { useState } from 'react';
import { Home, FolderKanban, FileText, Plus, ChevronRight, Settings } from 'lucide-react';

const projectsSeed = [
  {
    id: 'p1',
    name: 'Apollo Suite',
    pages: [
      { id: 'pg1', title: 'Product Overview' },
      { id: 'pg2', title: 'Sprint Plan' },
      { id: 'pg3', title: 'Architecture' },
    ],
  },
  {
    id: 'p2',
    name: 'Nebula CRM',
    pages: [
      { id: 'pg4', title: 'Release Notes' },
      { id: 'pg5', title: 'Support Playbook' },
    ],
  },
];

export default function ProjectSidebar({ onSelectPage, onSelectPlanning }) {
  const [projects] = useState(projectsSeed);
  const [openIds, setOpenIds] = useState(new Set(['p1']));
  const [active, setActive] = useState({ type: 'page', id: 'pg1' });

  const toggle = (pid) => {
    const next = new Set(openIds);
    next.has(pid) ? next.delete(pid) : next.add(pid);
    setOpenIds(next);
  };

  const onOpenPage = (page) => {
    setActive({ type: 'page', id: page.id });
    onSelectPage?.(page);
  };

  return (
    <aside className="h-full w-72 shrink-0 border-r border-slate-200 bg-white">
      <div className="p-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-slate-800 font-semibold">
          <FolderKanban size={18} /> Projects
        </div>
        <button className="p-2 rounded-md hover:bg-slate-100 text-slate-600">
          <Plus size={16} />
        </button>
      </div>
      <nav className="px-2 space-y-1">
        <button
          onClick={() => onSelectPlanning?.()}
          className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm transition hover:bg-slate-100 ${
            active.type === 'planning' ? 'bg-slate-900 text-white hover:bg-slate-900' : 'text-slate-700'
          }`}
        >
          <Home size={16} /> Overview & Planning
        </button>
        {projects.map((p) => (
          <div key={p.id} className="text-sm">
            <button
              onClick={() => toggle(p.id)}
              className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 text-slate-700"
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <ChevronRight
                  size={16}
                  className={`transition-transform ${openIds.has(p.id) ? 'rotate-90' : ''}`}
                />
                {p.name}
              </span>
              <Settings size={16} className="text-slate-400" />
            </button>
            {openIds.has(p.id) && (
              <div className="mt-1 ml-6 space-y-1">
                {p.pages.map((pg) => (
                  <button
                    key={pg.id}
                    onClick={() => onOpenPage(pg)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-100 ${
                      active.type === 'page' && active.id === pg.id
                        ? 'bg-slate-900 text-white hover:bg-slate-900'
                        : 'text-slate-700'
                    }`}
                  >
                    <FileText size={16} /> {pg.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
