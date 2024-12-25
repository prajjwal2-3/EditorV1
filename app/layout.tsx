import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import QueryProvider from "@/providers/query-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EditorV1",
  description: "created by prajjwal sharma",
};
const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <QueryProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
       {children}
      
      </body>
      </QueryProvider>
    </html>
  );
}
