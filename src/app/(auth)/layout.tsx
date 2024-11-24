import React from "react";
import Logo from "~/components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Logo />
      {children}
    </div>
  );
}
