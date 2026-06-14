import { TEACHING_PILLARS } from "@/config/faculty-data";

export function TeachingApproach() {
  return (
    <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Teaching Philosophy</h2>
        <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          Four principles that define every class, every explanation, every question solved.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TEACHING_PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="group rounded-2xl border bg-card/60 p-6 hover:border-primary/40 hover:bg-card/90 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl group-hover:bg-primary/20 transition-colors">
                {pillar.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
