import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/become-a-partner")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", search: { type: "become-a-partner" } });
  },
  component: () => null,
});
