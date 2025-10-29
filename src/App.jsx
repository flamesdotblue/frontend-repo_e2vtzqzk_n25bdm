import TopNav from './components/TopNav';
import HeroCover from './components/HeroCover';
import ProjectSidebar from './components/ProjectSidebar';
import Workspace from './components/Workspace';
import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState({ id: 'pg1', title: 'Product Overview' });
  const [showPlanning, setShowPlanning] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white text-slate-900">
      <TopNav />
      <HeroCover />

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-[288px_1fr] gap-6">
        <ProjectSidebar
          onSelectPage={(pg) => { setCurrentPage(pg); setShowPlanning(false); }}
          onSelectPlanning={() => setShowPlanning(true)}
        />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xs text-slate-500">Apollo Suite / {showPlanning ? 'Overview & Planning' : 'Docs'}</div>
              <h2 className="mt-1 text-xl font-semibold truncate">{showPlanning ? 'Sprint Workspace' : currentPage.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50">Share</button>
              <button className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-sm hover:opacity-90">New</button>
            </div>
          </div>

          <Workspace />
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500">
        Built for collaborative teams — FlowForge demo UI
      </footer>
    </div>
  );
}
