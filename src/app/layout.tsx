import type { Metadata } from "next";
import "./globals.css";

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
        {/* <i className="material-icons">home</i>   */}
        {children}
      </body>
    </html>
  );
}
