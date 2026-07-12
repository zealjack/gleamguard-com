import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirect bare /admin to the protected dashboard (which itself redirects
// to /admin/login if the user isn't authenticated).
export const Route = createFileRoute("/admin/")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/login" });
  },
  component: () => null,
});
