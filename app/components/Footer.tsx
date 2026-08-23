import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
            <ShieldCheck className="text-emerald-500" size={28} />
            <span>epv.</span>
          </Link>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
            Free, open-source Ethiopian receipt verification. MIT licensed. Not affiliated with any Ethiopian bank or wallet.
          </p>
          <button className="text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
            Help translate
          </button>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Banks</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><Link href="/banks#cbe" className="hover:text-emerald-400 transition-colors">CBE</Link></li>
            <li><Link href="/banks#telebirr" className="hover:text-emerald-400 transition-colors">Telebirr</Link></li>
            <li><Link href="/banks#boa" className="hover:text-emerald-400 transition-colors">BOA</Link></li>
            <li><Link href="/banks#mpesa" className="hover:text-emerald-400 transition-colors">M-Pesa</Link></li>
            <li><Link href="/banks#dashen" className="hover:text-emerald-400 transition-colors">Dashen</Link></li>
            <li><Link href="/banks" className="hover:text-emerald-400 transition-colors mt-2 inline-block">All Banks &rarr;</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Guides</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><Link href="/docs/guides/verify-cbe" className="hover:text-emerald-400 transition-colors">Verify CBE</Link></li>
            <li><Link href="/docs/guides/verify-telebirr" className="hover:text-emerald-400 transition-colors">Verify Telebirr</Link></li>
            <li><Link href="/docs/guides/fraud" className="hover:text-emerald-400 transition-colors">Payment fraud</Link></li>
            <li><Link href="/docs/guides/add-bank" className="hover:text-emerald-400 transition-colors">Add a bank</Link></li>
            <li><Link href="/docs/guides" className="hover:text-emerald-400 transition-colors mt-2 inline-block">All guides &rarr;</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><Link href="/docs" className="hover:text-emerald-400 transition-colors">API Docs</Link></li>
            <li><a href="https://github.com/nahomtechet/ethiopian-payment-verifier" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">GitHub</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Python SDK</a></li>
            <li><Link href="/verify" className="hover:text-emerald-400 transition-colors">Verify Receipt</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-900 text-xs text-neutral-600 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} ethiopian-payment-verifier. MIT Licensed.</p>
        <p className="mt-2 md:mt-0">Not affiliated with any Ethiopian bank or wallet.</p>
      </div>
    </footer>
  );
}
