// app/zi-admin/newsletter/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const ADMIN_TOKEN_STORAGE_KEY = "newsletter_admin_token";

type Subscriber = {
  id: number;
  email: string;
  is_subscribed: boolean;
  created_at: string;
};

type Campaign = {
  id: string;
  slug: string;
  subject: string;
  status: string;
  created_at: string;
  sent_at: string | null;
};

export default function NewsletterAdminPage() {
  const [adminToken, setAdminToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);

  const [newSlug, setNewSlug] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newHtml, setNewHtml] = useState("");
  const [creating, setCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState<string | null>(null);

  const [sendLoadingId, setSendLoadingId] = useState<string | null>(null);
  const [sendMessage, setSendMessage] = useState<string | null>(null);

  // Load token from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
    if (stored) {
      setAdminToken(stored);
      setTokenInput(stored);
    }
  }, []);

  const handleLogin = () => {
    if (!tokenInput.trim()) {
      setAuthError("Token required.");
      return;
    }
    setAdminToken(tokenInput.trim());
    setAuthError(null);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, tokenInput.trim());
    }
  };

  const handleLogout = () => {
    setAdminToken("");
    setTokenInput("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    }
  };

  async function fetchSubscribers() {
    if (!adminToken) return;
    setSubsLoading(true);
    try {
      const res = await fetch("/api/newsletter/subscribers", {
        headers: {
          "X-NEWSLETTER-ADMIN-TOKEN": adminToken,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Failed to load subscribers.");
        return;
      }

      setSubscribers(data.subscribers || []);
      setAuthError(null);
    } catch (err) {
      console.error(err);
      setAuthError("Network error while loading subscribers.");
    } finally {
      setSubsLoading(false);
    }
  }

  async function fetchCampaigns() {
    if (!adminToken) return;
    setCampaignsLoading(true);
    try {
      const res = await fetch("/api/newsletter/campaigns", {
        headers: {
          "X-NEWSLETTER-ADMIN-TOKEN": adminToken,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Failed to load campaigns.");
        return;
      }

      setCampaigns(data.campaigns || []);
      setAuthError(null);
    } catch (err) {
      console.error(err);
      setAuthError("Network error while loading campaigns.");
    } finally {
      setCampaignsLoading(false);
    }
  }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    setCreating(true);
    setCreateMessage(null);

    try {
      const res = await fetch("/api/newsletter/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-NEWSLETTER-ADMIN-TOKEN": adminToken,
        },
        body: JSON.stringify({
          slug: newSlug,
          subject: newSubject,
          html: newHtml,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCreateMessage(data.error || "Failed to create campaign.");
        return;
      }

      setCreateMessage("Campaign created.");
      setNewSlug("");
      setNewSubject("");
      setNewHtml("");
      // Refresh campaigns
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      setCreateMessage("Network error while creating campaign.");
    } finally {
      setCreating(false);
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    if (!adminToken) return;
    setSendLoadingId(campaignId);
    setSendMessage(null);

    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-NEWSLETTER-ADMIN-TOKEN": adminToken,
        },
        body: JSON.stringify({ campaignId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSendMessage(data.error || "Failed to send campaign.");
        return;
      }

      setSendMessage(
        `Sent: ${data.sentCount} / ${data.total}. Failed: ${data.failCount}.`
      );
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      setSendMessage("Network error while sending campaign.");
    } finally {
      setSendLoadingId(null);
    }
  };

  if (!adminToken) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Newsletter Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the admin token configured in{" "}
              <code className="text-xs bg-muted px-1 rounded">
                NEWSLETTER_ADMIN_TOKEN
              </code>{" "}
              to manage subscribers and campaigns.
            </p>
            <Input
              type="password"
              placeholder="Admin token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
            {authError && (
              <p className="text-xs text-destructive font-medium">
                {authError}
              </p>
            )}
            <Button className="w-full" onClick={handleLogin}>
              Continue
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] px-4 py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Newsletter Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage subscribers and campaigns for Zi’s newsletter.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {authError && (
            <p className="text-xs text-destructive font-medium">{authError}</p>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="subscribers">
        <TabsList>
          <TabsTrigger value="subscribers" onClick={fetchSubscribers}>
            Subscribers
          </TabsTrigger>
          <TabsTrigger value="campaigns" onClick={fetchCampaigns}>
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="new">New Campaign</TabsTrigger>
        </TabsList>

        {/* Subscribers tab */}
        <TabsContent value="subscribers" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Subscribers
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSubscribers}
                disabled={subsLoading}
              >
                {subsLoading ? "Refreshing…" : "Refresh"}
              </Button>
            </CardHeader>
            <CardContent>
              {subsLoading && subscribers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : subscribers.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No subscribers found yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b">
                        <th className="text-left py-2 pr-2">Email</th>
                        <th className="text-left py-2 pr-2">Status</th>
                        <th className="text-left py-2 pr-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((s) => (
                        <tr key={s.id} className="border-b last:border-none">
                          <td className="py-2 pr-2">{s.email}</td>
                          <td className="py-2 pr-2">
                            {s.is_subscribed ? (
                              <Badge variant="default" className="text-[11px]">
                                Subscribed
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-[11px]"
                              >
                                Unsubscribed
                              </Badge>
                            )}
                          </td>
                          <td className="py-2 pr-2 text-xs text-muted-foreground">
                            {new Date(s.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns tab */}
        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Campaigns
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchCampaigns}
                disabled={campaignsLoading}
              >
                {campaignsLoading ? "Refreshing…" : "Refresh"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {sendMessage && (
                <p className="text-xs text-muted-foreground">{sendMessage}</p>
              )}

              {campaignsLoading && campaigns.length === 0 ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : campaigns.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No campaigns created yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {campaigns.map((c) => (
                    <div
                      key={c.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-md px-3 py-2 gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {c.subject}
                          </span>
                          <Badge
                            variant={
                              c.status === "sent"
                                ? "default"
                                : c.status === "sending"
                                ? "outline"
                                : "secondary"
                            }
                            className="text-[11px]"
                          >
                            {c.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          slug: <code>{c.slug}</code>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created:{" "}
                          {new Date(c.created_at).toLocaleString("en-GB")}
                          {c.sent_at &&
                            ` • Sent: ${new Date(
                              c.sent_at
                            ).toLocaleString("en-GB")}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={c.status === "sent" || !!sendLoadingId}
                          onClick={() => handleSendCampaign(c.id)}
                        >
                          {sendLoadingId === c.id
                            ? "Sending…"
                            : c.status === "sent"
                            ? "Already sent"
                            : "Send now"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* New campaign tab */}
        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Create New Campaign
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleCreateCampaign}
                className="space-y-4 max-w-xl"
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Slug
                  </label>
                  <Input
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="e.g. 2025-jan-vision-update"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Subject
                  </label>
                  <Input
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Email subject line"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    HTML Content
                  </label>
                  <Textarea
                    required
                    value={newHtml}
                    onChange={(e) => setNewHtml(e.target.value)}
                    rows={12}
                    placeholder="<h1>Title</h1><p>Body…</p>"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Write raw HTML here. The unsubscribe footer will be added
                    automatically.
                  </p>
                </div>

                {createMessage && (
                  <p className="text-xs text-muted-foreground">
                    {createMessage}
                  </p>
                )}

                <Button type="submit" disabled={creating}>
                  {creating ? "Creating…" : "Create campaign"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
