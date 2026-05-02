"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import NavDock from "@/components/NavDock";

// ─── Data ─────────────────────────────────────────────────────────────────────
const experience = [
  {
    role: "AI Research Analyst",
    company: "Handshake AI",
    location: "Orlando, FL",
    date: "Mar 2026 – Present",
    current: true,
    bullets: [
      "Evaluated and ranked model-generated responses for Project Ohm, contributing to LLM alignment training datasets.",
      "Assessed AI outputs against prompt intent, reasoning quality, and communication criteria.",
    ],
  },
  {
    role: "AI Analytics Intern",
    company: "Loyal Source",
    location: "Orlando, FL",
    date: "May – Aug 2025",
    current: false,
    bullets: [
      "Identified ML integration opportunities within clinical data workflows, automating routine reporting for CBP medical support.",
      "Built Tableau visualizations delivering proof-of-concept insights for clinical management modernization.",
    ],
  },
  {
    role: "Sales Manager",
    company: "Storage Parts Direct",
    location: "Lake Mary, FL",
    date: "Jul 2024 – Jul 2025",
    current: false,
    promo: "Promoted from Sales & Marketing Associate after 4 months",
    bullets: [
      "Oversaw $100K+ in B2B transactions across BrokerBin, QuickBooks Enterprise, and PayPal.",
      "Managed BigCommerce backend including inventory, discrepancy resolution, and shipping logistics.",
      "Served as primary broker liaison for order verification, technical support, and financial reconciliation.",
    ],
  },
  {
    role: "Curriculum Lead & Technical Instructor",
    company: "Code Ninjas",
    location: "Sanford, FL",
    date: "Apr 2022 – Sep 2024",
    current: false,
    bullets: [
      "Designed and led statewide rollout of a Roblox Lua coding curriculum across multiple franchise locations.",
      "Taught Java and JavaScript to students ages 7–14, translating programming concepts into game mechanics.",
    ],
  },
];

const skills = [
  {
    label: "Languages",
    chips: ["JavaScript", "TypeScript", "Python", "Java", "Lua", "SQL", "Bash", "PowerShell"],
  },
  {
    label: "Frameworks & Libraries",
    chips: ["React", "Next.js", "React Native", "TensorFlow", "Expo", "Flask", "Tailwind CSS"],
  },
  {
    label: "Tools & Platforms",
    chips: ["Supabase", "PostgreSQL", "Vercel", "Git", "Tableau", "OpenAI API", "BigCommerce"],
  },
];

const mockStudents = [
  { name: "Alex K.", major: "CS · Junior",  tags: ["React", "AI/ML"],    bg: "#DBEAFE", fg: "#1D4ED8" },
  { name: "Maya R.", major: "IT · Senior",   tags: ["Python", "Data"],    bg: "#FCE7F3", fg: "#9D174D" },
  { name: "Jordan T.", major: "EE · Soph.",  tags: ["Embedded", "C++"],   bg: "#D1FAE5", fg: "#065F46" },
  { name: "Priya S.", major: "CS · Junior",  tags: ["ML", "Swift"],       bg: "#EDE9FE", fg: "#5B21B6" },
  { name: "Liam W.", major: "IS · Senior",   tags: ["SQL", "Cloud"],      bg: "#FEF3C7", fg: "#92400E" },
  { name: "Sam L.", major: "Math · Soph.",   tags: ["Python", "Stats"],   bg: "#CFFAFE", fg: "#155E75" },
];

// ─── Mac browser mockup (static, embedded in card) ────────────────────────────
function PegasusMockup() {
  return (
    <div className="w-full h-full flex flex-col bg-[#F2F2F7] overflow-hidden rounded-2xl">
      {/* Browser chrome */}
      <div className="flex-shrink-0 bg-[#E8E8E8] px-3 py-2 flex items-center gap-3 border-b border-[#D0D0D0]">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] border border-[#D49A1D]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] border border-[#14A821]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/80 rounded-md px-3 py-0.5 text-[10px] text-gray-400 border border-gray-200 max-w-[180px] w-full text-center truncate">
            pegasuspair.com
          </div>
        </div>
      </div>

      {/* App */}
      <div className="flex-1 overflow-hidden p-2.5 flex flex-col gap-2 min-h-0">
        {/* App nav */}
        <div className="bg-white rounded-xl px-3 py-2 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-yellow-400 flex items-center justify-center text-[9px] font-black text-white">P</div>
            <span className="font-semibold text-[11px] text-gray-900">Pegasus Pair</span>
            <span className="text-[8px] bg-yellow-50 text-yellow-700 border border-yellow-200 px-1.5 py-0.5 rounded-full font-semibold hidden sm:inline">UCF</span>
          </div>
          <span className="text-[9px] text-gray-400 hidden sm:block">1,200+ students</span>
        </div>

        {/* Student cards — no button bar, cleaner */}
        <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0 overflow-hidden">
          {mockStudents.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-2 shadow-sm flex flex-col gap-1.5 overflow-hidden">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: s.bg, color: s.fg }}
              >
                {s.name[0]}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[9px] text-gray-900 truncate">{s.name}</p>
                <p className="text-[8px] text-gray-400 truncate">{s.major}</p>
              </div>
              <div className="flex gap-1 flex-wrap">
                {s.tags.map((t) => (
                  <span key={t} className="px-1 py-0.5 bg-gray-100 text-gray-500 text-[7px] rounded font-medium">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats — prominent, gradient backgrounds */}
        <div className="grid grid-cols-3 gap-1.5 flex-shrink-0">
          {[
            { num: "1,200+", label: "Live Users",   color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" },
            { num: "400K+",  label: "Total Views",  color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
            { num: "1K+",    label: "Followers",    color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-2.5 text-center shadow-sm border"
              style={{ background: s.bg, borderColor: s.border }}
            >
              <p className="text-[15px] font-black leading-tight tracking-tight" style={{ color: s.color }}>
                {s.num}
              </p>
              <p className="text-[8px] font-semibold mt-0.5" style={{ color: s.color, opacity: 0.7 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label + title ────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0071e3] mb-2">{label}</p>
      <h2 className="text-[clamp(28px,5vw,46px)] font-bold tracking-[-0.03em] text-[#1d1d1f]">{title}</h2>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <NavDock />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="hero">
        <AuroraBackground
          showRadialGradient
          className="min-h-screen items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-5xl w-full pb-28 pt-12 md:pt-0 md:pb-24"
          >
            <p className="text-[14px] text-[#86868b] mb-3 font-normal tracking-wide">
              Hello, I&apos;m
            </p>
            <h1 className="text-[clamp(44px,12vw,108px)] font-bold leading-[0.9] tracking-[-0.045em] text-[#1d1d1f] mb-5">
              Tahmid<br />Bhuiyan.
            </h1>
            <p className="text-[clamp(17px,2.5vw,24px)] text-[#86868b] font-light tracking-tight mb-3">
              IT Student &amp; Developer at UCF
            </p>
            <p className="text-[15px] text-[#6e6e73] leading-relaxed mb-8 max-w-md">
              Building things at the intersection of AI and software.
              Based in Orlando, FL.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-2.5 rounded-full bg-[#0071e3] text-white text-[14px] font-medium hover:bg-[#0077ed] active:scale-95 transition-all shadow-sm"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-2.5 rounded-full border border-[#d2d2d7] text-[#0071e3] text-[14px] font-medium hover:bg-[#f5f5f7] active:scale-95 transition-all"
              >
                Get in Touch
              </button>
            </div>
            <div className="flex gap-5">
              <a
                href="https://github.com/tahxmidd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#0071e3] hover:opacity-70 transition-opacity"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/tahxmid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#0071e3] hover:opacity-70 transition-opacity"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        </AuroraBackground>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────────── */}
      <section id="projects" className="bg-[#f5f5f7]">
        {/*
         * Section header sits ABOVE ContainerScroll so "View Projects" lands
         * on something immediately visible. The 3D card animation plays as the
         * user naturally continues scrolling down through the section.
         */}
        <div className="max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-0">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0071e3] mb-2">
              Featured Work
            </p>
            <h2 className="text-[clamp(28px,5vw,46px)] font-bold tracking-[-0.03em] text-[#1d1d1f]">
              Projects
            </h2>
          </FadeIn>
        </div>

        {/* ContainerScroll — Pegasus Pair 3D showcase */}
        <ContainerScroll
          titleComponent={
            <div className="mb-2">
              <h3 className="text-[clamp(24px,4vw,40px)] font-bold tracking-[-0.03em] text-[#1d1d1f] mb-1">
                Pegasus Pair
              </h3>
              <p className="text-[16px] text-[#86868b] font-light">
                UCF Student Matching Platform &nbsp;·&nbsp;
                <a
                  href="https://pegasuspair.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0071e3] hover:opacity-70 transition-opacity"
                >
                  pegasuspair.com ↗
                </a>
              </p>
            </div>
          }
        >
          <PegasusMockup />
        </ContainerScroll>

        {/* Kitchennaire — static card below the scroll animation */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <FadeIn>
            <div className="bg-white rounded-[22px] p-7 md:p-9 border border-black/[0.05] shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-5">
                <div>
                  <h3 className="text-[22px] md:text-[24px] font-semibold tracking-tight mb-1">Kitchennaire</h3>
                  <p className="text-[13px] text-[#86868b]">AI Cooking Assistant</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start">
                  <span className="text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full whitespace-nowrap">
                    Knight Hacks 2025
                  </span>
                  <a
                    href="https://devpost.com/software/kitchennaire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold bg-[#003E54] text-white px-3 py-1.5 rounded-full whitespace-nowrap hover:opacity-80 transition-opacity"
                  >
                    Devpost ↗
                  </a>
                </div>
              </div>

              <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-5">
                Full-stack React Native cooking app generating step-by-step instructions from YouTube transcriptions. Real-time hand gesture control and ingredient identification from photos.
              </p>

              <div className="flex flex-col gap-2 mb-6">
                {[
                  "TensorFlow CNN for real-time hand gesture detection (5+ gestures)",
                  "OpenAI Vision API for ingredient identification from photos",
                  "YouTube transcript parsing for automated recipe generation",
                ].map((h) => (
                  <p key={h} className="text-[13px] text-[#86868b] flex gap-2">
                    <span className="text-[#0071e3] flex-shrink-0">↳</span>
                    <span>{h}</span>
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {["Python", "React Native", "TensorFlow", "Expo", "OpenAI API"].map((t) => (
                  <span key={t} className="text-[11px] font-medium px-2.5 py-1 bg-[#f5f5f7] rounded-full text-[#6e6e73]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex justify-between text-[11px] text-[#86868b]">
                <span>Developer</span>
                <span>October 2025</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────────────── */}
      <section id="experience" className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <SectionHeader label="Work History" title="Experience" />
          </FadeIn>

          <div className="flex flex-col">
            {experience.map((job, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  className={`flex flex-col md:grid md:grid-cols-[160px_1fr] gap-3 md:gap-10 py-8 md:py-9
                    ${i < experience.length - 1 ? "border-b border-[#e8e8ed]" : ""}
                    ${i === 0 ? "pt-0" : ""}`}
                >
                  <div className="flex flex-row md:flex-col gap-2 md:gap-2 items-start pt-0.5">
                    <span className="text-[12px] text-[#86868b]">{job.date}</span>
                    {job.current && (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[17px] md:text-[18px] font-semibold tracking-tight mb-1">{job.role}</h3>
                    <p className="text-[13px] text-[#86868b] mb-1">
                      {job.company} · {job.location}
                    </p>
                    {job.promo && (
                      <p className="text-[12px] text-[#0071e3] font-medium mb-3">{job.promo}</p>
                    )}
                    <ul className="mt-3 flex flex-col gap-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="text-[13px] md:text-[14px] text-[#6e6e73] leading-relaxed pl-4 relative">
                          <span className="absolute left-0 top-[7px] w-1.5 h-px bg-[#d2d2d7]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────────── */}
      <section id="skills" className="bg-[#f5f5f7] py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <SectionHeader label="Technical" title="Skills" />
          </FadeIn>

          <div className="flex flex-col gap-8 md:gap-10 mb-10 md:mb-14">
            {skills.map((group, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#86868b] mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[13px] md:text-[14px] px-3.5 py-1.5 md:px-4 md:py-2 bg-white border border-[#d2d2d7] rounded-full text-[#1d1d1f] hover:border-[#86868b] hover:shadow-sm transition-all cursor-default"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="inline-flex items-center gap-4 bg-white border border-[#d2d2d7] rounded-2xl px-5 py-4">
              <span className="text-lg text-[#0071e3] flex-shrink-0">✦</span>
              <div>
                <p className="text-[14px] md:text-[15px] font-semibold tracking-tight">
                  CompTIA Technology Fundamentals
                </p>
                <p className="text-[11px] md:text-[12px] text-[#86868b]">
                  Competency Certificate · April 2026
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────────────────── */}
      <section id="education" className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <SectionHeader label="Academic" title="Education" />
          </FadeIn>

          <div>
            {[
              {
                school: "University of Central Florida",
                degree: "B.S. in Information Technology",
                note: "Relevant: Computer Logic & Organization",
                date: "Expected May 2028",
                loc: "Orlando, FL",
              },
              {
                school: "Seminole State College",
                degree: "Associate of Arts (A.A.)",
                note: null,
                date: "April 2025",
                loc: "Sanford, FL",
              },
            ].map((edu, i, arr) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className={`flex flex-col sm:flex-row sm:items-start sm:justify-between py-8 gap-3 sm:gap-6
                    ${i < arr.length - 1 ? "border-b border-[#e8e8ed]" : ""}
                    ${i === 0 ? "pt-0" : ""}`}
                >
                  <div>
                    <h3 className="text-[17px] md:text-[19px] font-semibold tracking-tight mb-1">
                      {edu.school}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-[#86868b]">{edu.degree}</p>
                    {edu.note && (
                      <p className="text-[12px] md:text-[13px] text-[#6e6e73] mt-1">{edu.note}</p>
                    )}
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <p className="text-[13px] md:text-[14px] font-medium">{edu.date}</p>
                    <p className="text-[12px] md:text-[13px] text-[#86868b]">{edu.loc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#1d1d1f] py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5ac8fa] mb-2">
              Say Hello
            </p>
            <h2 className="text-[clamp(28px,5vw,46px)] font-bold tracking-[-0.03em] text-[#f5f5f7] mb-3">
              Get in Touch
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#86868b] mb-10 md:mb-14">
              Open to internships, collaborations, and new ideas.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-2">
            {[
              { label: "bashar382@gmail.com", href: "mailto:bashar382@gmail.com" },
              { label: "LinkedIn ↗",          href: "https://linkedin.com/in/tahxmid" },
              { label: "GitHub ↗",            href: "https://github.com/tahxmidd" },
            ].map((link, i) => (
              <FadeIn key={link.href} delay={i * 0.06}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block text-[clamp(20px,4vw,36px)] font-medium text-[#f5f5f7] tracking-tight hover:text-[#5ac8fa] transition-colors w-fit leading-snug"
                >
                  {link.label}
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1d1d1f] border-t border-[#2d2d2f] py-5 pb-28 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-[12px] text-[#6e6e73]">© 2026 Tahmid Bhuiyan</span>
          <span className="text-[12px] text-[#6e6e73]">Lake Mary, FL</span>
        </div>
      </footer>
    </>
  );
}
