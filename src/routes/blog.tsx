import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog — Carnival Celebrations" },
    { name: "description", content: "Blog at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Blog — Carnival Celebrations" },
    { property: "og:description", content: "Blog at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Blog" /><Prose><p>This page is coming soon.</p></Prose></>),
});
