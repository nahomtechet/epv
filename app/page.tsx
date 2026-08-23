'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Terminal, Code2, Layers, GitPullRequest, Search, CheckCircle2, Server, Globe, Lock, Cpu, BarChart3, Database, MessageSquare, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto z-10 relative bg-transparent">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight group">
          <ShieldCheck className="text-emerald-500 group-hover:scale-110 transition-transform duration-300" size={28} />
          <span>epv.</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="/verify" className="hover:text-white transition-colors">Verify</Link>
          <Link href="/banks" className="hover:text-white transition-colors">Banks</Link>
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

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32 relative z-10">
        
        {/* 1. Hero Section (Split Layout) */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-40 mt-4">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              epv v3.0 is live
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.15]"
            >
              Zero forgery. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">100% Live.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-neutral-400 mb-8 max-w-2xl leading-relaxed"
            >
              Verify payment receipts from Telebirr, CBE, M-PESA, and Dashen by scraping their live public portals. The ultimate verification SDK for Ethiopian developers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link 
                href="/docs"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neutral-200 transition-all hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                Read the Docs
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/verify"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-neutral-900 border border-neutral-700 text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 hover:border-neutral-500 transition-all hover:scale-[1.02]"
              >
                <Search size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                Verify a Receipt
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Visual Element on the Right */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-3xl -z-10 rounded-full"></div>
            
            <div className="grid grid-cols-2 gap-4 perspective-1000">
              <div className="space-y-4 translate-y-12 animate-[float_6s_ease-in-out_infinite]">
                <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center"><ShieldCheck className="text-emerald-500" size={20}/></div>
                    <div className="font-bold text-lg">CBE Verified</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-neutral-800 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-neutral-800 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"><ShieldCheck className="text-blue-500" size={20}/></div>
                    <div className="font-bold text-lg">Telebirr Verified</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-5/6 bg-neutral-800 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-neutral-800 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 -translate-y-4 animate-[float_8s_ease-in-out_infinite_reverse]">
                <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center"><ShieldCheck className="text-purple-500" size={20}/></div>
                    <div className="font-bold text-lg">Zemen Verified</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-2/3 bg-neutral-800 rounded-full"></div>
                    <div className="h-2 w-1/3 bg-neutral-800 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-emerald-500 p-6 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <div className="font-black text-black text-3xl mb-2">1.5s</div>
                  <div className="text-emerald-950 font-bold">Avg Response Time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. Quick Stats Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-40"
        >
          {[
            { value: '10', label: 'Supported Banks' },
            { value: '0', label: 'API Keys Required' },
            { value: '< 2s', label: 'Verification Speed' },
            { value: '100%', label: 'Open Source' },
          ].map((stat, i) => (
            <div key={i} className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 text-center backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.section>

        {/* 3. Code Preview / Architecture */}
        <section className="mb-40 flex flex-col items-center">
          <div className="text-center max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Integrate in minutes, <br/> not weeks.</h2>
            <p className="text-xl text-neutral-400">We&apos;ve handled the chaotic scraping, token negotiation, and parsing logic. You just call one method.</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-3xl -z-10 rounded-full"></div>
            <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-left">
              <div className="flex items-center gap-2 px-6 py-4 bg-neutral-900/80 border-b border-neutral-800 backdrop-blur-md">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-neutral-500 font-mono ml-4 flex items-center gap-2"><Code2 size={14}/> api/verify/route.ts</span>
              </div>
              <div className="p-8 font-mono text-sm overflow-x-auto">
                <pre className="text-neutral-300 leading-loose">
<span className="text-purple-400">import</span> &#123; PaymentVerifier &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;ethiopian-payment-verifier&apos;</span>;
<br/><br/>
<span className="text-purple-400">const</span> verifier = <span className="text-purple-400">new</span> <span className="text-yellow-200">PaymentVerifier</span>();
<br/><br/>
<span className="text-purple-400">export async function</span> <span className="text-blue-400">POST</span>(req: Request) &#123;<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> &#123; reference &#125; = <span className="text-purple-400">await</span> req.<span className="text-blue-400">json</span>();<br/>
<br/>
&nbsp;&nbsp;<span className="text-neutral-500"> epv auto-detects the bank and scrapes the public endpoint</span><br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> result = <span className="text-purple-400">await</span> verifier.<span className="text-blue-400">verifyOnline</span>(reference);<br/>
<br/>
&nbsp;&nbsp;<span className="text-purple-400">if</span> (result.success) &#123;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;console.<span className="text-blue-400">log</span>(<span className="text-emerald-400">`Verified </span><span className="text-blue-400">$&#123;</span>result.data.amount<span className="text-blue-400">&#125;</span><span className="text-emerald-400"> ETB from </span><span className="text-blue-400">$&#123;</span>result.data.bank<span className="text-blue-400">&#125;</span><span className="text-emerald-400">`</span>);<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> Response.<span className="text-blue-400">json</span>(result.data);<br/>
&nbsp;&nbsp;&#125;<br/>
<br/>
&nbsp;&nbsp;<span className="text-purple-400">return</span> Response.<span className="text-blue-400">json</span>(&#123; error: result.error &#125;, &#123; status: <span className="text-orange-400">400</span> &#125;);<br/>
&#125;
                </pre>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. How it works (Step by step) */}
        <section className="mb-40">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">How it actually works</h2>
            <p className="text-xl text-neutral-400">No magic. Just utilizing the public infrastructure that Ethiopian banks already provide for receipt verification.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-8xl font-black text-neutral-900 absolute -top-10 -left-4 z-0 select-none">1</div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20"><Search size={24}/></div>
                <h3 className="text-2xl font-bold mb-4">Input Reference</h3>
                <p className="text-neutral-400 leading-relaxed">You provide a transaction reference number (e.g. `FT...` for CBE or `CHQ...` for Telebirr) to our verifier instance.</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-8xl font-black text-neutral-900 absolute -top-10 -left-4 z-0 select-none">2</div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/20"><Globe size={24}/></div>
                <h3 className="text-2xl font-bold mb-4">Scrape Public Portal</h3>
                <p className="text-neutral-400 leading-relaxed">Our SDK automatically determines the bank, requests the public verification portal URL, and parses the raw HTML/JSON response.</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-8xl font-black text-neutral-900 absolute -top-10 -left-4 z-0 select-none">3</div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/20"><Database size={24}/></div>
                <h3 className="text-2xl font-bold mb-4">Return Clean JSON</h3>
                <p className="text-neutral-400 leading-relaxed">We extract the amount, date, sender, and receiver, normalizing the chaotic bank data into one unified TypeScript interface.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Expanded Feature Grid */}
        <section className="mb-40">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Engineered for Production</h2>
            <p className="text-xl text-neutral-400">Everything you need to build secure payment flows in Ethiopia.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<ShieldCheck className="text-emerald-500" size={28} />}
              title="Ironclad Security"
              description="Dropped offline SMS parsing entirely. Receipts are validated strictly against the bank's live public portal."
            />
            <FeatureCard 
              icon={<Zap className="text-blue-500" size={28} />}
              title="Blazing Fast Integration"
              description="Built-in Express middleware and Next.js Server Actions. Verify payments from any stack rapidly."
            />
            <FeatureCard 
              icon={<Layers className="text-purple-500" size={28} />}
              title="Unified Architecture"
              description="One VerificationPayload interface seamlessly handles all 10 major Ethiopian banks and mobile wallets."
            />
            <FeatureCard 
              icon={<Cpu className="text-rose-500" size={28} />}
              title="Self-Hostable"
              description="Deploy epv entirely on your own infrastructure. Bypass geo-blocks using an Ethiopian IP relay."
            />
            <FeatureCard 
              icon={<Lock className="text-amber-500" size={28} />}
              title="Zero API Keys"
              description="No signups. No rate limits from our end. You are making requests directly to the bank's servers."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-cyan-500" size={28} />}
              title="Batch Verification"
              description="Built-in tools to verify up to 50 receipts asynchronously in a single sweep for end-of-day reconciliation."
            />
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mb-40 bg-neutral-900/30 border border-neutral-800 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full"></div>
          <h2 className="text-4xl font-extrabold mb-16 text-center">Built for every workflow</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">E-Commerce Checkouts</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Automate your Telegram or web store. When a customer uploads a screenshot, extract the reference via OCR and verify the exact amount instantly before releasing digital goods.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">In-store Cashiers</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Build a cashier dashboard. Instead of relying on fake SMS texts, the cashier simply types the last 4 digits of the reference, and epv confirms the transaction is real and settled.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Accounting Teams</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Run batch scripts at the end of the day to cross-reference hundreds of submitted receipts against the bank&apos;s actual ledger, automatically flagging any mismatches.
              </p>
            </div>
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section className="mb-40 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <FaqItem 
              question="Is it really 100% free?" 
              answer="Yes. epv is a completely open-source library. We don't host a central API that you pay for; you install the library and it makes requests directly from your server to the banks."
            />
            <FaqItem 
              question="How is this legal or allowed by banks?" 
              answer="Ethiopian banks deliberately create these public URLs (like mbreceipt.cbe.com.et) specifically so merchants and customers can verify receipts. We are simply automating the browser visit."
            />
            <FaqItem 
              question="What happens if a bank blocks my server IP?" 
              answer="If you make thousands of requests a minute, a bank's firewall might temporarily block you. epv supports proxy configurations, allowing you to route requests through rotating Ethiopian residential IPs if you operate at massive scale."
            />
            <FaqItem 
              question="Do I need an Ethiopian IP address?" 
              answer="For some banks (like Telebirr and M-Pesa), yes. They geo-block requests originating outside of Ethiopia. You will need to host your application on an Ethiopian VPS (like Ethio Telecom) or use a proxy."
            />
          </div>
        </section>

        {/* 8. Final Massive CTA */}
        <section className="relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-blue-700"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative z-10 p-16 md:p-24 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to verify?</h2>
            <p className="text-base md:text-lg text-emerald-50/80 mb-10 max-w-2xl leading-relaxed">
              Stop losing money to fake screenshots and forged SMS messages. Start verifying receipts at the source in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/docs"
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-2xl flex items-center gap-2"
              >
                <Terminal size={20} /> Read Documentation
              </Link>
              <a 
                href="https://github.com/nahomtechet/ethiopian-payment-verifier"
                target="_blank"
                rel="noreferrer"
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform flex items-center gap-2"
              >
                <GitPullRequest size={20} /> View on GitHub
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm group hover:border-neutral-600 transition-all duration-300"
    >
      <div className="mb-6 bg-black p-4 rounded-2xl inline-flex border border-neutral-800 group-hover:border-neutral-700 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-neutral-800 bg-neutral-900/30 rounded-2xl overflow-hidden transition-colors hover:border-neutral-700">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-base"
      >
        {question}
        {isOpen ? <Minus className="text-emerald-500 shrink-0" /> : <Plus className="text-emerald-500 shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-neutral-400 text-sm md:text-base leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
