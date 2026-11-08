import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevConnect",
  description:
    "A secure platform connecting independent developers with clients seeking technical services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
