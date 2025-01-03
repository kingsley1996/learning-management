import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Code With Samuel",
  description: "Học lập trình dễ dàng cùng Samuel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>
            <Suspense fallback={null}>
              <div className="root-layout overflow-x-hidden">{children}</div>
            </Suspense>
            <Toaster richColors closeButton />
          </Providers>
        </body>
        <GoogleAnalytics gaId="G-X8427M700F" />
      </html>
    </ClerkProvider>
  );
}
