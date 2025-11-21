// app/privacy/page.tsx (or src/app/privacy/page.tsx depending on your setup)

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Ziyaad Ben Eydatoula",
  description:
    "Privacy Policy for ziyaadbeneydatoula.com, explaining how your personal data is collected, used, and protected.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: November 19, 2025
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-foreground">
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              Ziyaad Ben Eydatoula (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              operates the website <strong>ziyaadbeneydatoula.com</strong> (the
              &quot;Site&quot;). We are based in London, United Kingdom, and operate
              globally. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our Site.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using the Site, you consent
              to the practices described in this Privacy Policy. If you do not agree
              with the terms of this Privacy Policy, please do not access the Site.
            </p>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time.
              We will notify you of any changes by updating the &quot;Last Updated&quot; date.
              You are encouraged to periodically review this Privacy Policy to stay
              informed of updates.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Information We Collect</h2>

            <h3 className="text-base font-semibold">Personal Information You Provide</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Contact us via the contact form (Touch Base page)</li>
              <li>Subscribe to our newsletter</li>
              <li>Book a meeting via Calendly</li>
              <li>Interact with our content</li>
            </ul>
            <p>The personal information we collect may include:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name (optional)</li>
              <li>Message content</li>
              <li>Phone number (if provided via Calendly)</li>
              <li>Meeting preferences and scheduling information</li>
            </ul>

            <h3 className="text-base font-semibold">Information Automatically Collected</h3>
            <p>
              When you visit our Site, we automatically collect certain information about
              your device and browsing actions, including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Device type (desktop, mobile, tablet)</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>Date and time of visit</li>
              <li>Click data and navigation patterns</li>
            </ul>
            <p>This information is collected through:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Cookies (see our Cookie Policy)</li>
              <li>Google Analytics (analytics service)</li>
              <li>Server logs</li>
              <li>Calendly (meeting scheduling service)</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            <h3 className="text-base font-semibold">Primary Purposes</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Respond to your inquiries</strong> – Answer questions submitted via
                contact form.
              </li>
              <li>
                <strong>Provide services</strong> – Schedule and conduct consultations,
                coaching, or advisory services.
              </li>
              <li>
                <strong>Send newsletters</strong> – Deliver product insights, articles, and
                updates (if you&apos;ve subscribed).
              </li>
              <li>
                <strong>Improve our Site</strong> – Analyze usage patterns to enhance user
                experience.
              </li>
              <li>
                <strong>Communicate with you</strong> – Send follow-up emails, meeting
                confirmations, and service-related updates.
              </li>
            </ul>

            <h3 className="text-base font-semibold">Analytics and Optimization</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Analyze website traffic – Understand how visitors use our Site.</li>
              <li>Track conversions – Measure effectiveness of our content and services.</li>
              <li>Identify technical issues – Monitor and fix bugs or performance problems.</li>
              <li>Optimize content – Determine which content is most valuable to visitors.</li>
            </ul>

            <h3 className="text-base font-semibold">Legal and Security</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Comply with legal obligations – Respond to legal requests and prevent fraud.</li>
              <li>Protect our rights – Enforce our terms and protect against misuse.</li>
              <li>Security – Detect, prevent, and address security incidents.</li>
            </ul>
          </section>

          {/* How We Share Your Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How We Share Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties.</p>
            <p>We may share your information with:</p>

            <h3 className="text-base font-semibold">Service Providers</h3>
            <p>
              We use trusted third-party service providers to help us operate our Site and
              deliver services:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Google Analytics</strong> – Website analytics (Google LLC, USA)
                <ul className="list-disc pl-5">
                  <li>Purpose: Analyze website traffic and user behavior</li>
                  <li>Data shared: IP address (anonymized), browser info, pages visited, time on site</li>
                  <li>
                    Privacy Policy:{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="underline underline-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://policies.google.com/privacy
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Calendly</strong> – Meeting scheduling (Calendly LLC, USA)
                <ul className="list-disc pl-5">
                  <li>Purpose: Schedule and manage consultations</li>
                  <li>Data shared: Name, email, meeting preferences, time zone</li>
                  <li>
                    Privacy Policy:{" "}
                    <a
                      href="https://calendly.com/privacy"
                      className="underline underline-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://calendly.com/privacy
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Email Service Provider</strong> – Email delivery and newsletter management
                <ul className="list-disc pl-5">
                  <li>Purpose: Send newsletters, auto-replies, and service emails</li>
                  <li>Data shared: Email address, name, subscription preferences</li>
                  <li>We use industry-standard email service providers with robust security.</li>
                </ul>
              </li>
              <li>
                <strong>Web Hosting Provider</strong> – Website hosting and infrastructure
                <ul className="list-disc pl-5">
                  <li>Purpose: Host and deliver website content</li>
                  <li>Data shared: All data collected through the Site</li>
                  <li>Hosted on secure, enterprise-grade infrastructure.</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-base font-semibold">Legal Requirements</h3>
            <p>We may disclose your information if required to do so by law or in response to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Court orders or legal process</li>
              <li>Requests from government authorities</li>
              <li>Protection of our legal rights</li>
              <li>Prevention of fraud or security threats</li>
              <li>Compliance with applicable laws and regulations</li>
            </ul>

            <h3 className="text-base font-semibold">Business Transfers</h3>
            <p>
              If we are involved in a merger, acquisition, or sale of assets, your
              information may be transferred as part of that transaction. We will notify
              you via email and/or a prominent notice on our Site of any change in
              ownership.
            </p>
          </section>

          {/* Data Retention */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill
              the purposes outlined in this Privacy Policy:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Contact form submissions – Up to 3 years for service delivery and communication history.</li>
              <li>Newsletter subscriptions – Retained until you unsubscribe.</li>
              <li>Calendly meeting data – Retained according to Calendly&apos;s retention policies.</li>
              <li>Analytics data – Typically retained for 26 months (Google Analytics default) or as configured.</li>
              <li>Email communications – Retained as long as necessary for business purposes and legal compliance.</li>
            </ul>
            <p>
              You may request deletion of your personal information at any time by
              contacting us at <a href="mailto:zi@ziyaadbeneydatoula.com" className="underline underline-offset-2">zi@ziyaadbeneydatoula.com</a>.
            </p>
          </section>

          {/* Your Rights */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding
              your personal information:
            </p>

            <h3 className="text-base font-semibold">Access and Portability</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Right to access – Request a copy of the personal information we hold about you.</li>
              <li>
                Right to data portability – Receive your personal information in a
                structured, machine-readable format.
              </li>
            </ul>

            <h3 className="text-base font-semibold">Correction and Deletion</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Right to correction – Request correction of inaccurate or incomplete personal information.</li>
              <li>Right to deletion – Request deletion of your personal information (&quot;right to be forgotten&quot;).</li>
              <li>Right to restriction – Request that we limit how we use your personal information.</li>
            </ul>

            <h3 className="text-base font-semibold">Consent and Objection</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Right to withdraw consent – Withdraw consent for processing based on consent (e.g., newsletter).</li>
              <li>Right to object – Object to processing of your personal information for certain purposes.</li>
              <li>Right to opt-out – Unsubscribe from marketing communications at any time.</li>
            </ul>

            <h3 className="text-base font-semibold">How to Exercise Your Rights</h3>
            <p>To exercise any of these rights, please contact us at:</p>
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
              <li>Subject line: &quot;Privacy Rights Request&quot;</li>
            </ul>
            <p>
              We will respond to your request within 30 days. We may ask you to verify
              your identity before processing your request.
            </p>
          </section>

          {/* Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect and track
              information about your use of our Site. For detailed information about the
              cookies we use and your choices, please see our Cookie Policy.
            </p>
            <h3 className="text-base font-semibold">Your Cookie Choices</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Consent Banner:</strong> When you first visit our Site, you&apos;ll see a
                consent banner allowing you to accept or decline analytics cookies.
              </li>
              <li>
                <strong>Browser Settings:</strong> You can set your browser to refuse all or
                some cookies, or to alert you when cookies are being sent. However, if you
                disable cookies, some parts of the Site may not function properly.
              </li>
              <li>
                <strong>Opt-out Options:</strong>{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  Google Analytics opt-out
                </a>
              </li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites, including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>LinkedIn profile</li>
              <li>Twitter profile</li>
              <li>Portfolio sites</li>
              <li>Referenced articles or resources</li>
            </ul>
            <p>
              We are not responsible for the privacy practices of these third-party sites.
              We encourage you to read their privacy policies before providing any
              personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Children&apos;s Privacy</h2>
            <p>
              Our Site is not directed to children under the age of 18. We do not knowingly
              collect personal information from children under 18.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with
              personal information, please contact us at{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline underline-offset-2"
              >
                zi@ziyaadbeneydatoula.com
              </a>
              . We will delete such information from our systems.
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than
              your country of residence, including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>United States – Where our service providers (Google, Calendly) are located.</li>
              <li>United Kingdom – Where we are based.</li>
              <li>European Union – Where some hosting or service providers may operate.</li>
              <li>Other countries – Where our hosting or email service providers operate.</li>
            </ul>
            <p>
              These countries may have data protection laws that differ from those in your
              country. We ensure appropriate safeguards are in place to protect your
              personal information in accordance with this Privacy Policy.
            </p>

            <h3 className="text-base font-semibold">Safeguards for International Transfers</h3>
            <p>We use the following mechanisms to ensure your data is protected:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Standard Contractual Clauses (SCCs).</li>
              <li>Adequacy decisions.</li>
              <li>UK-EU data transfer safeguards.</li>
              <li>Your explicit consent where required.</li>
            </ul>

            <h3 className="text-base font-semibold">For EU/EEA Users</h3>
            <p>
              If you are located in the European Union or European Economic Area, we rely on:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Standard Contractual Clauses approved by the European Commission.</li>
              <li>Adequacy decisions for countries deemed to provide adequate protection.</li>
              <li>Your explicit consent where required.</li>
            </ul>

            <h3 className="text-base font-semibold">For UK Users</h3>
            <p>
              If you are located in the United Kingdom, we ensure UK GDPR compliance for
              international transfers through:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>UK-approved Standard Contractual Clauses.</li>
              <li>UK adequacy decisions.</li>
              <li>UK International Data Transfer Agreement (IDTA), where applicable.</li>
              <li>Supplementary measures as recommended by the ICO.</li>
            </ul>
          </section>

          {/* Security */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to
              protect your personal information against:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Unauthorized access</li>
              <li>Alteration or disclosure</li>
              <li>Destruction or loss</li>
              <li>Accidental or unlawful processing</li>
            </ul>
            <p>Security measures include:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>SSL/TLS encryption for data in transit.</li>
              <li>Secure, enterprise-grade hosting infrastructure.</li>
              <li>Access controls on a need-to-know basis.</li>
              <li>Regular security reviews.</li>
              <li>Input validation to protect against XSS and SQL injection.</li>
              <li>Rate limiting to protect against spam and abuse.</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is
              100% secure. While we strive to protect your personal information, we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* CCPA */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have specific rights under the
              California Consumer Privacy Act (CCPA):
            </p>
            <h3 className="text-base font-semibold">Rights Under CCPA</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Right to know – Request disclosure of personal information we&apos;ve collected about you.</li>
              <li>Right to delete – Request deletion of your personal information.</li>
              <li>Right to opt-out – Opt-out of the sale of your personal information.</li>
              <li>Right to non-discrimination – We will not discriminate against you for exercising your rights.</li>
            </ul>
            <h3 className="text-base font-semibold">What We Collect</h3>
            <p>Categories of personal information collected:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Identifiers (name, email address, IP address).</li>
              <li>Internet activity (browsing behavior, interactions with Site).</li>
              <li>Professional information (company name, job-related inquiries).</li>
            </ul>
            <p>We do not sell your personal information.</p>
            <h3 className="text-base font-semibold">How to Exercise Your Rights</h3>
            <p>
              Email us at{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline underline-offset-2"
              >
                zi@ziyaadbeneydatoula.com
              </a>{" "}
              with the subject line &quot;California Privacy Rights Request.&quot; We will
              verify your identity and respond within 45 days.
            </p>
          </section>

          {/* GDPR */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">European Privacy Rights (GDPR)</h2>
            <h3 className="text-base font-semibold">Legal Basis for Processing</h3>
            <p>We process your personal information based on:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Consent (e.g., newsletter signup).</li>
              <li>Contract (to perform services you&apos;ve requested).</li>
              <li>Legitimate interests (e.g., improving our Site, preventing fraud).</li>
              <li>Legal obligation (compliance with law).</li>
            </ul>

            <h3 className="text-base font-semibold">Your GDPR Rights</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Right to access your personal data.</li>
              <li>Right to rectification of inaccurate data.</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;).</li>
              <li>Right to restrict processing.</li>
              <li>Right to data portability.</li>
              <li>Right to object to processing.</li>
              <li>Right to withdraw consent at any time.</li>
              <li>Right to lodge a complaint with a supervisory authority.</li>
            </ul>
            <p>
              For GDPR-related inquiries, contact us at{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline underline-offset-2"
              >
                zi@ziyaadbeneydatoula.com
              </a>{" "}
              with the subject &quot;GDPR Inquiry.&quot;
            </p>
          </section>

          {/* UK GDPR */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">UK Privacy Rights (UK GDPR)</h2>
            <h3 className="text-base font-semibold">Our UK Presence</h3>
            <p>
              We are based in London, United Kingdom and are subject to UK data protection
              laws.
            </p>
            <p>Data Controller Details:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Name: Ziyaad Beneydatoula</li>
              <li>Location: London, United Kingdom</li>
              <li>
                Contact:{" "}
                <a
                  href="mailto:zi@ziyaadbeneydatoula.com"
                  className="underline underline-offset-2"
                >
                  zi@ziyaadbeneydatoula.com
                </a>
              </li>
            </ul>

            <h3 className="text-base font-semibold">Legal Basis for Processing</h3>
            <p>We process your personal information based on:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Consent – You have given clear consent.</li>
              <li>Contract – Processing is necessary for services.</li>
              <li>Legitimate interests – We have a legitimate business interest.</li>
              <li>Legal obligation – Required by UK law.</li>
            </ul>

            <h3 className="text-base font-semibold">Your UK GDPR Rights</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Right of access.</li>
              <li>Right to rectification.</li>
              <li>Right to erasure.</li>
              <li>Right to restrict processing.</li>
              <li>Right to data portability.</li>
              <li>Right to object.</li>
              <li>
                Rights related to automated decision-making (we do not use automated
                decision-making).
              </li>
              <li>Right to withdraw consent at any time.</li>
            </ul>

            <h3 className="text-base font-semibold">How to Exercise Your UK Rights</h3>
            <p>Contact us at:</p>
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
              <li>Subject: &quot;UK Privacy Rights Request&quot;</li>
              <li>Address: London, United Kingdom</li>
            </ul>
            <p>
              We will respond within one month of receiving your request. In complex cases,
              we may extend this by two additional months and will inform you.
            </p>

            <h3 className="text-base font-semibold">UK Supervisory Authority</h3>
            <p>
              If you&apos;re not satisfied with our response, you have the right to lodge a
              complaint with:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Information Commissioner&apos;s Office (ICO) –{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  https://ico.org.uk/make-a-complaint/
                </a>
              </li>
              <li>Phone: 0303 123 1113</li>
              <li>
                Address: Information Commissioner&apos;s Office, Wycliffe House, Water Lane,
                Wilmslow, Cheshire, SK9 5AF
              </li>
            </ul>

            <h3 className="text-base font-semibold">International Data Transfers from the UK</h3>
            <p>
              When we transfer your data outside the UK (e.g., to US-based service
              providers like Google Analytics or Calendly), we ensure appropriate
              safeguards:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Standard Contractual Clauses approved by the UK Government and ICO.</li>
              <li>Adequacy decisions for countries deemed adequate by the UK.</li>
              <li>Your explicit consent, where required.</li>
            </ul>
            <p>Key transfers include:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Google Analytics (USA) – Standard Contractual Clauses.</li>
              <li>Calendly (USA) – Standard Contractual Clauses.</li>
              <li>Email service provider – SCCs or UK/EU-based hosting.</li>
            </ul>
            <p>
              For high-risk processing activities, we conduct Data Protection Impact
              Assessments (DPIAs) as required by UK GDPR.
            </p>
            <p>
              In the event of a data breach that poses a risk to your rights and freedoms,
              we will notify the ICO within 72 hours and notify you without undue delay.
            </p>
          </section>

          {/* Updates */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Updates to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in
              our practices, applicable laws, new features or services, or feedback from
              users.
            </p>
            <p>When we make changes:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>We will update the &quot;Last Updated&quot; date at the top.</li>
              <li>
                For significant changes, we may notify you by email (if you&apos;ve provided
                your email address) or via a prominent notice on our Site.
              </li>
            </ul>
            <p>
              Continued use of the Site after changes constitutes acceptance of the
              updated Privacy Policy. We encourage you to review this Privacy Policy
              periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy
              or our privacy practices, please contact us:
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
              <li>Response Time: We aim to respond within 48 hours (business days).</li>
            </ul>
            <p>
              For specific privacy rights requests, please include your full name, the
              email address used on our Site, a description of your request, and, if
              necessary, proof of identity.
            </p>
          </section>

          {/* Consent */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Consent</h2>
            <p>
              By using our Site, you consent to our Privacy Policy and agree to its terms.
            </p>
            <p className="mt-4">
              <strong>Ziyaad Ben Eydatoula</strong>
              <br />
              Product Management Consultant
              <br />
              Based in London, Operating Globally
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
