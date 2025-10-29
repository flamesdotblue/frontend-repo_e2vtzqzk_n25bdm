import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative h-[320px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full w-full bg-gradient-to-b from-white/40 via-white/50 to-white pointer-events-none" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Plan sprints. Write docs. Ship together.
        </h1>
        <p className="mt-3 max-w-2xl text-slate-700">
          A collaborative workspace blending Confluence-level editing with Jira-style planning — crafted for focus and flow.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <a href="#workspace" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:opacity-90 transition">Open Workspace</a>
          <a href="#docs" className="px-4 py-2 rounded-lg bg-white/80 border border-slate-200 text-slate-900 text-sm font-medium hover:bg-white transition">View Docs</a>
        </div>
      </div>
    </section>
  );
}
