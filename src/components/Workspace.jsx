import { useEffect, useMemo, useRef, useState } from 'react';
import { Reorder, motion } from 'framer-motion';
import { Bold, Italic, List, ListOrdered, CheckSquare, Code, Link as LinkIcon, AtSign, Image as ImageIcon, Clock, UserCircle2, Tag } from 'lucide-react';

function Toolbar({ onFormat, onMention }) {
  const btn = 'inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-slate-700 hover:bg-slate-100';
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b border-slate-200 bg-white rounded-t-xl">
      <button className={btn} onClick={() => onFormat('bold')}><Bold size={16}/> Bold</button>
      <button className={btn} onClick={() => onFormat('italic')}><Italic size={16}/> Italic</button>
      <button className={btn} onClick={() => onFormat('insertUnorderedList')}><List size={16}/> Bullets</button>
      <button className={btn} onClick={() => onFormat('insertOrderedList')}><ListOrdered size={16}/> Numbers</button>
      <button className={btn} onClick={() => onFormat('insertCheckbox')}><CheckSquare size={16}/> Checklist</button>
      <button className={btn} onClick={() => onFormat('formatBlock','pre')}><Code size={16}/> Code</button>
      <button className={btn} onClick={() => onFormat('createLink')}><LinkIcon size={16}/> Link</button>
      <button className={btn} onClick={onMention}><AtSign size={16}/> Mention</button>
      <div className="ml-auto inline-flex items-center gap-2 text-xs text-slate-500">
        <span className="h-2 w-2 rounded-full bg-emerald-500"/> Autosaved
      </div>
    </div>
  );
}

function PresenceBar({ users }) {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-slate-200 bg-slate-50/60">
      {users.map((u) => (
        <div key={u.id} className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full text-white text-[10px] grid place-items-center" style={{ background: u.color }}>{u.initials}</div>
          <span className="text-xs text-slate-600">{u.name}</span>
        </div>
      ))}
    </div>
  );
}

function RichEditor() {
  const editorRef = useRef(null);
  const [content, setContent] = useState(() => localStorage.getItem('ff_doc') || '<h2>Welcome to FlowForge</h2><p>Type \\ to open the command palette. Use @ to mention teammates. Drag cards in Planning.</p>');

  // Mock presence users
  const users = useMemo(() => [
    { id: 'u1', name: 'Ava', initials: 'A', color: 'linear-gradient(135deg,#4f46e5,#06b6d4)' },
    { id: 'u2', name: 'Ben', initials: 'B', color: 'linear-gradient(135deg,#f43f5e,#f59e0b)' },
  ], []);

  useEffect(() => {
    const id = setInterval(() => localStorage.setItem('ff_doc', content), 1000);
    return () => clearInterval(id);
  }, [content]);

  const exec = (cmd, val) => {
    if (cmd === 'insertCheckbox') {
      document.execCommand('insertHTML', false, '<div class="flex items-start gap-2"><input type="checkbox" class="mt-1"/> <span>Task</span></div>');
    } else if (cmd === 'createLink') {
      const url = prompt('Enter URL');
      if (url) document.execCommand('createLink', false, url);
    } else if (cmd === 'formatBlock') {
      document.execCommand('formatBlock', false, val);
    } else {
      document.execCommand(cmd, false, val);
    }
  };

  const handleInput = () => {
    setContent(editorRef.current?.innerHTML || '');
  };

  const handleMention = () => {
    exec('insertHTML', `<span class="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 text-sm">@Ava</span>&nbsp;`);
  };

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <Toolbar onFormat={exec} onMention={handleMention} />
      <PresenceBar users={users} />
      <div className="relative">
        {users.map((u, i) => (
          <motion.div
            key={u.id}
            className="absolute top-6 left-6 text-[10px] px-2 py-1 rounded-full text-white shadow"
            style={{ background: u.color }}
            animate={{ x: [0, 40 + i * 10, 0], y: [0, 6 + i * 4, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity }}
          >
            {u.name} is typing…
          </motion.div>
        ))}
        <div
          ref={editorRef}
          onInput={handleInput}
          contentEditable
          suppressContentEditableWarning
          className="prose prose-slate max-w-none p-5 min-h-[300px] focus:outline-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

function KanbanBoard() {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', color: 'bg-slate-50', cards: [
      { id: 'c1', title: 'Design editor toolbar', labels: ['design'], assignee: 'Ava', due: 'Fri' },
      { id: 'c2', title: 'Set up presence cursors', labels: ['realtime'], assignee: 'Ben', due: 'Mon' },
    ]},
    { id: 'progress', title: 'In Progress', color: 'bg-amber-50', cards: [
      { id: 'c3', title: 'Implement Kanban drag', labels: ['frontend'], assignee: 'Kai', due: 'Today' },
    ]},
    { id: 'done', title: 'Done', color: 'bg-emerald-50', cards: [
      { id: 'c4', title: 'Hero Spline section', labels: ['polish'], assignee: 'Ava', due: 'Yesterday' },
    ]},
  ]);

  const moveCard = (fromCol, toCol, cardIdx, toIdx) => {
    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, cards: [...c.cards] }));
      const source = next.find((c) => c.id === fromCol);
      const dest = next.find((c) => c.id === toCol);
      const [card] = source.cards.splice(cardIdx, 1);
      dest.cards.splice(toIdx, 0, card);
      return next;
    });
  };

  const onInlineEdit = (colId, idx, title) => {
    setColumns((prev) => prev.map((c) => (
      c.id === colId ? { ...c, cards: c.cards.map((cd, i) => i === idx ? { ...cd, title } : cd) } : c
    )));
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.id} className={`rounded-xl border border-slate-200 ${col.color} p-3`}> 
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-slate-800">{col.title}</h3>
              <span className="text-xs text-slate-500">{col.cards.length}</span>
            </div>
            <Reorder.Group axis="y" values={col.cards} onReorder={(newOrder) => {
              setColumns((prev) => prev.map((c) => c.id === col.id ? { ...c, cards: newOrder } : c));
            }}>
              {col.cards.map((card, idx) => (
                <Reorder.Item key={card.id} value={card} as={motion.div} layout
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  className="mb-3 rounded-lg bg-white border border-slate-200 p-3 shadow-sm cursor-grab">
                  <InlineCard
                    card={card}
                    onChange={(t) => onInlineEdit(col.id, idx, t)}
                    onDropTo={(toColId) => moveCard(col.id, toColId, idx, 0)}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ))}
      </div>
    </div>
  );
}

function InlineCard({ card, onChange, onDropTo }) {
  const [title, setTitle] = useState(card.title);
  const [editing, setEditing] = useState(false);

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(title);
      setEditing(false);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(card))}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        try {
          const dropped = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (dropped.id !== card.id) onDropTo?.(dropped.toColId || 'todo');
        } catch {}
      }}
    >
      {editing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => { onChange(title); setEditing(false); }}
          onKeyDown={handleKey}
          className="w-full px-2 py-1 border border-slate-300 rounded-md text-sm"
        />
      ) : (
        <button onClick={() => setEditing(true)} className="text-left w-full">
          <div className="font-medium text-slate-800">{title}</div>
        </button>
      )}
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1"><Tag size={14}/> {card.labels.join(', ')}</span>
        <span className="inline-flex items-center gap-1"><UserCircle2 size={14}/> {card.assignee}</span>
        <span className="inline-flex items-center gap-1"><Clock size={14}/> {card.due}</span>
      </div>
    </div>
  );
}

export default function Workspace() {
  const [tab, setTab] = useState('docs');

  return (
    <section id="workspace" className="flex-1">
      <div className="mb-3 flex items-center gap-2">
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          <button onClick={() => setTab('docs')} className={`px-3 py-1.5 text-sm rounded-full ${tab==='docs'?'bg-white shadow text-slate-900':'text-slate-600'}`}>Documents</button>
          <button onClick={() => setTab('plan')} className={`px-3 py-1.5 text-sm rounded-full ${tab==='plan'?'bg-white shadow text-slate-900':'text-slate-600'}`}>Planning</button>
        </div>
      </div>
      {tab === 'docs' ? <RichEditor /> : <KanbanBoard />}
    </section>
  );
}
