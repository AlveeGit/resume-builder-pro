// layout.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🚀 Already logged in → send to builder
  if (user) {
    redirect("/builder");
  }

  return (
    <div className="">
    {/* <div className="min-h-screen flex items-center justify-center bg-background"> */}
      {children}
    </div>
  );
}