const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://ziyaadbeneydatoula.com";

export function welcomeEmailHtml(email: string, token: string) {
  const unsubscribeUrl = `${APP_URL}/unsubscribe?token=${token}`;

  return `
    <h1>Welcome to Zi’s Newsletter 👋</h1>
    <p>Hey ${email}, thanks for subscribing.</p>
    <p>You’ll receive updates, essays, thoughts, and more.</p>
    <p style="font-size:12px">Unsubscribe: <a href="${unsubscribeUrl}">${unsubscribeUrl}</a></p>
  `;
}

export function newsletterEmailHtml(contentHtml: string, token: string) {
  const unsubscribeUrl = `${APP_URL}/unsubscribe?token=${token}`;

  return `
    ${contentHtml}
    <hr/>
    <p style="font-size:12px">Unsubscribe: <a href="${unsubscribeUrl}">${unsubscribeUrl}</a></p>
  `;
}
