import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bulk-purchase")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", search: { type: "bulk-purchase" } });
  },
  component: () => null,
});
