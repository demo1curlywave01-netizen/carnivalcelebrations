import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wedding-gifting")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", search: { type: "wedding-gifting" } });
  },
  component: () => null,
});
