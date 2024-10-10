import React from "react";

import AuthLayout from "@/components/Layout/Auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout type="sign-up">{children}</AuthLayout>;
}
