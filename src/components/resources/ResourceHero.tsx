import { BookOpen, ClipboardList, FileText, Network, Download } from "lucide-react";
import { RESOURCE_STATS, formatDownloadCount } from "@/config/resources-data";

const STAT_ITEMS = [
  { icon: BookOpen, label: "Notes PDFs", value: String(RESOURCE_STATS.notesPdfs), color: "text-blue-600 dark:text-blue-400 bg-blue-500/10" },
  { icon: ClipboardList, label: "DPP Sets", value: String(RESOURCE_STATS.dpps), color: "text-amber-600 dark:text-amber-400 bg-amber-500/10" },
  { icon: FileText, label: "Formula Sheets", value: String(RESOURCE_STATS.formulaSheets), color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" },
  { icon: Network, label: "Mind Maps", value: String(RESOURCE_STATS.mindMaps), color: "text-purple-600 dark:text-purple-400 bg-purple-500/10" },
];

export function ResourceHero() {
  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-20 flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5">
          <Download className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {formatDownloadCount(RESOURCE_STATS.totalDownloads)} total downloads
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Resource Center
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Download free PDFs, Daily Practice Problems, formula sheets, and mind maps — meticulously prepared for JEE Main, JEE Advanced, and NEET Physics.
          </p>
        </div>

        {/* Type stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full max-w-2xl">
          {STAT_ITEMS.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="rounded-2xl border bg-card/60 p-4 flex flex-col items-center gap-2"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-extrabold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
