'use client';

import React, { useState } from 'react';
import MacOSDock, { DockApp } from '@/components/ui/mac-os-dock';
import {
  House,
  Code2,
  Briefcase,
  Cpu,
  GraduationCap,
  Mail,
  GitFork,
  Globe,
} from 'lucide-react';

// Simple "in" lettermark for LinkedIn
function LinkedInMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2.5" />
      <path d="M14 9c-2.2 0-3.5 1.2-4 2V9h-4v12h4v-6.5c0-1.4.8-2.5 2-2.5s2 1.1 2 2.5V21h4v-7c0-3.3-2-5-4-5z" />
    </svg>
  );
}

// ─── Icon factory: returns a rounded-square icon sized to match dock scaling ──
function makeIcon(
  Icon: React.ElementType,
  gradient: [string, string],
  textColor = '#ffffff'
) {
  return (size: number): React.ReactNode => {
    const radius = size * 0.22;
    const iconSize = size * 0.48;
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: `linear-gradient(145deg, ${gradient[0]}, ${gradient[1]})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 ${size * 0.04}px ${size * 0.14}px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.2)`,
          flexShrink: 0,
        }}
      >
        <Icon size={iconSize} color={textColor} strokeWidth={1.6} />
      </div>
    );
  };
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS: DockApp[] = [
  {
    id: 'hero',
    name: 'Home',
    icon: makeIcon(House, ['#2196F3', '#0D47A1']),
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: makeIcon(Code2, ['#8B5CF6', '#4C1D95']),
  },
  {
    id: 'experience',
    name: 'Experience',
    icon: makeIcon(Briefcase, ['#10B981', '#064E3B']),
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: makeIcon(Cpu, ['#F59E0B', '#92400E']),
  },
  {
    id: 'education',
    name: 'Education',
    icon: makeIcon(GraduationCap, ['#06B6D4', '#164E63']),
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: makeIcon(Mail, ['#EF4444', '#7F1D1D']),
  },
];

const EXTERNAL_ITEMS: DockApp[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: makeIcon(GitFork, ['#374151', '#111827']),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: (size: number) => {
      const radius = size * 0.22;
      const iconSize = size * 0.48;
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            background: 'linear-gradient(145deg, #0EA5E9, #1e3a5f)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 ${size * 0.04}px ${size * 0.14}px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.2)`,
            flexShrink: 0,
          }}
        >
          <LinkedInMark size={iconSize} />
        </div>
      );
    },
  },
];

// Thin separator rendered as a special dock item
const SEPARATOR: DockApp = {
  id: '__sep__',
  name: '',
  icon: (size: number) => (
    <div
      style={{
        width: 1,
        height: size * 0.72,
        borderRadius: 1,
        background: 'rgba(255,255,255,0.18)',
        alignSelf: 'center',
        marginTop: size * 0.14,
      }}
    />
  ),
};

const ALL_ITEMS: DockApp[] = [...NAV_ITEMS, SEPARATOR, ...EXTERNAL_ITEMS];

const SECTION_IDS: Record<string, string> = {
  hero: 'hero',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  education: 'education',
  contact: 'contact',
};

const EXTERNAL_LINKS: Record<string, string> = {
  github: 'https://github.com/tahxmidd',
  linkedin: 'https://linkedin.com/in/tahxmid',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function NavDock() {
  const [activeId, setActiveId] = useState<string>('hero');

  const handleAppClick = (appId: string) => {
    if (appId === '__sep__') return;

    if (EXTERNAL_LINKS[appId]) {
      window.open(EXTERNAL_LINKS[appId], '_blank', 'noopener,noreferrer');
      return;
    }

    const sectionId = SECTION_IDS[appId];
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      setActiveId(appId);
    }
  };

  return (
    /*
     * Outer: fixed full-width row, flex-centered.
     * Inner: on mobile → overflow-x scrollable (dock may exceed narrow screens),
     *        overflow-y hidden (no hover = no tooltips to clip).
     *        On sm+ → overflow visible so the hover label floats above freely.
     */
    <div className="fixed bottom-4 sm:bottom-5 left-0 right-0 z-50 flex justify-center px-2">
      <div
        className="overflow-x-auto overflow-y-hidden sm:overflow-visible"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          maxWidth: '100%',
        } as React.CSSProperties}
      >
        <MacOSDock
          apps={ALL_ITEMS}
          onAppClick={handleAppClick}
          openApps={[activeId]}
        />
      </div>
    </div>
  );
}
