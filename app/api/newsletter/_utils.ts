// app/api/newsletter/_utils.ts
import { NextRequest } from "next/server";

const ADMIN_TOKEN = process.env.NEWSLETTER_ADMIN_TOKEN;

export function assertAdmin(req: NextRequest) {
  if (!ADMIN_TOKEN) throw new Error("NEWSLETTER_ADMIN_TOKEN not configured.");

  const token = req.headers.get("x-newsletter-admin-token");
  if (!token || token !== ADMIN_TOKEN) {
    const err: any = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
}
