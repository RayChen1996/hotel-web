import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/Layout/AppHeader";
import AppFooter from "@/components/Layout/AppFooter";
import AOSProvider from "@/provider/AOS";
import QueryClientProvider from "@/provider/QueryClient";
import { Toaster } from "react-hot-toast";

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
      </head>
      <body>
        <div className="flex flex-col">
          <AppHeader />
          <main className="min-h-dvh flex-1 bg-white">
            <AOSProvider>
              <QueryClientProvider>{children}</QueryClientProvider>
            </AOSProvider>
            <Toaster />
          </main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
