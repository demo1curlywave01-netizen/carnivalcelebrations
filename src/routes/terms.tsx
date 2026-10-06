import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions — Carnival Celebrations" },
    { name: "description", content: "Terms & Conditions at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Terms & Conditions — Carnival Celebrations" },
    { property: "og:description", content: "Terms & Conditions at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Terms & Conditions" /><Prose><p>This page is coming soon.</p></Prose></>),
});
