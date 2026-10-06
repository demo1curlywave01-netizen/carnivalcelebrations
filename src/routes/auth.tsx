import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign In — Carnival Celebrations" },
    { name: "description", content: "Sign In at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Sign In — Carnival Celebrations" },
    { property: "og:description", content: "Sign In at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Sign In" /><Prose><p>This page is coming soon.</p></Prose></>),
});
