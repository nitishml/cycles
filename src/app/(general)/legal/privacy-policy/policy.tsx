"use client";


export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: (
        <ul className="space-y-2">
          <li>
            <b className="text-[#595959]  font-bold">Personal Information:</b>{" "}
            We collect personal details such as your name, email address, shipping address, phone number,
            and payment information when you make a  purchase create an account and contact us.
          </li>
          <li>
            <b className="text-[#595959]  font-bold">Non-Personal Information:</b>{" "}
            We may collect non-personal data such as browser type,operating system,and browsing behaviour to improve our website and services
          </li>
        </ul>
      ),
    },

    {
      title: "How We Use Your Information",
      content: (
        <ul className="space-y-2">
          <li>
            <b className="text-[#595959] font-bold">To Process Requests:</b>{" "}
            We use your personal information helps us process and fulfill your orders,enquiries and send promotional materials if you have opted in.
          </li>
          <li>
            <b className="text-[#595959] font-bold">To Communicate:</b>{" "}
            We use your contact information  to send you updates about your order, respond to .
          </li>
          <li>
            <b className="text-[#595959]  font-bold">To Improve Our Platform:</b>{" "}
            We analyze Non-personal informationto understand user behaviour and enhance our website's performance.
          </li>
        </ul>
      ),
    },

    {
      title: "Information Sharing",
      content: (
        <ul className="space-y-2">
          <li>
            <b className="text-[#595959]  font-bold">Third-Party Service Providers:</b>{" "}
            We may share your information with third-party service providers who assist us in operating our website, processing payments, and delivering orders.
          </li>
          <li>
            <b className="text-[#595959] font-bold">Legal Compliance:</b>{" "}
            We may disclose your information if required by law or to protect our rights          </li>
        </ul>
      ),
    },

    {
      title: "Data Security",
      content: (
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>
      ),
    },

    {
      title: "Your Rights",
      content: (
        <ul className="space-y-2">
          <li>
            <b className="text-[#595959]  font-bold">Access & Correction:</b>{" "}
            You have the right to access and correct your personal information. You can update your account details through our website          </li>
          <li>
            <b className="text-[#595959] font-bold">Opt-Out:</b>{" "}
            You can opt-out of receiving promotional emails by following the unsubscribe instructions in the emails.
          </li>
        </ul>
      ),
    },

    {
      title: "Changes to this Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised date will be indicated at the top of the policy.
        </p>
      ),
    },

    {
      title: "Contact Us",
      content: (
        <p>
          For questions or concerns regarding your  privacy,please contact  us at:
          <span className="font-semibold"> support@growsharptech.com</span>
        </p>
      ),
    },
  ];

  return (
    <div className="max-w-6xl w-full mx-auto flex flex-col items-center justify-center gap-10 pt-10 px-4">

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#011642] font-bold tracking-wide text-center leading-snug">
        Privacy Policy
        <span className="block text-xl sm:text-2xl text-[#595959] mt-2">
          Growsharp Technologies Pvt. Ltd.
        </span>
      </h1>

      {/* Content */}
      <div className="w-full flex flex-col items-center justify-center gap-7">
        {sections.map((section, index) => (
          <div key={index} className="w-full md:text-xl space-y-4">
            <h2 className="text-xl md:text-2xl text-[#595959] dark:text-[#e3dcdc]">
              {section.title}
            </h2>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
