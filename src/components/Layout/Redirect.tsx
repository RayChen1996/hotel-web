"use client";

import React, { useCallback, useEffect } from "react";
import { redirect } from "next/navigation";
// NOTE zustand
import useTokenStore from "@/zustand/useTokenStore";

type LayoutProps = { children: React.ReactNode };
/** - 未驗證跳轉 */
export function UnverifiedLayout({ children }: LayoutProps) {
  const token = useTokenStore(useCallback((state) => state.token, []));
  useEffect(() => {
    const currentToken = useTokenStore.getState().token;
    const loggedIn = Boolean(currentToken);
    if (!loggedIn) {
      redirect("/sign-in");
    }
  }, [token]);

  return children;
}

/** - 已驗證跳轉 */
export function VerifiedLayout({ children }: LayoutProps) {
  const token = useTokenStore(useCallback((state) => state.token, []));
  useEffect(() => {
    const currentToken = useTokenStore.getState().token;
    const loggedIn = Boolean(currentToken);
    if (loggedIn) {
      redirect("/");
    }
  }, [token]);

  return children;
}
