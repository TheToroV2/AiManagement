import { QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import QueryProvider from "./providers/QueryProvider";


export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
