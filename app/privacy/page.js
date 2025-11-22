"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Shield, Lock, FileText, Server, Globe } from "lucide-react";

const sections = [
  {
    id: "collect",
    title: "1. Information We Collect",
    icon: <FileText className="w-6 h-6" />,
    content: (
      <>
        <p className="mb-4">
          We collect information to provide a better experience. This includes:
        </p>
        <ul className="space-y-2 list-disc list-inside text-white/80 ml-2">
          <li>
            <span className="font-medium text-[#D2E823]">Account Details:</span> Email address, username, and profile preferences.
          </li>
          <li>
            <span className="font-medium text-[#D2E823]">User Content:</span> Links, titles, and descriptions you create.
          </li>
          <li>
            <span className="font-medium text-[#D2E823]">Usage Data:</span> Device type, browser version, and interaction metrics.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    title: "2. How We Use Your Data",
    icon: <Server className="w-6 h-6" />,
    content: (
      <>
        <p className="mb-4">Your data fuels the core functionality of Linkhub:</p>
        <ul className="space-y-2 list-disc list-inside text-white/80 ml-2">
          <li>Providing and maintaining your personalized link page.</li>
          <li>Improving platform performance and user experience.</li>
          <li>Sending important account updates and security alerts.</li>
        </ul>
      </>
    ),
  },
  {
    id: "share",
    title: "3. Sharing & Disclosure",
    icon: <Globe className="w-6 h-6" />,
    content: (
      <p>
        We strictly <span className="text-[#D2E823] font-bold">do not sell</span> your personal data. We only share information with trusted service providers (like hosting and database services) necessary to operate Linkhub, or when required by law.
      </p>
    ),
  },
  {
    id: "rights",
    title: "4. Your Rights",
    icon: <Shield className="w-6 h-6" />,
    content: (
      <>
        <p className="mb-4">You maintain full control over your digital footprint:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg border border-white/20">
            <h4 className="text-[#D2E823] font-medium mb-2">Access & Edit</h4>
            <p className="text-sm text-white/80">Update your profile and links at any time via the dashboard.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/20">
            <h4 className="text-[#D2E823] font-medium mb-2">Deletion</h4>
            <p className="text-sm text-white/80">Request permanent deletion of your account and all associated data.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "security",
    title: "5. Security Measures",
    icon: <Lock className="w-6 h-6" />,
    content: (
      <p>
        We employ industry-standard encryption and security practices to safeguard your information. While no online service is 100% secure, we continuously monitor and upgrade our defenses to protect your data.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] text-white font-sans selection:bg-[#D2E823]/30">
      <Navbar />

      <main className="flex-grow relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#D2E823]/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8a4fff]/30 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="text-center mb-16">
            <h1 className=" text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D2E823] drop-shadow-[0_0_12px_rgba(210,232,35,0.6)] mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Transparency is at the core of Linkhub. Here&apos;s how we handle your data with the care it deserves.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.id}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-colors duration-300 shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-[#D2E823]/20 text-[#D2E823] shrink-0">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="md:hidden text-[#D2E823]">{section.icon}</span>
                      {section.title}
                    </h2>
                    <div className="text-white/90 leading-relaxed text-lg">
                      {section.content}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 text-center pt-10 border-t border-white/20">
            <p className="text-white/80 mb-4">Questions about your privacy?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#D2E823] text-[#1a2a6c] font-bold hover:bg-white hover:text-[#225ac0] transition-all hover:scale-105 shadow-lg"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
