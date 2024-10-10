import React from "react";

import { UnverifiedLayout } from "@/components/Layout/Redirect";

export default function Template({ children }: { children: React.ReactNode }) {
  return <UnverifiedLayout>{children}</UnverifiedLayout>;
}
