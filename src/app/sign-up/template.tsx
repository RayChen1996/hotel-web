import React from "react";

import { VerifiedLayout } from "@/components/Layout/Redirect";

export default function Template({ children }: { children: React.ReactNode }) {
  return <VerifiedLayout>{children}</VerifiedLayout>;
}
