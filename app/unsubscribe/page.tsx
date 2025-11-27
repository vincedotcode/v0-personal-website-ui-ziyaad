// app/unsubscribe/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function UnsubscribePage() {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setState("error");
      setMessage("Invalid unsubscribe link.");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setState("error");
          setMessage(data.error || "Unable to unsubscribe.");
          return;
        }

        setState("success");
        setMessage(
          "You’ve been unsubscribed. You won’t receive any more newsletters from this list."
        );
      } catch (err) {
        console.error(err);
        setState("error");
        setMessage("Network error. Please try again later.");
      }
    })();
  }, []);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-xl border bg-background/60 p-6 shadow-sm">
        {state === "loading" && (
          <p className="text-sm text-muted-foreground">Processing…</p>
        )}
        {state !== "loading" && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </main>
  );
}
