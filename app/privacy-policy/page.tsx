import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Maven Advert",
  description:
    "Privacy Policy for Maven Advert. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="leading-relaxed">
              Maven Advert (“we,” “our,” or “us”) respects your privacy and is
              committed to protecting any personal information you provide while
              using our website and services. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information.
            </p>
            <p className="leading-relaxed mt-2">
              By using our website or services, you agree to the practices
              described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Personal Information
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Company name</li>
                  <li>Business details</li>
                  <li>Billing and payment information</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Technical Information
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Website usage data</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Marketing & Advertising Data
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ad account access (Meta Ads, Google Ads, etc.)</li>
                <li>Campaign performance data</li>
                <li>Audience and conversion data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Provide branding, advertising, and digital marketing services
              </li>
              <li>
                Manage Meta Ads, Google Ads, and other advertising campaigns
              </li>
              <li>Communicate regarding services and support</li>
              <li>Improve our website and services</li>
              <li>Process payments and invoices</li>
              <li>Analyze performance and optimize campaigns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Advertising Platforms and Third Parties
            </h2>
            <p className="mb-4">
              We may access and manage your advertising accounts on platforms
              including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Meta (Facebook, Instagram)</li>
              <li>Google (Google Ads, YouTube)</li>
              <li>LinkedIn</li>
              <li>Other digital advertising platforms</li>
            </ul>
            <p className="leading-relaxed">
              We only access accounts with your permission and use the data
              solely for campaign management and optimization. We are not
              responsible for privacy practices of third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Data Protection
            </h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your data
              from:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Unauthorized access</li>
              <li>Alteration</li>
              <li>Disclosure</li>
              <li>Loss or misuse</li>
            </ul>
            <p className="italic text-gray-500">
              However, no online system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Cookies
            </h2>
            <p className="leading-relaxed">
              Our website may use cookies to improve user experience, analyze
              traffic, and optimize performance. You may disable cookies in your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Data Sharing
            </h2>
            <p className="mb-4">
              We do not sell or rent your personal information.
            </p>
            <p className="mb-2">We may share data with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Advertising platforms (Meta, Google, etc.)</li>
              <li>CRM and automation tools</li>
              <li>Payment processors</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Your Rights
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request access to your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
            </ul>
            <div className="mt-6 p-6 bg-orange-50 border border-orange-100 rounded-xl">
              <p className="font-semibold text-gray-900">
                Contact Us regarding your rights:
              </p>
              <a
                href="mailto:info@mavenadvert.com"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                info@mavenadvert.com
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Updates to Privacy Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy at any time. Updates will be
              posted on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
