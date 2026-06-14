import { Star } from "lucide-react";
import { FEATURED_RESOURCES } from "@/config/resources-data";
import { ResourceCard } from "./ResourceCard";

export function FeaturedResources() {
  return (
    <section className="container mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <div className="flex items-center gap-2 mb-5">
        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
        <h2 className="text-base font-semibold">Most Popular</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_RESOURCES.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
    </section>
  );
}
