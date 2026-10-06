import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Carnival Celebrations" },
    { name: "description", content: "Privacy Policy at Carnival Celebrations, premium gifting." },
    { property: "og:title", content: "Privacy Policy — Carnival Celebrations" },
    { property: "og:description", content: "Privacy Policy at Carnival Celebrations, premium gifting." },
  ] }),
  component: () => (<><PageHero title="Privacy Policy" /><Prose><p>This page is coming soon.</p></Prose></>),
});
