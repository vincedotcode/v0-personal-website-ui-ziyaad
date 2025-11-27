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

type SummaryStats = {
  total: number;
  active: number;
  unsubscribed: number;
};

type ResumeResource = {
  id: number;
  label: string;
  url: string;
  created_at: string;
};

export default function ZiAdminPage() {
  const [adminToken, setAdminToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Summary
  const [summary, setSummary] = useState<SummaryStats | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);

  // Campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [sendLoadingId, setSendLoadingId] = useState<string | null>(null);
  const [sendMessage, setSendMessage] = useState<string | null>(null);

  // New campaign
  const [newSlug, setNewSlug] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newHtml, setNewHtml] = useState("");
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const [createCampaignMessage, setCreateCampaignMessage] =
    useState<string | null>(null);

  // Resume resources
  const [resumeResources, setResumeResources] = useState<ResumeResource[]>([]);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeLabel, setResumeLabel] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeMessage, setResumeMessage] = useState<string | null>(null);

  // Load token from localStorage and eagerly hydrate data
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
    if (stored) {
      setAdminToken(stored);
      setTokenInput(stored);
    }
  }, []);

  // When token is present, load all dashboard data once
  useEffect(() => {
    if (!adminToken) return;
    fetchSummary();
    fetchSubscribers();
    fetchCampaigns();
    fetchResumeResources();
  }, [adminToken]);

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
    setAuthError(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    }
  };

  // -------- API calls (with token) --------

  async function fetchSummary() {
    if (!adminToken) return;
    setSummaryLoading(true);
    try {
      const res = await fetch("/api/zi-admin/summary", {
        headers: { "X-NEWSLETTER-ADMIN-TOKEN": adminToken },
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Failed to load summary.");
        return;
      }
      setSummary(data.stats);
      setAuthError(null);
    } catch (err) {
      console.error(err);
      setAuthError("Network error while loading summary.");
    } finally {
      setSummaryLoading(false);
    }
  }

  async function fetchSubscribers() {
    if (!adminToken) return;
    setSubsLoading(true);
    try {
      const res = await fetch("/api/newsletter/subscribers", {
        headers: { "X-NEWSLETTER-ADMIN-TOKEN": adminToken },
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
        headers: { "X-NEWSLETTER-ADMIN-TOKEN": adminToken },
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

  async function fetchResumeResources() {
    if (!adminToken) return;
    setResumeLoading(true);
    try {
      const res = await fetch("/api/zi-admin/resume-resources", {
        headers: { "X-NEWSLETTER-ADMIN-TOKEN": adminToken },
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Failed to load resume resources.");
        return;
      }
      setResumeResources(data.resources || []);
      setAuthError(null);
    } catch (err) {
      console.error(err);
      setAuthError("Network error while loading resume resources.");
    } finally {
      setResumeLoading(false);
    }
  }

  // Create campaign
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    setCreatingCampaign(true);
    setCreateCampaignMessage(null);

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
        setCreateCampaignMessage(data.error || "Failed to create campaign.");
        return;
      }

      setCreateCampaignMessage("Campaign created.");
      setNewSlug("");
      setNewSubject("");
      setNewHtml("");
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      setCreateCampaignMessage("Network error while creating campaign.");
    } finally {
      setCreatingCampaign(false);
    }
  };

  // Send campaign
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

  // Resume resource create
  const handleAddResumeResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    setResumeMessage(null);

    try {
      const res = await fetch("/api/zi-admin/resume-resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-NEWSLETTER-ADMIN-TOKEN": adminToken,
        },
        body: JSON.stringify({
          label: resumeLabel,
          url: resumeUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResumeMessage(data.error || "Failed to add resume resource.");
        return;
      }

      setResumeMessage("Resume link saved.");
      setResumeLabel("");
      setResumeUrl("");
      fetchResumeResources();
    } catch (err) {
      console.error(err);
      setResumeMessage("Network error while saving resume resource.");
    }
  };

  // Resume resource delete
  const handleDeleteResumeResource = async (id: number) => {
    if (!adminToken) return;
    setResumeMessage(null);

    try {
      const res = await fetch("/api/zi-admin/resume-resources", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-NEWSLETTER-ADMIN-TOKEN": adminToken,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) {
        setResumeMessage(data.error || "Failed to delete resume resource.");
        return;
      }

      setResumeMessage("Deleted.");
      setResumeResources((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      setResumeMessage("Network error while deleting resume resource.");
    }
  };

  // -------- UI --------

  if (!adminToken) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Zi Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the admin token configured in{" "}
              <code className="text-xs bg-muted px-1 rounded">
                NEWSLETTER_ADMIN_TOKEN
              </code>{" "}
              to access the dashboard.
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
    <main className="min-h-[80vh] px-4 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Zi Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage newsletter, subscribers, and resume links.
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

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="new">New Campaign</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
        </TabsList>

        {/* Overview tab */}
        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total subscribers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {summaryLoading
                    ? "…"
                    : summary
                    ? summary.total
                    : "Tap Overview"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {summaryLoading
                    ? "…"
                    : summary
                    ? summary.active
                    : "Tap Overview"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Unsubscribed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {summaryLoading
                    ? "…"
                    : summary
                    ? summary.unsubscribed
                    : "Tap Overview"}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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
                    rows={10}
                    placeholder="<h1>Title</h1><p>Body…</p>"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Write raw HTML here. Unsubscribe footer is added separately
                    in the send API.
                  </p>
                </div>

                {createCampaignMessage && (
                  <p className="text-xs text-muted-foreground">
                    {createCampaignMessage}
                  </p>
                )}

                <Button type="submit" disabled={creatingCampaign}>
                  {creatingCampaign ? "Creating…" : "Create campaign"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resume tab */}
        <TabsContent value="resume" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Resume Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form
                onSubmit={handleAddResumeResource}
                className="space-y-3 max-w-xl"
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Label
                  </label>
                  <Input
                    required
                    value={resumeLabel}
                    onChange={(e) => setResumeLabel(e.target.value)}
                    placeholder="e.g. Zi Resume – Product & Tech Lead"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    URL (Google Drive / public PDF link)
                  </label>
                  <Input
                    required
                    type="url"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                </div>
                {resumeMessage && (
                  <p className="text-xs text-muted-foreground">
                    {resumeMessage}
                  </p>
                )}
                <Button type="submit">Save resume link</Button>
                <p className="text-[11px] text-muted-foreground">
                  Upload your PDF to Google Drive (or any storage), make it
                  publicly accessible (view-only), and paste the link here.
                </p>
              </form>

              <div>
                <h2 className="text-sm font-semibold mb-2">
                  Existing resume links
                </h2>
                {resumeLoading && resumeResources.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : resumeResources.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No resume links saved yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {resumeResources.map((r) => (
                      <div
                        key={r.id}
                        className="flex justify-between items-center border rounded-md px-3 py-2 gap-2"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{r.label}</p>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 hover:underline break-all"
                          >
                            {r.url}
                          </a>
                          <p className="text-[11px] text-muted-foreground">
                            Added:{" "}
                            {new Date(r.created_at).toLocaleString("en-GB")}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteResumeResource(r.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
