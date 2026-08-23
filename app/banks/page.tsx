'use client';

import Link from 'next/link';
import { ShieldCheck, GitPullRequest, Send, CheckCircle2, ChevronRight, Activity, Terminal } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const supportedBanks = [
  { name: 'Commercial Bank of Ethiopia (CBE)', short: 'CBE', type: 'Bank', status: 'Live', req: 'Account required', desc: 'Commercial Bank of Ethiopia (CBE) is the largest bank in Ethiopia and the most common settlement rail for Ethiopian businesses.', color: 'from-emerald-500/20 to-emerald-500/0', border: 'hover:border-emerald-500/50' },
  { name: 'Telebirr', short: 'Telebirr', type: 'Mobile wallet', status: 'Live', req: 'Ethiopia only', desc: "Telebirr is Ethio Telecom's mobile money service and the most widely used digital wallet in Ethiopia. Telebirr receipts are extracted via public HTML endpoints.", color: 'from-blue-500/20 to-blue-500/0', border: 'hover:border-blue-500/50' },
  { name: 'Bank of Abyssinia (BOA)', short: 'BOA', type: 'Bank', status: 'Live', req: 'Account required', desc: "Bank of Abyssinia (BOA) is one of Ethiopia's largest private banks. BOA publishes receipt data via a public API.", color: 'from-amber-500/20 to-amber-500/0', border: 'hover:border-amber-500/50' },
  { name: 'M-Pesa', short: 'M-Pesa', type: 'Mobile wallet', status: 'Live', req: 'Ethiopia only', desc: "M-Pesa Ethiopia is Safaricom's mobile money service operating in Ethiopia. M-Pesa receipts are available via a public JSON endpoint.", color: 'from-green-500/20 to-green-500/0', border: 'hover:border-green-500/50' },
  { name: 'Dashen Bank', short: 'Dashen', type: 'Bank', status: 'Live', req: 'Reference only', desc: 'Dashen Bank publishes transaction receipts as public documents. The URL works for both within-Dashen and Other Bank transfers.', color: 'from-yellow-500/20 to-yellow-500/0', border: 'hover:border-yellow-500/50' },
  { name: 'Awash Bank', short: 'Awash', type: 'Bank', status: 'Live', req: 'Reference only', desc: 'Awash Bank publishes transaction receipts as public HTML pages on awashpay.awashbank.com. The share link uses a two-part token system.', color: 'from-cyan-500/20 to-cyan-500/0', border: 'hover:border-cyan-500/50' },
  { name: 'Zemen Bank', short: 'Zemen', type: 'Bank', status: 'Live', req: 'Reference only', desc: 'Zemen Bank is an Ethiopian commercial bank. Zemen receipts are published as PDF documents accessible via a public URL.', color: 'from-purple-500/20 to-purple-500/0', border: 'hover:border-purple-500/50' },
  { name: 'CBE Birr', short: 'CBE Birr', type: 'Wallet', status: 'Live', req: 'Reference only', desc: "CBE Birr is the Commercial Bank of Ethiopia's mobile wallet service. CBE Birr receipts require the transaction reference.", color: 'from-emerald-400/20 to-emerald-400/0', border: 'hover:border-emerald-400/50' },
  { name: 'Siinqee Bank', short: 'Siinqee', type: 'Bank', status: 'Live', req: 'Reference only', desc: 'Siinqee Bank is an Ethiopian microfinance institution turned bank. Siinqee receipts are available via a public endpoint.', color: 'from-indigo-500/20 to-indigo-500/0', border: 'hover:border-indigo-500/50' },
  { name: 'eBirr', short: 'eBirr', type: 'Mobile wallet', status: 'Live', req: 'Reference only', desc: 'eBirr is a mobile money platform connecting multiple Ethiopian financial institutions including Nib, Wegagen, and Ahada.', color: 'from-rose-500/20 to-rose-500/0', border: 'hover:border-rose-500/50' },
];

const neededBanks = [
  'Abay', 'Addis Bank', 'Amhara', 'Berhan', 'Bunna', 'Enat', 'Global Bank', 'Lion Bank', 'Oromia Bank', 'Hibret', 'ZamZam', 'Hijra', 'Shabelle', 'Goh Betoch', 'Tsedey', 'Gadaa', 'Rammis'
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function BanksPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none"></div>

      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto z-10 relative bg-transparent backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
          <ShieldCheck className="text-emerald-500 group-hover:scale-110 transition-transform duration-300" size={28} />
          <span>epv.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="/verify" className="hover:text-white transition-colors">Verify</Link>
          <Link href="/banks" className="text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-colors">Banks</Link>
          <Link href="/docs/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Developers</Link>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button className="hover:text-white transition-colors flex items-center gap-1">EN</button>
          <a href="https://github.com/nahomtechet/ethiopian-payment-verifier" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
            <GitPullRequest size={16} /> GitHub
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl mb-24 text-center mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Activity size={16} /> Live Endpoints Supported
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">
            Supported Banks <br/>& Wallets
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            epv currently integrates with <strong className="text-white">{supportedBanks.length} Ethiopian financial institutions</strong>. All verification is done via direct public endpoints. Zero middleware. Zero API keys.
          </p>
        </motion.div>

        {/* Supported Banks Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32"
        >
          {supportedBanks.map((bank, i) => (
            <motion.div key={i} variants={itemVariants} className={`group relative bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 backdrop-blur-md overflow-hidden transition-all duration-300 ${bank.border} hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${bank.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-2xl mb-1 text-white group-hover:text-emerald-50 transition-colors">{bank.short}</h3>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">{bank.type}</span>
                  </div>
                  <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-medium shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    {bank.status}
                  </span>
                </div>
                
                <p className="text-sm text-neutral-400 flex-1 mb-8 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {bank.desc}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <div className="text-xs text-neutral-500 font-mono flex items-center gap-2">
                    <Terminal size={14} className="text-neutral-600" />
                    {bank.req}
                  </div>
                  <ChevronRight size={16} className="text-neutral-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-[2.5rem] p-10 md:p-16 mb-32 overflow-hidden shadow-2xl"
        >
          {/* Decorative background glow for CTA */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-3 py-1.5 rounded-full font-semibold mb-8 uppercase tracking-widest">
                <GitPullRequest size={14} /> Open Source
              </div>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-white">Help us map the ecosystem.</h2>
              <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                <span className="text-white font-medium">21 Ethiopian banks</span> still need receipt endpoints. If you use one of these banks and can share a receipt with a QR code or receipt URL, we can reverse-engineer the endpoint and add it for free. No technical knowledge needed!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://github.com/nahomtechet/ethiopian-payment-verifier/issues/new" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-neutral-200 transition-all hover:scale-[1.02]"
                >
                  <GitPullRequest size={20} className="group-hover:-rotate-12 transition-transform" /> Submit on GitHub
                </a>
                <a 
                  href="https://t.me/devidsess" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2 bg-neutral-800 text-white border border-neutral-700 px-8 py-4 rounded-2xl font-bold hover:bg-neutral-700 hover:border-neutral-600 transition-all hover:scale-[1.02]"
                >
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send via Telegram
                </a>
              </div>
            </div>
            
            <div className="bg-black/50 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Activity size={18} className="text-neutral-500" />
                Banks awaiting integration:
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {neededBanks.map((name, i) => (
                  <motion.span 
                    key={name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors text-sm px-4 py-2 rounded-full cursor-default"
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Ways to Contribute */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Three ways to contribute</h2>
            <p className="text-neutral-400">Join the community in building open financial infrastructure.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Share a receipt', desc: 'Send us a receipt screenshot or URL from a bank we don\'t support yet. We\'ll figure out the endpoint.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { num: '02', title: 'Write a parser', desc: 'If you code, fork the repo and add a parser. The architecture is modular, each bank is a self-contained module.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { num: '03', title: 'Report breakages', desc: 'If a bank changes their receipt URL format, open an issue on GitHub. We fix it fast because the community patches it.', color: 'text-purple-400', bg: 'bg-purple-500/10' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative p-8 rounded-3xl border border-neutral-800 bg-neutral-950/50 hover:bg-neutral-900 transition-colors"
              >
                <div className={`w-12 h-12 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center font-bold text-xl mb-6 font-mono border border-current/20 group-hover:scale-110 transition-transform`}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
