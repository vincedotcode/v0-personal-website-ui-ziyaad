// app/terms/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | Ziyaad Ben Eydatoula",
  description:
    "Terms of Use for ziyaadbeneydatoula.com, outlining conditions, limitations of liability, and your rights when using this website.",
}

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: November 19, 2025
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-foreground">
          {/* Agreement to Terms */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Agreement to Terms</h2>
            <p>
              These Terms of Use (&quot;Terms&quot;) constitute a legally binding
              agreement between you and Ziyaad Ben Eydatoula (&quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;) regarding your use of the website{" "}
              <strong>ziyaadbeneydatoula.com</strong> (the &quot;Site&quot;).
            </p>
            <p>
              By accessing or using the Site, you agree to be bound by these Terms. If
              you do not agree to these Terms, you must not access or use the Site.
            </p>
            <p>
              We reserve the right to change these Terms at any time. We will notify you
              of changes by updating the &quot;Last Updated&quot; date. Your continued
              use of the Site after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Eligibility */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Eligibility</h2>
            <p>You must be at least 18 years old to use this Site. By using the Site, you represent and warrant that:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You are at least 18 years of age.</li>
              <li>You have the legal capacity to enter into these Terms.</li>
              <li>You will comply with these Terms and all applicable laws.</li>
            </ul>
            <p>
              If you are using the Site on behalf of an organization, you represent that
              you have authority to bind that organization to these Terms.
            </p>
          </section>

          {/* Use of the Site */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Use of the Site</h2>

            <h3 className="text-base font-semibold">Permitted Use</h3>
            <p>You may use the Site to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Browse content and information about our services.</li>
              <li>Read articles, blog posts, and other published content.</li>
              <li>Contact us via the contact form.</li>
              <li>Subscribe to our newsletter.</li>
              <li>Schedule meetings via Calendly.</li>
              <li>Share content on social media.</li>
            </ul>

            <h3 className="text-base font-semibold">Prohibited Use</h3>
            <p>You may not use the Site to:</p>

            <h4 className="text-sm font-semibold">Illegal Activities</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Violate any local, state, national, or international law.</li>
              <li>Infringe on intellectual property rights.</li>
              <li>Transmit unlawful, harmful, threatening, abusive, or defamatory content.</li>
              <li>Impersonate any person or entity.</li>
            </ul>

            <h4 className="text-sm font-semibold">Technical Abuse</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Attempt to gain unauthorized access to the Site or related systems.</li>
              <li>Interfere with or disrupt the Site&apos;s operation.</li>
              <li>Use automated systems (bots, scrapers) without permission.</li>
              <li>Introduce viruses, malware, or other harmful code.</li>
              <li>Attempt SQL injection, XSS, or other security exploits.</li>
              <li>Overload our servers with excessive requests.</li>
            </ul>

            <h4 className="text-sm font-semibold">Content Abuse</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Post spam, advertisements, or solicitations.</li>
              <li>Harvest or collect information about other users.</li>
              <li>Use the Site for any commercial purpose without authorization.</li>
              <li>Reproduce, distribute, or publicly display our content without permission.</li>
            </ul>

            <h4 className="text-sm font-semibold">Harassment</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Harass, threaten, or intimidate others.</li>
              <li>Post hateful, discriminatory, or offensive content.</li>
              <li>Stalk or harm other users.</li>
            </ul>
          </section>

          {/* Intellectual Property Rights */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Intellectual Property Rights</h2>

            <h3 className="text-base font-semibold">Our Content</h3>
            <p>
              All content on the Site, including but not limited to text, articles, blog
              posts, graphics, logos, images, design, layout, structure, code, software,
              frameworks, methodologies, videos, and multimedia is owned by Ziyaad Ben
              Eydatoula or our licensors and is protected by copyright, trademark, and
              other intellectual property laws. All rights are reserved.
            </p>

            <h3 className="text-base font-semibold">Limited License</h3>
            <p>We grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Access and view content on the Site for personal, non-commercial use.</li>
              <li>Download and print content for personal reference.</li>
              <li>Share links to our content on social media.</li>
            </ul>
            <p>You may not:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Modify, reproduce, or create derivative works of our content.</li>
              <li>Distribute, sell, or license our content.</li>
              <li>Remove copyright or attribution notices.</li>
              <li>Use our content for commercial purposes without written permission.</li>
              <li>Frame or mirror our Site on another website.</li>
            </ul>

            <h3 className="text-base font-semibold">User-Generated Content</h3>
            <p>
              If you submit content to us (e.g., via contact form, comments, or emails),
              you retain ownership of your content, but you grant us a worldwide,
              non-exclusive, royalty-free license to use, reproduce, and display your
              content to:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Respond to your inquiries.</li>
              <li>Improve our services.</li>
              <li>Include testimonials (with your permission).</li>
            </ul>
            <p>You represent and warrant that:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You own or have rights to the content you submit.</li>
              <li>Your content does not violate any laws or third-party rights.</li>
              <li>Your content does not contain malicious code or scripts.</li>
            </ul>
          </section>

          {/* Services and Consultations */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Services and Consultations</h2>

            <h3 className="text-base font-semibold">Nature of Services</h3>
            <p>
              The Site provides information about product management consulting, coaching,
              and advisory services. The content on this Site:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Is for informational purposes only.</li>
              <li>Is not professional advice specific to your situation.</li>
              <li>Is not a guarantee of specific results.</li>
              <li>Is not a substitute for personalized consultation.</li>
            </ul>
            <p>Content may include general guidance on:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Product management best practices.</li>
              <li>Discovery and delivery frameworks.</li>
              <li>Go-to-market strategies.</li>
              <li>Team coaching approaches.</li>
            </ul>

            <h3 className="text-base font-semibold">No Professional Relationship</h3>
            <p>
              Browsing the Site does not create a professional relationship. A formal
              engagement requires an initial consultation, a written agreement (Statement
              of Work or similar), mutual acceptance of terms and scope, and payment
              terms (if applicable).
            </p>

            <h3 className="text-base font-semibold">No Guarantees</h3>
            <p>While we strive to provide accurate and helpful information:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Content is provided &quot;as is&quot; without warranties of any kind.</li>
              <li>Past performance or case studies do not guarantee future results.</li>
              <li>You are responsible for decisions based on our content.</li>
              <li>You should always exercise your own professional judgment.</li>
            </ul>
          </section>

          {/* Third-Party Links and Services */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Third-Party Links and Services</h2>

            <h3 className="text-base font-semibold">External Links</h3>
            <p>
              The Site may contain links to third-party websites or services, including
              LinkedIn, Twitter, portfolio sites, referenced resources, tools, and
              frameworks. We do not control or endorse these third-party sites and are
              not responsible for:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Their content, privacy policies, or practices.</li>
              <li>Any damage or loss caused by your use of third-party sites.</li>
              <li>The accuracy or availability of external content.</li>
            </ul>
            <p>You access third-party sites at your own risk.</p>

            <h3 className="text-base font-semibold">Third-Party Services We Use</h3>
            <p>We use third-party services to operate the Site, including:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Google Analytics – Website analytics.</li>
              <li>Calendly – Meeting scheduling.</li>
              <li>Email service providers – Email communications.</li>
            </ul>
            <p>
              Your use of these services is subject to their respective terms and
              policies. See our{" "}
              <a href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </a>{" "}
              for details.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Disclaimers</h2>

            <h3 className="text-base font-semibold">No Warranties</h3>
            <p>
              THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
              INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Merchantability or fitness for a particular purpose.</li>
              <li>Non-infringement or absence of third-party rights violations.</li>
              <li>Accuracy, correctness, or completeness of information.</li>
              <li>Reliability, uninterrupted or error-free operation.</li>
              <li>Security or freedom from viruses or harmful components.</li>
            </ul>

            <h3 className="text-base font-semibold">Content Accuracy</h3>
            <p>While we strive for accuracy:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Information may be outdated or incorrect.</li>
              <li>Content reflects opinions and experiences, not absolute facts.</li>
              <li>Case studies and examples may be simplified for illustration.</li>
              <li>Results may vary based on your specific situation.</li>
            </ul>
            <p>You should not rely solely on our content for critical decisions.</p>

            <h3 className="text-base font-semibold">Technical Availability</h3>
            <p>We do not guarantee that:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The Site will be available at all times.</li>
              <li>Access will be uninterrupted or error-free.</li>
              <li>Defects will be corrected.</li>
              <li>The Site is free from viruses or harmful components.</li>
            </ul>
            <p>We may suspend or discontinue the Site at any time without notice.</p>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
            <h3 className="text-base font-semibold">No Liability for Damages</h3>
            <p>
              WE ARE NOT LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Use or inability to use the Site.</li>
              <li>Reliance on any content or information.</li>
              <li>Unauthorized access to your information.</li>
              <li>Errors, mistakes, or inaccuracies in content.</li>
              <li>Personal injury or property damage.</li>
              <li>Any interruption or cessation of the Site.</li>
              <li>Bugs, viruses, or harmful code.</li>
              <li>Loss of profits, revenue, data, or opportunities.</li>
              <li>Third-party conduct or content.</li>
            </ul>
            <p>EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

            <h3 className="text-base font-semibold">Jurisdictional Limitations</h3>
            <p>
              Some jurisdictions do not allow limitations on implied warranties or
              limitations of liability. In such cases, our liability is limited to the
              maximum extent permitted by law.
            </p>

            <h3 className="text-base font-semibold">Maximum Liability</h3>
            <p>
              In no event shall our total liability to you exceed the amount you paid us
              in the 12 months preceding the claim, or $100 USD if you have not paid us
              anything.
            </p>
          </section>

          {/* Indemnification */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Ziyaad Ben Eydatoula, our
              affiliates, and our respective officers, employees, and agents from and
              against any claims, liabilities, damages, losses, and expenses (including
              reasonable attorneys&apos; fees) arising from:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Your use of the Site.</li>
              <li>Your violation of these Terms.</li>
              <li>Your violation of any law or third-party rights.</li>
              <li>Content you submit or transmit.</li>
              <li>Your negligence or willful misconduct.</li>
            </ul>
            <p>
              We reserve the right to assume exclusive defense of any matter subject to
              indemnification, and you agree to cooperate with our defense.
            </p>
          </section>

          {/* Privacy and Data Protection */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal
              information is governed by our{" "}
              <a href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
            <p>By using the Site, you consent to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Our collection and use of information as described in our Privacy Policy.</li>
              <li>Our use of cookies as described in our{" "}
                <a href="/cookies" className="underline underline-offset-2">
                  Cookie Policy
                </a>.
              </li>
              <li>Receiving communications from us (you can opt-out anytime).</li>
            </ul>
          </section>

          {/* User Submissions and Communications */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">User Submissions and Communications</h2>

            <h3 className="text-base font-semibold">Contact Form Submissions</h3>
            <p>When you submit the contact form:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You consent to us contacting you via email.</li>
              <li>You agree we may store your information for up to 3 years.</li>
              <li>You understand submissions are not confidential (do not share sensitive information).</li>
              <li>You grant permission for us to use your feedback to improve our services.</li>
            </ul>

            <h3 className="text-base font-semibold">Newsletter Subscriptions</h3>
            <p>When you subscribe to our newsletter:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You consent to receiving periodic emails with product insights and updates.</li>
              <li>You can unsubscribe at any time via the link in any email.</li>
              <li>We will not share your email with third parties for marketing purposes.</li>
            </ul>

            <h3 className="text-base font-semibold">Testimonials and Reviews</h3>
            <p>If you provide feedback, testimonials, or reviews:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You grant us permission to use them in marketing materials.</li>
              <li>We may publish them on our Site, social media, or other channels.</li>
              <li>We will attribute them to you (name, company) unless you request anonymity.</li>
              <li>You can request removal at any time by contacting us.</li>
            </ul>
          </section>

          {/* Copyright Infringement */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Copyright Infringement</h2>
            <p>
              We respect intellectual property rights. If you believe content on our Site
              infringes your copyright, please send a notice to{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline underline-offset-2"
              >
                zi@ziyaadbeneydatoula.com
              </a>{" "}
              including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Description of the copyrighted work.</li>
              <li>Location of the infringing content (URL).</li>
              <li>Your contact information.</li>
              <li>Statement of good faith belief.</li>
              <li>
                Statement under penalty of perjury that the information is accurate and
                you are the copyright owner or authorized to act on their behalf.
              </li>
              <li>Your physical or electronic signature.</li>
            </ul>
            <p>We will investigate and take appropriate action, which may include removing content.</p>
          </section>

          {/* Termination */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Termination</h2>

            <h3 className="text-base font-semibold">Our Right to Terminate</h3>
            <p>We may suspend or terminate your access to the Site at any time, with or without cause, with or without notice, if:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You violate these Terms.</li>
              <li>You engage in prohibited conduct.</li>
              <li>We suspect fraudulent or illegal activity.</li>
              <li>Required by law or legal process.</li>
              <li>We discontinue the Site.</li>
            </ul>

            <h3 className="text-base font-semibold">Effect of Termination</h3>
            <p>Upon termination:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Your right to use the Site ceases immediately.</li>
              <li>We may delete your information (subject to legal retention requirements).</li>
              <li>Provisions that should survive (disclaimers, limitations, indemnification) remain in effect.</li>
            </ul>

            <h3 className="text-base font-semibold">Your Right to Discontinue Use</h3>
            <p>
              You may stop using the Site at any time. To delete your information,
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

          {/* Dispute Resolution */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Dispute Resolution</h2>

            <h3 className="text-base font-semibold">Governing Law</h3>
            <p>
              These Terms are governed by and construed in accordance with the laws of
              England and Wales, without regard to conflict of law principles. We are
              based in London, United Kingdom. International users also agree to comply
              with applicable local laws in their jurisdiction.
            </p>

            <h3 className="text-base font-semibold">Jurisdiction</h3>
            <p>
              Any legal action or proceeding relating to these Terms shall be brought
              exclusively in the courts of England and Wales, and you consent to the
              jurisdiction of such courts. Venue: Courts of England and Wales (London).
            </p>

            <h3 className="text-base font-semibold">Informal Resolution</h3>
            <p>
              Before filing any legal action, you agree to contact us at{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline underline-offset-2"
              >
                zi@ziyaadbeneydatoula.com
              </a>{" "}
              describing the issue and engage in good faith negotiations to resolve the
              dispute, allowing 30 days for informal resolution.
            </p>

            <h3 className="text-base font-semibold">Alternative Dispute Resolution (ADR)</h3>
            <p>
              For disputes that cannot be resolved informally, you and we agree to
              consider alternative dispute resolution methods:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Mediation:</strong> Voluntary mediation through a UK-accredited
                mediator; cost shared between parties; non-binding process.
              </li>
              <li>
                <strong>Arbitration (Optional):</strong> Binding arbitration in
                accordance with UK arbitration rules; one arbitrator chosen by mutual
                agreement; location London (or virtual if agreed); language English;
                decision is final and binding.
              </li>
            </ul>
            <p>
              Either party may seek injunctive relief in court to protect intellectual
              property rights or prevent immediate harm.
            </p>

            <h3 className="text-base font-semibold">Consumer Rights (UK Consumers)</h3>
            <p>If you are a UK consumer:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Nothing in these Terms affects your statutory rights under UK law.</li>
              <li>You may have additional rights under the Consumer Rights Act 2015.</li>
              <li>
                You can use the Online Dispute Resolution (ODR) platform:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                .
              </li>
            </ul>

            <h3 className="text-base font-semibold">Class Action Waiver</h3>
            <p>
              You agree to resolve disputes on an individual basis. You waive any right
              to participate in class actions, class arbitrations, or representative
              proceedings, except where prohibited by law.
            </p>
          </section>

          {/* General Provisions */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">General Provisions</h2>

            <h3 className="text-base font-semibold">Entire Agreement</h3>
            <p>
              These Terms, together with our{" "}
              <a href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/cookies" className="underline underline-offset-2">
                Cookie Policy
              </a>
              , constitute the entire agreement between you and us regarding the Site.
            </p>

            <h3 className="text-base font-semibold">Severability</h3>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid,
              that provision will be limited or eliminated to the minimum extent
              necessary, and the remaining provisions will remain in full force.
            </p>

            <h3 className="text-base font-semibold">No Waiver</h3>
            <p>
              Our failure to enforce any provision of these Terms does not waive our
              right to enforce that provision later. Any waiver must be in writing and
              signed by us.
            </p>

            <h3 className="text-base font-semibold">Assignment</h3>
            <p>
              You may not assign or transfer these Terms without our written consent. We
              may assign these Terms to any affiliate or successor without restriction.
            </p>

            <h3 className="text-base font-semibold">Force Majeure</h3>
            <p>
              We are not liable for any failure to perform due to circumstances beyond
              our reasonable control, including natural disasters, war, terrorism, civil
              unrest, government actions, internet or telecommunications failures,
              pandemics, or public health emergencies.
            </p>

            <h3 className="text-base font-semibold">Headings</h3>
            <p>
              Section headings are for convenience only and do not affect interpretation
              of these Terms.
            </p>

            <h3 className="text-base font-semibold">Contact for Legal Notices</h3>
            <p>
              All legal notices should be sent to:
              <br />
              Email:{" "}
              <a
                href="mailto:zi@ziyaadbeneydatoula.com"
                className="underline underline-offset-2"
              >
                zi@ziyaadbeneydatoula.com
              </a>
              <br />
              Subject: &quot;Legal Notice&quot;
            </p>
          </section>

          {/* Specific Terms for Services */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Specific Terms for Services</h2>

            <h3 className="text-base font-semibold">Consultations and Advisory Services</h3>
            <p>If you engage us for professional services:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Separate Agreement Required:</strong> Services are governed by a
                Statement of Work (SOW) or similar agreement. SOW terms supersede these
                general Terms where they conflict. Payment terms, deliverables, and
                timelines are defined in the SOW.
              </li>
              <li>
                <strong>Confidentiality:</strong> We will keep your business information
                confidential. You agree not to disclose our methodologies or frameworks
                without permission. NDAs may be executed for sensitive projects.
              </li>
              <li>
                <strong>No Conflicts:</strong> We will disclose any potential conflicts of
                interest and reserve the right to decline engagements that conflict with
                existing clients.
              </li>
            </ul>

            <h3 className="text-base font-semibold">Coaching and Training Services</h3>
            <p>For team coaching or education services:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Outcomes Not Guaranteed:</strong> We provide frameworks and
                guidance, but results depend on your team&apos;s application. Success
                requires your active participation and implementation.
              </li>
              <li>
                <strong>Intellectual Property:</strong> Training materials and frameworks
                remain our property. You may use them internally but not resell or
                redistribute. Templates and tools may be used for your own projects.
              </li>
            </ul>
          </section>

          {/* Updates to These Terms */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Updates to These Terms</h2>
            <p>We may update these Terms to reflect:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Changes in our services or business practices.</li>
              <li>Legal or regulatory requirements.</li>
              <li>User feedback and improvements.</li>
            </ul>
            <p>When we update these Terms:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>We&apos;ll update the &quot;Last Updated&quot; date at the top.</li>
              <li>We&apos;ll notify you via email or a prominent notice on the Site.</li>
              <li>For material changes, we may require you to accept updated Terms.</li>
            </ul>
            <p>
              Continued use after changes constitutes acceptance. We encourage you to
              review these Terms periodically.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>If you have questions about these Terms of Use, please contact us:</p>
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
            <p>For specific inquiries:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>General questions: Include &quot;Terms Inquiry&quot; in the subject line.</li>
              <li>Legal matters: Include &quot;Legal Notice&quot; in the subject line.</li>
              <li>Copyright issues: Include &quot;Copyright Notice&quot; in the subject line.</li>
            </ul>
          </section>

          {/* Acknowledgment */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Acknowledgment</h2>
            <p>BY USING THIS SITE, YOU ACKNOWLEDGE THAT:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You have read these Terms of Use.</li>
              <li>You understand these Terms.</li>
              <li>You agree to be bound by these Terms.</li>
              <li>You are at least 18 years old.</li>
              <li>You will comply with all applicable laws.</li>
            </ul>
            <p>If you do not agree to these Terms, do not use the Site.</p>
            <p className="mt-4">
              <strong>Ziyaad Ben Eydatoula</strong>
              <br />
              Product Management Consultant
              <br />
              Based in London UK, Operating Globally
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
