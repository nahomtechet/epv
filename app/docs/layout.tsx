import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 flex flex-col">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full border-b border-neutral-900 z-10 bg-black sticky top-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <ShieldCheck className="text-emerald-500" size={28} />
          <span className="hidden sm:inline">epv.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <Link href="/verify" className="hover:text-white transition-colors">Verify</Link>
          <Link href="/#banks" className="hover:text-white transition-colors">Banks</Link>
          <Link href="/docs/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/docs" className="text-emerald-500 transition-colors">Developers</Link>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button className="hover:text-white transition-colors flex items-center gap-1">
            EN
          </button>
          <a href="https://github.com/nahomtechet/ethiopian-payment-verifier" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full grid md:grid-cols-[250px_1fr] gap-8 px-6 py-12">
        {/* Sidebar */}
        <aside className="hidden md:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pr-6 border-r border-neutral-900">
          <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Getting Started</h3>
          <ul className="space-y-3 text-sm text-neutral-400 mb-8">
            <li><Link href="/docs" className="hover:text-white flex items-center justify-between group">Overview <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
            <li><Link href="/docs/installation" className="hover:text-white flex items-center justify-between group">Installation <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
          </ul>

          <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Core API</h3>
          <ul className="space-y-3 text-sm text-neutral-400 mb-8">
            <li><Link href="/docs/verify-online" className="hover:text-white flex items-center justify-between group">verifyOnline <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
            <li><Link href="/docs/verify-image" className="hover:text-white flex items-center justify-between group">verifyImage (OCR) <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
          </ul>

          <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Integrations</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><Link href="/docs/express" className="hover:text-white flex items-center justify-between group">Express Middleware <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
            <li><Link href="/docs/nextjs" className="hover:text-white flex items-center justify-between group">Next.js Server Actions <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
          </ul>
        </aside>

        {/* Content */}
        <main className="prose prose-invert prose-emerald max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}
