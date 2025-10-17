"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] backdrop-blur-md py-16 pt-30 px-6 md:px-20">
        <div className="max-w-4xl mx-auto space-y-10 bg-gray-200 rounded-3xl p-10 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-[#225ac0] text-center">
            Privacy Policy
          </h1>

          <p className="text-lg md:text-xl text-gray-800">
            At <strong>Linkhub</strong>, your privacy is our top priority. This
            Privacy Policy explains how we collect, use, and protect your
            personal information when you use our platform.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#D2E823]">
              1. Information We Collect
            </h2>
            <p>
              We may collect the following information when you use our service:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              <li>Account information (email, username)</li>
              <li>Links and content you create</li>
              <li>Device and usage information</li>
              <li>Cookies and analytics data</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#D2E823]">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to provide, maintain, and improve our
              services, including:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              <li>Managing your account and links</li>
              <li>Personalizing your experience</li>
              <li>Analyzing usage to enhance the platform</li>
              <li>Communicating important updates</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#D2E823]">
              3. Sharing and Disclosure
            </h2>
            <p>
              We do not sell your personal data. We may share information only:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              <li>
                With trusted service providers who help operate the platform
              </li>
              <li>To comply with legal obligations</li>
              <li>In connection with business transfers or mergers</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#D2E823]">
              4. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              <li>Access and update your personal information</li>
              <li>Delete your account and content</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#D2E823]">
              5. Security
            </h2>
            <p>
              We implement technical and organizational measures to protect your
              data. However, no system is completely secure. Please use strong
              passwords and safeguard your account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#D2E823]">
              6. Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We encourage
              you to review it periodically. Changes will be effective
              immediately upon posting.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#D2E823]">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or your data,
              please contact us at{" "}
              <a
                href="mailto:am.coders.web@gmail.com"
                className="text-[#225ac0] underline"
              >
                am.coders.web@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
