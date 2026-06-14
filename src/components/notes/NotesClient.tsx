"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Plus, Search, Pencil, Trash2, BookOpen, Zap,
  FlaskConical, StickyNote, X, Check, Clock, ChevronDown,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type NoteType = "chapter" | "question" | "formula" | "general";
export type NoteColor = "yellow" | "blue" | "green" | "pink" | "purple" | "slate";

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  attachedTo?: { id: string; title: string; slug?: string };
  color: NoteColor;
  createdAt: string;
  updatedAt: string;
}

// ─── Storage ────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "abd-notes-v1";

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Note[]) : [];
  } catch { return []; }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ─── Constants ──────────────────────────────────────────────────────────────────

const COLOR_STYLES: Record<NoteColor, { card: string; badge: string; dot: string }> = {
  yellow: { card: "border-yellow-300/60 bg-yellow-50/60 dark:bg-yellow-900/10", badge: "bg-yellow-200 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300", dot: "bg-yellow-400" },
  blue:   { card: "border-blue-300/60   bg-blue-50/60   dark:bg-blue-900/10",   badge: "bg-blue-200   text-blue-800   dark:bg-blue-800/30   dark:text-blue-300",   dot: "bg-blue-400"   },
  green:  { card: "border-green-300/60  bg-green-50/60  dark:bg-green-900/10",  badge: "bg-green-200  text-green-800  dark:bg-green-800/30  dark:text-green-300",  dot: "bg-green-400"  },
  pink:   { card: "border-pink-300/60   bg-pink-50/60   dark:bg-pink-900/10",   badge: "bg-pink-200   text-pink-800   dark:bg-pink-800/30   dark:text-pink-300",   dot: "bg-pink-400"   },
  purple: { card: "border-purple-300/60 bg-purple-50/60 dark:bg-purple-900/10", badge: "bg-purple-200 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300", dot: "bg-purple-400" },
  slate:  { card: "border-slate-200     bg-card/60",                            badge: "bg-muted       text-muted-foreground",                                      dot: "bg-slate-400"  },
};

const ALL_COLORS: NoteColor[] = ["yellow", "blue", "green", "pink", "purple", "slate"];

const TYPE_META: Record<NoteType, { label: string; icon: React.ReactNode; href: (n: Note) => string }> = {
  chapter:  { label: "Chapter",  icon: <BookOpen   className="h-3 w-3" />, href: (n) => `/chapters/${n.attachedTo?.slug ?? n.attachedTo?.id ?? ""}/theory` },
  question: { label: "Question", icon: <Zap        className="h-3 w-3" />, href: (n) => `/chapters/${n.attachedTo?.slug ?? ""}/practice` },
  formula:  { label: "Formula",  icon: <FlaskConical className="h-3 w-3" />, href: (n) => `/chapters/${n.attachedTo?.slug ?? ""}/formulas` },
  general:  { label: "General",  icon: <StickyNote className="h-3 w-3" />, href: ()  => "#" },
};

// ─── Relative time ──────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)   return "just now";
  if (mins  < 60)  return `${mins}m ago`;
  if (hours < 24)  return `${hours}h ago`;
  if (days  < 30)  return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

// ─── Auto-resize textarea ───────────────────────────────────────────────────────

function AutoTextarea({
  value,
  onChange,
  placeholder,
  className,
  minRows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  minRows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, minRows * 24)}px`;
  }, [value, minRows]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={minRows}
      className={`w-full resize-none bg-transparent focus:outline-none ${className ?? ""}`}
    />
  );
}

// ─── Color picker ───────────────────────────────────────────────────────────────

function ColorPicker({ value, onChange }: { value: NoteColor; onChange: (c: NoteColor) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {ALL_COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          title={c}
          className={`h-4 w-4 rounded-full transition-transform hover:scale-125 ${COLOR_STYLES[c].dot}
            ${value === c ? "ring-2 ring-offset-1 ring-foreground/40 scale-125" : ""}`}
        />
      ))}
    </div>
  );
}

// ─── Note editor modal ──────────────────────────────────────────────────────────

function NoteEditor({
  initial,
  onSave,
  onClose,
}: {
  initial?: Partial<Note>;
  onSave: (n: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
}) {
  const [title,   setTitle]   = useState(initial?.title   ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [type,    setType]    = useState<NoteType>(initial?.type ?? "general");
  const [color,   setColor]   = useState<NoteColor>(initial?.color ?? "yellow");

  const canSave = title.trim() || content.trim();

  const handleSave = () => {
    if (!canSave) return;
    onSave({ title: title.trim() || "Untitled", content, type, color, attachedTo: initial?.attachedTo });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`relative w-full max-w-xl rounded-2xl border p-5 shadow-2xl ${COLOR_STYLES[color].card} backdrop-blur`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title…"
            className="flex-1 bg-transparent text-base font-semibold placeholder:text-muted-foreground/50 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Type selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(["general", "chapter", "question", "formula"] as NoteType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors
                ${type === t ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              {TYPE_META[t].icon}
              {TYPE_META[t].label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AutoTextarea
          value={content}
          onChange={setContent}
          placeholder="Write your note here…"
          minRows={5}
          className="text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 mb-4"
        />

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">
          <ColorPicker value={color} onChange={setColor} />
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-bold text-background hover:opacity-80 transition-opacity disabled:opacity-30"
          >
            <Check className="h-3.5 w-3.5" />
            Save note
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Note card ──────────────────────────────────────────────────────────────────

function NoteCard({
  note,
  onEdit,
  onDelete,
}: {
  note: Note;
  onEdit: (n: Note) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const styles = COLOR_STYLES[note.color];
  const meta   = TYPE_META[note.type];
  const isLong = note.content.length > 200;

  return (
    <div className={`group rounded-xl border p-4 transition-all hover:shadow-md ${styles.card}`}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${styles.badge}`}>
            {meta.icon}
            {meta.label}
          </span>
          {note.attachedTo && (
            <span className="text-[11px] text-muted-foreground truncate max-w-[160px]">
              {note.attachedTo.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(note)} className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors" title="Edit">
            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <button onClick={() => onDelete(note.id)} className="rounded p-1 hover:bg-destructive/10 transition-colors" title="Delete">
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm mb-1.5">{note.title}</h3>

      {/* Content */}
      {note.content && (
        <div>
          <p className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap ${!expanded && isLong ? "line-clamp-4" : ""}`}>
            {note.content}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 flex items-center gap-0.5 text-[11px] text-muted-foreground/70 hover:text-muted-foreground transition-colors"
            >
              <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
          <Clock className="h-3 w-3" />
          {relativeTime(note.updatedAt)}
        </span>
        {note.attachedTo && note.type !== "general" && (
          <Link
            href={meta.href(note)}
            className="text-[11px] text-muted-foreground/60 hover:text-primary transition-colors"
          >
            Go to {note.type} →
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Demo seed ──────────────────────────────────────────────────────────────────

const DEMO_NOTES: Note[] = [
  {
    id: "demo-1",
    title: "Kinematics — Key Equations",
    content: "v = u + at\ns = ut + ½at²\nv² = u² + 2as\n\nRemember: these only apply for UNIFORM acceleration. For non-uniform, integrate the velocity-time graph.",
    type: "chapter",
    attachedTo: { id: "kinematics", title: "Kinematics", slug: "kinematics" },
    color: "yellow",
    createdAt: new Date(Date.now() - 2 * 86400_000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400_000).toISOString(),
  },
  {
    id: "demo-2",
    title: "Doubt: sign convention for EMF",
    content: "When the loop area decreases, flux decreases → dΦ/dt is negative → EMF is positive (Lenz's law). Confused in Q3 of DPP, revisit this.",
    type: "question",
    attachedTo: { id: "electromagnetic-induction", title: "Electromagnetic Induction", slug: "electromagnetic-induction" },
    color: "pink",
    createdAt: new Date(Date.now() - 86400_000).toISOString(),
    updatedAt: new Date(Date.now() - 86400_000).toISOString(),
  },
  {
    id: "demo-3",
    title: "Coulomb's Law — remember ε₀",
    content: "k = 1/(4πε₀) = 9×10⁹ N·m²/C². In medium: k_m = k/εᵣ. Always check if medium is air or not!",
    type: "formula",
    attachedTo: { id: "electrostatics", title: "Electrostatics", slug: "electrostatics" },
    color: "blue",
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
  },
  {
    id: "demo-4",
    title: "JEE strategy note",
    content: "Attempt Mechanics first (30% of paper), then Electrodynamics. Skip lengthy paragraph questions in first pass — come back with remaining time.",
    type: "general",
    color: "green",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    updatedAt: new Date(Date.now() - 7200_000).toISOString(),
  },
];

// ─── Main component ─────────────────────────────────────────────────────────────

type FilterType = NoteType | "all";

export function NotesClient() {
  const [notes,    setNotes]    = useState<Note[]>([]);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState<FilterType>("all");
  const [editing,  setEditing]  = useState<Note | null>(null);
  const [creating, setCreating] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = loadNotes();
    if (stored.length === 0) {
      // First visit: seed demo notes
      setNotes(DEMO_NOTES);
      saveNotes(DEMO_NOTES);
    } else {
      setNotes(stored);
    }
  }, []);

  const persist = (updated: Note[]) => {
    setNotes(updated);
    saveNotes(updated);
  };

  const handleCreate = useCallback((data: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newNote: Note = { ...data, id: genId(), createdAt: now, updatedAt: now };
    persist([newNote, ...notes]);
    setCreating(false);
  }, [notes]);

  const handleUpdate = useCallback((data: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    if (!editing) return;
    const updated = notes.map((n) =>
      n.id === editing.id
        ? { ...n, ...data, updatedAt: new Date().toISOString() }
        : n
    );
    persist(updated);
    setEditing(null);
  }, [editing, notes]);

  const handleDelete = useCallback((id: string) => {
    persist(notes.filter((n) => n.id !== id));
  }, [notes]);

  // Filter + search
  const displayed = useMemo(() => {
    let result = notes;
    if (filter !== "all") result = result.filter((n) => n.type === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          (n.attachedTo?.title ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [notes, filter, search]);

  const counts: Record<FilterType, number> = {
    all:      notes.length,
    chapter:  notes.filter((n) => n.type === "chapter").length,
    question: notes.filter((n) => n.type === "question").length,
    formula:  notes.filter((n) => n.type === "formula").length,
    general:  notes.filter((n) => n.type === "general").length,
  };

  const FILTERS: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: "all",      label: "All",      icon: <StickyNote  className="h-3 w-3" /> },
    { key: "chapter",  label: "Chapters", icon: <BookOpen    className="h-3 w-3" /> },
    { key: "question", label: "Questions",icon: <Zap         className="h-3 w-3" /> },
    { key: "formula",  label: "Formulas", icon: <FlaskConical className="h-3 w-3" /> },
    { key: "general",  label: "General",  icon: <StickyNote  className="h-3 w-3" /> },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Notes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {notes.length === 0 ? "No notes yet" : `${notes.length} note${notes.length !== 1 ? "s" : ""} across chapters, questions, and formulas`}
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Note
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search notes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground">
            Clear
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors
              ${filter === key
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {icon}
            {label}
            <span className={`rounded-full px-1.5 py-0 text-[10px] font-bold leading-5
              ${filter === key ? "bg-background/20" : "bg-background/60"}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Notes grid */}
      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-20 text-center">
          <StickyNote className="h-10 w-10 text-muted-foreground/30" />
          <div>
            <p className="font-semibold text-muted-foreground">
              {search ? "No notes match your search" : "No notes yet"}
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              {search ? "Try a different keyword" : "Create your first note to start capturing insights"}
            </p>
          </div>
          {!search && (
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create a note
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {creating && (
        <NoteEditor onSave={handleCreate} onClose={() => setCreating(false)} />
      )}
      {editing && (
        <NoteEditor
          initial={editing}
          onSave={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
