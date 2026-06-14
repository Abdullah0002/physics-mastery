import { ACHIEVEMENTS } from "@/config/faculty-data";

export function AchievementCards() {
  return (
    <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Achievements</h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-lg mx-auto">
          Milestones earned through consistent student success.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((ach) => (
          <div
            key={ach.title}
            className="group rounded-2xl border bg-card/60 p-5 flex items-start gap-4 hover:border-primary/40 hover:bg-card/90 transition-all"
          >
            <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-2xl group-hover:bg-primary/20 transition-colors">
              {ach.emoji}
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">{ach.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
