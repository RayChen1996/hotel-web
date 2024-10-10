"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  // useEffect(() => {}, []);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
