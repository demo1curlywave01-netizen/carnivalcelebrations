import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [
    { title: "My Account — Carnival Celebrations" },
    { name: "description", content: "My Account at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "My Account — Carnival Celebrations" },
    { property: "og:description", content: "My Account at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="My Account" /><Prose><p>This page is coming soon.</p></Prose></>),
});
