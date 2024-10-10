// import clsx from "clsx";
// import Image from "next/image";
import React, { useMemo } from "react";

// import logoSvg from "../../../public/logo.svg";

export type AuthLayoutProps = {
  /**
   * - `layout`用途
   *    - `sign-in`: 登入
   *    - `sign-up`: 註冊
   *    - `forget-password`: 忘記密碼
   * */
  type: "sign-in" | "sign-up" | "forget-password";
  children: React.ReactNode;
};

export default function AuthLayout({
  type = "sign-in",
  children,
}: {
  type: "sign-in" | "sign-up" | "forget-password";
  children: React.ReactNode;
}) {
  const _renderBackground = useMemo(() => {
    switch (type) {
      case "sign-in":
      default:
        return <SignInBackgroundBlock />;
      case "forget-password":
        return null;
      case "sign-up":
        return <SignInBackgroundBlock />;
    }
  }, [type]);
  return (
    <div className="h-screen flex max-lg:flex-col">
      <div className="flex-1 bg-slate-100 max-lg:basis-[160px] max-lg:flex-none">
        {_renderBackground}
      </div>
      <div className="flex flex-1 flex-col h-screen overflow-y-auto justify-center p-4 max-lg:p-0 max-lg:justify-start">
        {children}
      </div>
    </div>
  );
}

function SignInBackgroundBlock() {
  return (
    <div className="h-full bg-center bg-[url('/photo.jpg')] bg-cover relative"></div>
  );
}
