"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl text-center font-bold mb-10">
        <span className="text-primary text-7xl mb-10 ">404</span> <br /> Page
        Not Found
      </h1>
      <p className="text-gray-600 mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 rounded-lg font-bold hover:bg-primary/80 bg-primary text-primary-foreground transition-colors flex mb-4"
      >
        <ArrowLeftIcon className="w-6 h-6 mr-2" />
        Back to Home
      </button>
      <p className="text-gray-600 mb-4 text-center">
        If this is an error, please{" "}
        <a
          href="mailto:muzzammil12rafiq@gmail.com"
          className="text-primary hover:underline font-medium"
        >
          contact support
        </a>
        .
      </p>
    </div>
  );
}
