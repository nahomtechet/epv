'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, X, ArrowRight, ExternalLink, Activity, GitPullRequest, Terminal, Smartphone, Server, Plus, Minus, Search, Globe } from 'lucide-react';

// Pricing Data
const pricingData = [
  { feature: 'Price', epv: 'Free forever', checket: '499 ETB/mo', verifyet: '$20-40/mo', qbirr: '500-8K ETB/mo', tinaverify: '3K-8K ETB/90d', tally: 'Unknown' },
  { feature: 'Free tier', epv: 'Unlimited', checket: '200 one-time', verifyet: '200 one-time', qbirr: '50/mo', tinaverify: '-', tally: 'Unknown' },
  { feature: 'Per-verify cost', epv: '0 ETB', checket: '~2.5 ETB at 200/mo', verifyet: '~$0.10-0.20', qbirr: '0.50-0.84 ETB', tinaverify: '0.84-0.91 ETB', tally: 'Unknown' },
  { feature: 'Signup required', epv: 'No', checket: 'Yes (phone+SMS)', verifyet: 'Yes (Telegram)', qbirr: 'Yes (email)', tinaverify: 'Yes (email)', tally: 'Yes (Telegram)' },
  { feature: 'API key required', epv: 'No', checket: 'Yes (business)', verifyet: 'Yes', qbirr: 'Yes', tinaverify: '-', tally: '-' },
];

// Features Data
const featuresData = [
  { feature: 'Banks supported', epv: '31', checket: '9', verifyet: '10', qbirr: '7', tinaverify: '6', tally: '4' },
  { feature: 'Banks live', epv: '10', checket: '9', verifyet: '9', qbirr: '7', tinaverify: '6', tally: '4' },
  { feature: 'REST API', epv: true, checket: true, verifyet: true, qbirr: true, tinaverify: false, tally: false },
  { feature: 'QR code scanning', epv: true, checket: true, verifyet: true, qbirr: false, tinaverify: true, tally: false },
  { feature: 'BOA QR decryption', epv: true, checket: false, verifyet: false, qbirr: false, tinaverify: false, tally: false },
  { feature: 'Batch verification', epv: true, checket: false, verifyet: false, qbirr: false, tinaverify: false, tally: false },
  { feature: 'Mobile app', epv: 'PWA', checket: 'PWA', verifyet: 'Android', qbirr: '-', tinaverify: 'iOS+Android', tally: 'Unreleased' },
  { feature: 'Geo-block bypass', epv: false, checket: false, verifyet: false, qbirr: true, tinaverify: false, tally: true },
  { feature: 'Duplicate detection', epv: false, checket: 'Per-branch', verifyet: 'History', qbirr: 'Per-merchant', tinaverify: 'Audit trail', tally: false },
  { feature: 'Amount tolerance check', epv: false, checket: false, verifyet: false, qbirr: true, tinaverify: false, tally: false },
];

// Transparency Data
const transparencyData = [
  { feature: 'Open source', epv: true, checket: false, verifyet: false, qbirr: false, tinaverify: false, tally: false },
  { feature: 'Self-hosting', epv: true, checket: false, verifyet: false, qbirr: false, tinaverify: false, tally: false },
  { feature: 'Source URL shown', epv: true, checket: false, verifyet: false, qbirr: false, tinaverify: false, tally: false },
  { feature: 'AI crawler access', epv: true, checket: true, verifyet: false, qbirr: true, tinaverify: true, tally: true },
  { feature: 'Python library', epv: true, checket: false, verifyet: false, qbirr: 'Advertised', tinaverify: false, tally: false },
  { feature: 'TypeScript SDK', epv: true, checket: false, verifyet: true, qbirr: 'Advertised', tinaverify: false, tally: false },
];

// Profiles
const profiles = [
  { 
    name: 'check.et', 
    url: 'https://check.et', 
    banks: '9 banks, all live', 
    subtitle: 'The established player', 
    pricing: '499 ETB/mo or 4,990/yr. 200 free (one-time, not monthly).',
    strengths: ['Bilingual (EN + Amharic)', 'Polished UI, good SEO content', 'Employee management, roles', 'Webhooks on Pro plan', 'Affiliate program (250 ETB/referral)'],
    limitations: ['Charges for public data', '200 free verifications are one-time', 'API requires business account', 'No self-hosting, no open source', 'Receipt source URLs hidden'],
    tech: 'Next.js, Vercel, Cloudflare'
  },
  { 
    name: 'verify.et', 
    url: 'https://verify.et', 
    banks: '11 banks, 10 live', 
    subtitle: "Suba Software's offering", 
    pricing: '$20-40/mo USD. 200 free (one-time).',
    strengths: ['Android app on Play Store', 'Blog content, status pages per bank', 'TypeScript SDK published'],
    limitations: ['Charges in USD', 'Requires Telegram OAuth signup', 'Blocks AI crawlers (GPTBot, ClaudeBot, CCBot)', 'No open source, no self-hosting', 'No batch verification, no Python library'],
    tech: 'React, Cloudflare'
  },
  { 
    name: 'qbirr.com', 
    url: 'https://qbirr.com', 
    banks: '7 banks, all live', 
    subtitle: 'Developer-first API (launched June 2026)', 
    pricing: '50/mo free. 500-8K ETB/mo for 1K-100K verifications.',
    strengths: ['Clean REST API with rate limits', 'Ethiopian relay for Telebirr/M-Pesa geo-block', 'Configurable amount tolerance per merchant', 'Per-merchant duplicate ref locking', 'Scale plan with 99.9% SLA'],
    limitations: ['Brand new (day-one launch)', '4 SDKs advertised but none published', 'No mobile app, no QR scanning', 'No web UI for verification', 'English only, fewer banks than check.et'],
    tech: 'NestJS, Contabo VPS (France)'
  },
  { 
    name: 'tinaverify.com', 
    url: 'https://tinaverify.com', 
    banks: '6 banks, all live', 
    subtitle: 'Mobile-first for cashiers', 
    pricing: 'Credit-based. 3K ETB / 3,300 credits or 8K ETB / 9,500 credits. 90-day validity.',
    strengths: ['Published iOS + Android apps', 'Cashier workflow: scan, verify, audit trail', 'Multi-branch support', 'Search by cashier, branch, amount, reference', 'Daily sales tracking'],
    limitations: ['No REST API', 'Credit-based pricing (expires in 90 days)', 'No open source, no self-hosting', 'No batch verification', 'Fewer banks than check.et/verify.et'],
    tech: 'Next.js (App Router, Turbopack)'
  },
  { 
    name: 'tally.com.et', 
    url: 'https://tally.com.et', 
    banks: '4 banks (CBE, Telebirr, BOA, Awash)', 
    subtitle: 'Telegram bot by Sabi LLC', 
    pricing: 'Not public. Pricing link is a dead anchor.',
    strengths: ['Telegram bot delivery (low friction)', 'Ethiopian-hosted (Ethio Telecom IP)', 'Workspace codes for staff'],
    limitations: ['Only 4 banks', 'No web app, no API, no docs', 'Mobile app claimed but store links are dead', 'SSL certificate expired April 2026, unrenewed', 'No pricing transparency'],
    tech: 'Static HTML + Tailwind CDN, nginx/Plesk, Ethiopian IP'
  }
];

const openSourceProjects = [
  { name: 'ethiobank_receipts', stars: 40, desc: 'Python library, 6 banks, requires Selenium for BOA, no web UI, no API, PyPI published', url: 'https://github.com/NahomAl/ethiobank_receipts' },
  { name: 'verification-engine', stars: 1, desc: 'TypeScript engine, 4 banks, 5 verification methods, npm published as @localpay/verification-engine', url: 'https://github.com/oneshotEFA/verification-engine' },
  { name: 'telebirr-receipt', stars: 14, desc: 'Node.js package for Telebirr receipt parsing only, npm published', url: 'https://github.com/TheRealYT/telebirr-receipt' },
  { name: 'receipt_verify', stars: 2, desc: 'NestJS + PostgreSQL backend, Telebirr + CBE, duplicate prevention, Prisma ORM', url: 'https://github.com/TsinatKibru/receipt_verify' },
  { name: 'veri-py', stars: 0, desc: 'Python toolkit, async/sync, 6 banks, image verification via OpenAI, PyPI published', url: 'https://github.com/nahom-d54/veri-py' },
  { name: 'receipt-verifier', stars: 0, desc: 'Python FastAPI microservice for Ethiopian bank receipts', url: 'https://github.com/barok21/receipt-verifier' },
];

const renderCell = (value: any) => {
  if (value === true) return <Check size={18} className="text-emerald-500 mx-auto" />;
  if (value === false) return <X size={18} className="text-neutral-700 mx-auto" />;
  if (value === '-') return <span className="text-neutral-600">-</span>;
  return <span className="text-neutral-300">{value}</span>;
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto z-10 relative bg-transparent">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
          <ShieldCheck className="text-emerald-500 group-hover:scale-110 transition-transform duration-300" size={28} />
          <span>epv.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="/verify" className="hover:text-white transition-colors">Verify</Link>
          <Link href="/banks" className="hover:text-white transition-colors">Banks</Link>
          <Link href="/docs/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Developers</Link>
          <Link href="/compare" className="text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-colors">Compare</Link>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button className="hover:text-white transition-colors flex items-center gap-1">EN</button>
          <a href="https://github.com/nahomtechet/ethiopian-payment-verifier" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20 text-center mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
            How the services compare
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            Six receipt verification tools in Ethiopia. All use the same public bank endpoints. Compare pricing, features, and transparency.
          </p>
          <div className="mt-8">
            <Link href="/verify" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-full font-bold transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Use epv for free <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Feature Comparison Tables */}
        <div className="mb-24 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Pricing */}
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20"><Search size={16} /></span>
              Pricing and access
            </h3>
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden mb-16 backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-black/40 text-neutral-400">
                    <th className="py-4 px-6 text-left font-semibold w-1/5">Feature</th>
                    <th className="py-4 px-4 text-center font-bold text-emerald-400 w-1/6">epv</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">check.et</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">verify.et</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">qbirr</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">tinaverify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {pricingData.map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{row.feature}</td>
                      <td className="py-4 px-4 text-center font-bold text-emerald-400 bg-emerald-500/5">{renderCell(row.epv)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.checket)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.verifyet)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.qbirr)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.tinaverify)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Features */}
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20"><Activity size={16} /></span>
              Platform and features
            </h3>
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden mb-16 backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-black/40 text-neutral-400">
                    <th className="py-4 px-6 text-left font-semibold w-1/5">Feature</th>
                    <th className="py-4 px-4 text-center font-bold text-emerald-400 w-1/6">epv</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">check.et</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">verify.et</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">qbirr</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">tinaverify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {featuresData.map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{row.feature}</td>
                      <td className="py-4 px-4 text-center font-bold text-emerald-400 bg-emerald-500/5">{renderCell(row.epv)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.checket)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.verifyet)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.qbirr)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.tinaverify)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transparency */}
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20"><Globe size={16} /></span>
              Transparency and openness
            </h3>
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden mb-24 backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-black/40 text-neutral-400">
                    <th className="py-4 px-6 text-left font-semibold w-1/5">Feature</th>
                    <th className="py-4 px-4 text-center font-bold text-emerald-400 w-1/6">epv</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">check.et</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">verify.et</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">qbirr</th>
                    <th className="py-4 px-4 text-center font-semibold w-1/6">tinaverify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {transparencyData.map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{row.feature}</td>
                      <td className="py-4 px-4 text-center font-bold text-emerald-400 bg-emerald-500/5">{renderCell(row.epv)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.checket)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.verifyet)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.qbirr)}</td>
                      <td className="py-4 px-4 text-center">{renderCell(row.tinaverify)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-20 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">What they all have in common</h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-6">
            Every Ethiopian bank and mobile wallet publishes transaction receipts at public URLs. These URLs require no authentication. Anyone can access them. This is by design: banks want merchants and customers to verify payments.
          </p>
          <a href="#" className="text-emerald-500 font-medium hover:text-emerald-400">Read the full guide &rarr;</a>
        </div>

        <h2 className="text-4xl font-extrabold mb-12 text-center">Service profiles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {profiles.map((profile, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-8 flex flex-col hover:border-neutral-700 transition-colors"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {profile.name}
                  </h3>
                  <a href={profile.url} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </a>
                </div>
                <div className="text-sm font-medium text-neutral-400 mb-1">{profile.subtitle}</div>
                <div className="inline-block bg-neutral-800 text-xs px-2 py-1 rounded-md text-neutral-300 mt-2">{profile.banks}</div>
              </div>
              
              <div className="text-sm text-neutral-300 mb-6 font-mono p-3 bg-black rounded-lg border border-neutral-800">
                {profile.pricing}
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {profile.strengths.map((str, j) => (
                      <li key={j} className="text-sm text-neutral-300 flex items-start gap-2">
                        <Plus size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Limitations</h4>
                  <ul className="space-y-2">
                    {profile.limitations.map((lim, j) => (
                      <li key={j} className="text-sm text-neutral-400 flex items-start gap-2">
                        <Minus size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <div className="text-xs text-neutral-500 flex items-center gap-2">
                  <Server size={14} /> {profile.tech}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-3xl font-extrabold mb-8">Other open source projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {openSourceProjects.map((proj, i) => (
            <a key={i} href={proj.url} target="_blank" rel="noreferrer" className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 block hover:bg-neutral-900 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <GitPullRequest size={16} /> {proj.name}
                </h3>
                <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                  ★ {proj.stars}
                </span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {proj.desc}
              </p>
            </a>
          ))}
        </div>
        
        <div className="text-center max-w-2xl mx-auto pb-10">
          <p className="text-xl text-white font-medium mb-6 leading-relaxed">
            epv combines these approaches: a web UI, REST API, batch verification, TypeScript SDK, Python library, Docker, 10 live banks, guide pages, and BOA QR decryption. All free and open source.
          </p>
          <Link href="/verify" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neutral-200 transition-all">
            Get started with epv
          </Link>
        </div>

      </main>
    </div>
  );
}
