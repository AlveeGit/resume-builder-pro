// page.tsx
"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  const supabase = createClient();

  const signIn = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/builder`,
      },
    });
  };

  return (
    <div className="w-full max-w-md px-4">
      <Card className="shadow-xl border border-border">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            ResumeBuilder ⚡
          </h1>
          <p className="text-sm text-muted-foreground">
            Build region-perfect resumes with AI precision
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          <Button className="w-full" onClick={() => signIn("google")}>
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("github")}
          >
            Continue with GitHub
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-3">
            By continuing, you agree to our terms and privacy policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
