// src/app/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";  // or just "next-auth"
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}