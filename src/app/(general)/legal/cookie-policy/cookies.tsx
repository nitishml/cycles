"use client";

export default function CookiesPolicy() {
  return (
    <section className="w-full flex justify-center py-10">
      <div className="max-w-6xl w-full px-5 sm:px-8 lg:px-10 py-16 space-y-12">

        {/* Page Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#011642] font-bold tracking-wide text-center">
          Cookies Policy
          <span className="block text-xl sm:text-2xl text-[#595959] mt-2">
            for Growsharp Technologies Pvt Ltd.
          </span>
        </h1>

        {/* Content */}
        <div className="space-y-10 text-[#444] text-sm sm:text-base leading-relaxed">

          <Section title="What Are Cookies?">
            <p className="font-semibold">
              Cookies are small text files placed on your device that help us remember your preferences,
              improve navigation, and analyze site traffic.
            </p>
          </Section>

          <Section title="How We Use Cookies">
            <ul className="list-disc list-inside space-y-1">
              <li>We use cookies to:</li>
              <li>Keep you logged in securely;</li>
              <li>Remember preferences (e.g., language, theme)</li>
              <li>Track performance analytics (Google Analytics, etc.);</li>
              <li>Personalize user experience.</li>
            </ul>
          </Section>

          <Section title="Types of Cookies">
            <ul className="list-disc list-inside space-y-1">
              <li>Strictly Necessary Cookies: Essential for site operation.</li>
              <li>Functional Cookies: Remember your settings and preferences.</li>
              <li>Analytics Cookies: Collect usage patterns for performance improvement.</li>
              <li>Advertising Cookies: (if used) Measure and improve ad delivery.</li>
            </ul>
          </Section>

          <Section title="Managing Cookies">
            <p>
              You can control or delete cookies through your browser settings.
              Disabling cookies may limit certain functionalities on our website or app.
            </p>
          </Section>

          <Section title="Third-Party Cookies">
            <p>
              Our Platform may use cookies from external analytics or payment partners.
              We recommend reviewing their individual policies for detailed control.
            </p>
          </Section>

          <Section title="Consent">
            <p>
              By continuing to use Vstand4U Jobs, you consent to the use of cookies
              as described in this Policy.
            </p>
          </Section>

          <Section title="Contact Us">
            <ul className="list-disc list-inside space-y-1">
              <li>📧 support@growsharptech.com</li>
              <li>🌐 www.growsharptech.com</li>
            </ul>
          </Section>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Section Helper ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 text-lg md:text-xl ">
      <h2 className="text-xl md:text-2xl font-semibold text-[#595959]">
        {title}
      </h2>
      {children}
    </div>
  );
}
