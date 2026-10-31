import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/corporate-gifting")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", search: { type: "corporate-gifting" } });
  },
  component: () => null,
});
