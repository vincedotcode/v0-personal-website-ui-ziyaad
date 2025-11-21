// app/cookies/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Ziyaad Ben Eydatoula",
  description:
    "Cookie Policy for ziyaadbeneydatoula.com, explaining how cookies and similar technologies are used on this website.",
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: November 19, 2025
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-foreground">
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              This Cookie Policy explains how Ziyaad Ben Eydatoula (&quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;) uses cookies and similar tracking
              technologies on our website{" "}
              <strong>ziyaadbeneydatoula.com</strong> (the &quot;Site&quot;). We are
              based in London, United Kingdom.
            </p>
            <p>
              By using our Site, you consent to the use of cookies in accordance with
              this Cookie Policy. If you do not agree to our use of cookies, you should
              change your browser settings accordingly or refrain from using our Site.
            </p>
          </section>

          {/* What Are Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device (computer,
              smartphone, or tablet) when you visit a website. Cookies are widely used to
              make websites work more efficiently and to provide information to website
              owners.
            </p>

            <h3 className="text-base font-semibold">Types of Cookies</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Session Cookies</strong> – Temporary cookies that are deleted
                when you close your browser. They help websites remember what you did on
                previous pages.
              </li>
              <li>
                <strong>Persistent Cookies</strong> – Cookies that remain on your device
                for a set period or until you delete them. They remember your preferences
                and actions across multiple visits.
              </li>
              <li>
                <strong>First-Party Cookies</strong> – Set by the website you&apos;re
                visiting (our Site).
              </li>
              <li>
                <strong>Third-Party Cookies</strong> – Set by external services we use
                (like Google Analytics or Calendly).
              </li>
            </ul>
          </section>

          {/* How We Use Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>

            <h3 className="text-base font-semibold">
              1. Essential Cookies (Strictly Necessary)
            </h3>
            <p>
              <strong>Purpose:</strong> Enable core website functionality.
            </p>
            <p>Examples:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Remember your consent preferences</li>
              <li>Maintain your session during form submission</li>
              <li>Security features (e.g., preventing CSRF attacks)</li>
            </ul>
            <p>
              <strong>Can you disable them?</strong> No – these are required for the Site
              to function properly.
            </p>
            <p>
              <strong>Duration:</strong> Session or up to 1 year.
            </p>

            <h3 className="text-base font-semibold">
              2. Analytics Cookies (Performance)
            </h3>
            <p>
              <strong>Purpose:</strong> Understand how visitors use our Site.
            </p>
            <p>
              <strong>Service:</strong> Google Analytics 4.
            </p>
            <p>Examples:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Track page views and navigation paths</li>
              <li>Measure time spent on pages</li>
              <li>Identify popular content</li>
              <li>Monitor website performance</li>
              <li>Detect and troubleshoot errors</li>
            </ul>
            <p>Information collected may include:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Pages visited</li>
              <li>Time on site</li>
              <li>Browser and device type</li>
              <li>Geographic location (city-level)</li>
              <li>Referral source (how you found us)</li>
              <li>Click data and scrolling behavior</li>
            </ul>
            <p>
              <strong>Can you disable them?</strong> Yes – via our consent banner or your
              browser settings.
            </p>
            <p>
              <strong>Duration:</strong> Up to 2 years.
            </p>
            <p>
              <strong>Third-party privacy policy:</strong>{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                https://policies.google.com/privacy
              </a>
            </p>

            <h3 className="text-base font-semibold">
              3. Functionality Cookies (Preference)
            </h3>
            <p>
              <strong>Purpose:</strong> Remember your choices and provide enhanced
              features.
            </p>
            <p>Examples:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Remember your cookie consent choice</li>
              <li>Store form progress (if you navigate away)</li>
              <li>Remember your preferred language (if applicable)</li>
            </ul>
            <p>
              <strong>Can you disable them?</strong> Yes, but some features may not work
              optimally.
            </p>
            <p>
              <strong>Duration:</strong> Up to 1 year.
            </p>

            <h3 className="text-base font-semibold">
              4. Marketing Cookies (Optional – Not Currently Used)
            </h3>
            <p>
              We do not currently use marketing or advertising cookies. If we decide to
              use them in the future, we will:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Update this Cookie Policy</li>
              <li>Request your explicit consent</li>
              <li>Provide clear opt-out mechanisms</li>
            </ul>
          </section>

          {/* Cookies We Use */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Cookies We Use</h2>

            <h3 className="text-base font-semibold">Our Website Cookies</h3>
            <div className="overflow-x-auto rounded-md border border-border/60">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Cookie Name</th>
                    <th className="px-3 py-2 text-left font-semibold">Purpose</th>
                    <th className="px-3 py-2 text-left font-semibold">Type</th>
                    <th className="px-3 py-2 text-left font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-3 py-2">analytics_consent</td>
                    <td className="px-3 py-2">
                      Stores your analytics consent choice
                    </td>
                    <td className="px-3 py-2">Preference</td>
                    <td className="px-3 py-2">1 year</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">session_id</td>
                    <td className="px-3 py-2">Maintains your session</td>
                    <td className="px-3 py-2">Essential</td>
                    <td className="px-3 py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-semibold">Google Analytics Cookies</h3>
            <div className="overflow-x-auto rounded-md border border-border/60">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Cookie Name</th>
                    <th className="px-3 py-2 text-left font-semibold">Purpose</th>
                    <th className="px-3 py-2 text-left font-semibold">Type</th>
                    <th className="px-3 py-2 text-left font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-3 py-2">_ga</td>
                    <td className="px-3 py-2">Distinguishes unique visitors</td>
                    <td className="px-3 py-2">Analytics</td>
                    <td className="px-3 py-2">2 years</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">_ga_*</td>
                    <td className="px-3 py-2">Maintains session state</td>
                    <td className="px-3 py-2">Analytics</td>
                    <td className="px-3 py-2">2 years</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">_gid</td>
                    <td className="px-3 py-2">Distinguishes users</td>
                    <td className="px-3 py-2">Analytics</td>
                    <td className="px-3 py-2">24 hours</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">_gat</td>
                    <td className="px-3 py-2">Throttles request rate</td>
                    <td className="px-3 py-2">Analytics</td>
                    <td className="px-3 py-2">1 minute</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground">
              Data collected: anonymous usage statistics, page views, session duration,
              bounce rate, referral source.
            </p>
            <p>
              <strong>IP Anonymization:</strong> We have enabled IP anonymization in
              Google Analytics, which means your IP address is truncated before being
              stored.
            </p>

            <h3 className="text-base font-semibold">
              Calendly Cookies (When Using Meeting Scheduler)
            </h3>
            <div className="overflow-x-auto rounded-md border border-border/60">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Cookie Name</th>
                    <th className="px-3 py-2 text-left font-semibold">Purpose</th>
                    <th className="px-3 py-2 text-left font-semibold">Type</th>
                    <th className="px-3 py-2 text-left font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-3 py-2">Calendly cookies</td>
                    <td className="px-3 py-2">
                      Manage meeting scheduling preferences
                    </td>
                    <td className="px-3 py-2">Functionality</td>
                    <td className="px-3 py-2">Per Calendly policy</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Third-party privacy policy:{" "}
              <a
                href="https://calendly.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                https://calendly.com/privacy
              </a>
            </p>
          </section>

          {/* Your Cookie Choices */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Your Cookie Choices</h2>
            <p>You have several options to manage cookies:</p>

            <h3 className="text-base font-semibold">1. Consent Banner</h3>
            <p>
              When you first visit our Site, you&apos;ll see a consent banner that allows
              you to:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Accept – Allow all cookies (essential + analytics).</li>
              <li>Decline – Allow only essential cookies.</li>
            </ul>
            <p>
              Your choice is saved for 1 year. You can change your preference at any time
              by clearing your browser cookies and revisiting the Site.
            </p>

            <h3 className="text-base font-semibold">2. Browser Settings</h3>
            <p>You can control cookies through your browser settings, for example:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Google Chrome:</strong> Settings → Privacy and security →
                Cookies and other site data.
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security →
                Cookies and Site Data.
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy.
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions
                → Cookies and site data.
              </li>
            </ul>
            <p>
              Note: Blocking all cookies may prevent you from using certain features of
              our Site.
            </p>

            <h3 className="text-base font-semibold">3. Opt-Out Tools</h3>
            <p>
              <strong>Google Analytics Opt-Out:</strong> You can install the Google
              Analytics Opt-out Browser Add-on:
            </p>
            <p>
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>
            <p>
              This prevents Google Analytics from tracking your activity across all
              websites, not just ours.
            </p>

            <h3 className="text-base font-semibold">4. Do Not Track (DNT)</h3>
            <p>
              Some browsers offer a &quot;Do Not Track&quot; (DNT) setting. Currently,
              there is no industry standard for how to respond to DNT signals. We do not
              currently respond to DNT signals, but we respect your choice to decline
              analytics cookies via our consent banner.
            </p>
          </section>

          {/* Third-Party Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Third-Party Cookies</h2>
            <p>We use third-party services that may set cookies:</p>

            <h3 className="text-base font-semibold">Google Analytics (Google LLC)</h3>
            <p>
              <strong>Purpose:</strong> Website analytics.
            </p>
            <p>Data collected: anonymous usage statistics.</p>
            <p>
              Privacy Policy:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                https://policies.google.com/privacy
              </a>
            </p>
            <p>
              Opt-out:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>
            <p>
              Google may also use this data for its own purposes (e.g., to improve Google
              services). For more information on how Google uses data, visit:{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                https://policies.google.com/technologies/partner-sites
              </a>
            </p>

            <h3 className="text-base font-semibold">Calendly (Calendly LLC)</h3>
            <p>
              <strong>Purpose:</strong> Meeting scheduling functionality.
            </p>
            <p>
              Privacy Policy:{" "}
              <a
                href="https://calendly.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                https://calendly.com/privacy
              </a>
            </p>
            <p>Cookies: Set only when you interact with the Calendly widget.</p>
          </section>

          {/* Mobile Devices */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Mobile Devices</h2>
            <p>
              Our Site may collect information through your mobile device, including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Device ID</li>
              <li>Operating system</li>
              <li>Mobile browser type</li>
              <li>Location data (if you permit)</li>
            </ul>
            <p>You can control these through your device settings, for example:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>iOS (iPhone/iPad):</strong> Settings → Privacy → Tracking, and
                Settings → Safari → Privacy &amp; Security.
              </li>
              <li>
                <strong>Android:</strong> Settings → Privacy → Ads, and browser settings
                for cookies and site data.
              </li>
            </ul>
          </section>

          {/* Other Tracking Technologies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Other Tracking Technologies</h2>
            <p>In addition to cookies, we may use:</p>

            <h3 className="text-base font-semibold">Web Beacons (Pixel Tags)</h3>
            <p>
              Small transparent images embedded in web pages or emails that track whether
              you&apos;ve viewed a page or opened an email, and the time and date of
              viewing.
            </p>
            <p>
              Used for: email campaign analytics (if you subscribe to our newsletter).
            </p>

            <h3 className="text-base font-semibold">Local Storage</h3>
            <p>
              Browser-based storage that allows websites to store data locally on your
              device.
            </p>
            <p>We use it for: storing your consent preferences.</p>
            <p>
              How to clear: use your browser&apos;s &quot;Clear browsing data&quot; or
              equivalent.
            </p>

            <h3 className="text-base font-semibold">Server Logs</h3>
            <p>
              Our web server automatically logs information such as IP address, browser
              type, pages accessed, date and time of access, and referring URL.
            </p>
            <p>
              Purpose: monitor performance, detect errors, and prevent security threats.
            </p>
          </section>

          {/* Cookies and Privacy Laws */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Cookies and Privacy Laws</h2>

            <h3 className="text-base font-semibold">
              UK PECR (Privacy and Electronic Communications Regulations)
            </h3>
            <p>
              We comply with the UK Privacy and Electronic Communications (EC Directive)
              Regulations 2003 (PECR), as amended.
            </p>
            <p>UK cookie consent requirements mean that we:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Obtain consent before placing non-essential cookies.</li>
              <li>Provide clear information about the cookies we use.</li>
              <li>Allow you to withdraw consent at any time.</li>
              <li>Do not require consent for essential cookies.</li>
            </ul>
            <p>Our compliance includes:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Consent banner on first visit.</li>
              <li>Clear cookie information provided.</li>
              <li>Opt-out mechanisms.</li>
              <li>Distinction between essential and non-essential cookies.</li>
            </ul>
            <p>
              UK Supervisory Authority:{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Information Commissioner&apos;s Office (ICO)
              </a>
              .
            </p>

            <h3 className="text-base font-semibold">GDPR (European Union)</h3>
            <p>
              If you&apos;re in the EU/EEA, we obtain your consent before setting
              non-essential cookies, you can withdraw consent at any time, and you have
              the right to object to cookie use.
            </p>

            <h3 className="text-base font-semibold">CCPA (California)</h3>
            <p>
              If you&apos;re in California, we do not sell your personal information.
              Analytics cookies do not constitute a &quot;sale&quot; under CCPA. You can
              opt-out of analytics cookies via our consent mechanisms.
            </p>

            <h3 className="text-base font-semibold">Other Jurisdictions</h3>
            <p>
              We comply with applicable privacy and cookie laws in all jurisdictions
              where we operate, including international data protection standards.
            </p>
          </section>

          {/* Updates */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy to reflect changes in our cookie practices,
              new cookies or tracking technologies, changes in applicable laws, or user
              feedback.
            </p>
            <p>When we make changes:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>We&apos;ll update the &quot;Last Updated&quot; date at the top.</li>
              <li>We may display a prominent notice on our Site.</li>
              <li>For significant changes, we may request renewed consent.</li>
            </ul>
          </section>

          {/* Impact of Disabling Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Impact of Disabling Cookies</h2>
            <p>If you disable cookies, you may experience:</p>

            <h3 className="text-base font-semibold">Essential Cookies Disabled:</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Contact form may not work properly.</li>
              <li>Consent preferences not saved.</li>
              <li>Security features may be impaired.</li>
            </ul>

            <h3 className="text-base font-semibold">Analytics Cookies Disabled:</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Site functions normally.</li>
              <li>We cannot improve user experience based on data.</li>
              <li>We cannot easily identify technical issues.</li>
            </ul>

            <h3 className="text-base font-semibold">All Cookies Disabled:</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>The Site may not function optimally.</li>
              <li>Some features may be unavailable.</li>
              <li>You may need to re-enter information more frequently.</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Children&apos;s Privacy</h2>
            <p>
              Our Site is not directed to children under 18. We do not knowingly use
              cookies to collect information from children.
            </p>
            <p>
              If you believe a child has provided information through our cookies, please
              contact us at{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline underline-offset-2"
              >
                zi@ziyaadbeneydatoula.com
              </a>
              .
            </p>
          </section>

          {/* Contact / Related Policies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Email:{" "}
                <a
                  href="mailto:zi@ziyaadbeneydatoula.com"
                  className="underline underline-offset-2"
                >
                  zi@ziyaadbeneydatoula.com
                </a>
              </li>
              <li>Subject: &quot;Cookie Policy Inquiry&quot;</li>
              <li>
                Website:{" "}
                <a
                  href="https://ziyaadbeneydatoula.com/touchbase"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  https://ziyaadbeneydatoula.com/touchbase
                </a>
              </li>
            </ul>
            <p>We aim to respond within 48 hours (business days).</p>

            <h3 className="text-base font-semibold">Related Policies</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <a href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </a>{" "}
                – How we collect, use, and protect your personal information.
              </li>
              <li>
                <a href="/terms" className="underline underline-offset-2">
                  Terms of Use
                </a>{" "}
                – Rules for using our Site.
              </li>
            </ul>
          </section>

          {/* Consent / Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Consent</h2>
            <p>
              By using our Site and accepting cookies via our consent banner, you consent
              to the use of cookies as described in this Cookie Policy. To withdraw
              consent, clear your cookies and decline analytics when you next visit the
              Site.
            </p>

            <h3 className="text-base font-semibold">Summary</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>What cookies do we use?</strong> Essential cookies, Google
                Analytics cookies (optional), and Calendly cookies (only when using the
                meeting scheduler).
              </li>
              <li>
                <strong>How to opt-out?</strong> Decline via the consent banner, change
                your browser settings, or use the Google Analytics opt-out tool.
              </li>
              <li>
                <strong>Do we sell your data?</strong> No, we never sell your personal
                information.
              </li>
              <li>
                <strong>Can you use the site without cookies?</strong> Yes, but some
                features may not work optimally.
              </li>
            </ul>

            <p className="mt-4">
              <strong>Ziyaad Ben Eydatoula</strong>
              <br />
              Product Management Consultant
              <br />
              Based in London, UK, Operating Globally
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
