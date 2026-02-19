import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Maven Advert",
  description:
    "Terms of Service and Conditions for using Maven Advert's website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By using Maven Advert’s website or services, you agree to these
              Terms & Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Scope of Services
            </h2>
            <p className="mb-4">
              Maven Advert provides services including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2 grid md:grid-cols-2 gap-x-8">
              <li>Branding and visual communication</li>
              <li>Digital marketing</li>
              <li>Meta Ads and Google Ads management</li>
              <li>Performance marketing</li>
              <li>Video production</li>
              <li>Stall fabrication</li>
              <li>CRM setup and automation</li>
              <li>Advertising and marketing consulting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Advertising Services (Meta Ads, Google Ads, and Other
              Platforms)
            </h2>

            <div className="mt-4 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Client Responsibilities
                </h3>
                <p className="mb-2">The client agrees to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide accurate business information</li>
                  <li>Provide necessary access to ad accounts</li>
                  <li>Approve creatives and campaign strategy</li>
                  <li>Comply with Meta, Google, and platform policies</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Platform Compliance
                </h3>
                <p className="mb-2">
                  All ads are subject to approval and policies of platforms
                  including Meta Advertising Policies & Google Ads Policies.
                </p>
                <p className="text-sm text-gray-600">
                  Maven Advert is not responsible if ads are rejected,
                  disapproved, restricted, or suspended due to platform policy
                  violations.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Guaranteed Results
                </h3>
                <p>
                  Maven Advert does not guarantee specific sales, leads,
                  conversions, or ROI. Advertising performance depends on
                  multiple factors including market conditions, competition, and
                  budget.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ad Spend
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Ad spend is paid directly by the client to Meta, Google, or
                    platforms unless otherwise agreed.
                  </li>
                  <li>Maven Advert service fees are separate from ad spend.</li>
                  <li>Fees are non-refundable once services begin.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Account Access and Ownership
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The client retains ownership of their ad accounts.</li>
              <li>
                Maven Advert may request partner or admin access to manage
                campaigns.
              </li>
              <li>Access may be removed upon termination of services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Payments and Fees
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payments must be made as agreed.</li>
              <li>Delayed payments may result in service suspension.</li>
              <li>All fees are non-refundable unless agreed in writing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All creative work, designs, videos, and marketing materials
              created by Maven Advert remain property of Maven Advert until full
              payment is completed. Upon full payment, ownership may be
              transferred unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="mb-4">Maven Advert is not liable for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ad account suspension</li>
              <li>Platform bans or restrictions</li>
              <li>Loss of business, revenue, or profits</li>
              <li>Platform algorithm changes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Termination
            </h2>
            <p className="mb-4">
              We reserve the right to terminate services if:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Terms are violated</li>
              <li>Payments are not made</li>
              <li>Misuse of services occurs</li>
            </ul>
            <p>Clients may terminate services with written notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Confidentiality
            </h2>
            <p className="leading-relaxed">
              All client information and business data will be kept
              confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Changes to Terms
            </h2>
            <p className="leading-relaxed">
              Maven Advert may update Terms & Conditions at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Contact Information
            </h2>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
              <p className="font-bold text-gray-900 text-lg mb-4">
                Maven Advert
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-medium text-gray-700 w-20">Email:</span>
                  <a
                    href="mailto:info@mavenadvert.com"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    info@mavenadvert.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium text-gray-700 w-20">Phone:</span>
                  <a
                    href="tel:7418418012"
                    className="text-gray-900 hover:text-orange-600"
                  >
                    74184 18012
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium text-gray-700 w-20">
                    Website:
                  </span>
                  <a
                    href="https://www.mavenadvert.com"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    www.mavenadvert.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
