import { Metadata } from "next";
import "./globals.css";
import AppProviders from "~/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "Scaper",
  description: "Scaper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
