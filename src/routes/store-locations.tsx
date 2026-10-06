import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/store-locations")({
  head: () => ({ meta: [
    { title: "Store Locations — Carnival Celebrations" },
    { name: "description", content: "Store Locations at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Store Locations — Carnival Celebrations" },
    { property: "og:description", content: "Store Locations at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Store Locations" /><Prose><p>This page is coming soon.</p></Prose></>),
});
