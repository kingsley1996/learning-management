import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WebVitalsReporter } from "./web-vitals";
import { Roboto } from "next/font/google";

// Định nghĩa font với hỗ trợ đầy đủ cho tiếng Việt
const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

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
      <html lang="vi" className={roboto.variable}>
        <body>
          <Providers>
            <Suspense fallback={null}>
              <div className="root-layout overflow-x-hidden">{children}</div>
            </Suspense>
            <WebVitalsReporter />
            <Toaster richColors closeButton />
          </Providers>
        </body>
        <GoogleAnalytics gaId="G-X8427M700F" />
      </html>
    </ClerkProvider>
  );
}
