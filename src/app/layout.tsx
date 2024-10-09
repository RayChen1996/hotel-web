import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/Layout/AppHeader";
import AppFooter from "@/components/Layout/AppFooter";
export const metadata: Metadata = {
  title: "旅館訂房網站",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body>
        <div className=" flex flex-col ">
          <AppHeader />
          <main className=" min-h-dvh flex-1">{children}</main>

          <AppFooter />
        </div>

        {/* <i className="material-icons">home</i>   */}
      </body>
    </html>
  );
}
