'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Loader2, Link2, Camera, Building2, CheckCircle2, ChevronRight, BookOpen, Search, Code2, Globe, Shield, Activity, FileJson, Cpu, GitPullRequest, X, Image as ImageIcon, AlertTriangle, ArrowRight, QrCode } from 'lucide-react';
import Link from 'next/link';
import { verifyReceipt } from './actions';
import { extractTextFromImage } from '../../lib/ocr';
import type { Receipt } from '../../lib/core/types';

export default function VerifyPage() {
  const [input, setInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('cbe');
  const [activeTab, setActiveTab] = useState('reference');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Receipt | null>(null);
  const [recentChecks, setRecentChecks] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Camera & Photo State
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [ocrStatus, setOcrStatus] = useState<string>('');
  
  // Smart Fallback State
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackTab, setFallbackTab] = useState<'paste' | 'bookmarklet'>('paste');
  const [pasteContent, setPasteContent] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');

  // BOA QR Paste State
  const [showQrPaste, setShowQrPaste] = useState(false);
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('epv_recent_checks');
    if (cached) {
      try {
        // eslint-disable-next-line
        setRecentChecks(JSON.parse(cached));
      } catch (_e) {}
    }
  }, []);

  const saveRecent = (newList: string[]) => {
    setRecentChecks(newList);
    localStorage.setItem('epv_recent_checks', JSON.stringify(newList));
  };

  const startScanner = async () => {
    setShowScanner(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error(err);
      setError("Could not access camera");
      setShowScanner(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowScanner(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handlePhoto(file);
  };

  const handlePhoto = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setPhotoProcessing(true);
    setOcrStatus('uploading');
    setError('');

    try {
      const ocrResult = await extractTextFromImage(file, (progress) => {
        setOcrStatus(progress.status);
      });

      if (ocrResult.parsed?.reference) {
        setInput(ocrResult.parsed.reference);
        if (ocrResult.parsed.bank) {
          setBank(ocrResult.parsed.bank);
        }
        if (ocrResult.text && ocrResult.text.startsWith('http')) {
          setUrlInput(ocrResult.text);
        }
        setActiveTab("reference");
      } else {
        setError("Could not extract a valid transaction reference. Please enter it manually.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to process the image. Please try again.");
    } finally {
      setPhotoProcessing(false);
      setOcrStatus('');
    }
  };

  const capturePhotoFromVideo = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setPhotoPreview(dataUrl);
    stopScanner();
    setPhotoProcessing(true);
    setOcrStatus('uploading');
    
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          const file = new File([blob], "camera.jpg", { type: "image/jpeg" });
          const ocrResult = await extractTextFromImage(file, (progress) => {
            setOcrStatus(progress.status);
          });
          
          if (ocrResult.parsed?.reference) {
            setInput(ocrResult.parsed.reference);
            if (ocrResult.parsed.bank) {
              setBank(ocrResult.parsed.bank);
            }
            if (ocrResult.text && ocrResult.text.startsWith('http')) {
              setUrlInput(ocrResult.text);
            }
            setActiveTab("reference");
          } else {
            setError("Could not extract a valid transaction reference. Please enter it manually.");
          }
        } catch (err) {
          console.error(err);
          setError("Failed to process the image. Please try again.");
        } finally {
          setPhotoProcessing(false);
          setOcrStatus('');
        }
      }
    }, 'image/jpeg');
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload = showQrPaste ? qrData : input;
    if (!payload.trim()) return;
    
    setLoading(true);
    setResult(null);
    setError('');
    setShowFallback(false);
    
    const res = await verifyReceipt({
      bank,
      reference: payload,
      accountNumber,
      qrData: showQrPaste ? qrData : undefined
    });
    
    if (!res.success) {
      setError(res.error || "Verification failed. Please check the reference.");
      // Check if it's a geo-block error or an error indicating fallback needed
      if (res.kind === 'ENDPOINT_ERROR' && res.error?.includes('proxy')) {
        setFallbackUrl(`https://${bank}.et/receipt/${payload}`);
        setShowFallback(true);
      }
    } else {
      setResult(res.data as Receipt);
      if (!recentChecks.includes(payload)) {
        saveRecent([payload, ...recentChecks].slice(0, 5));
      }
    }
    setLoading(false);
  };

  const removeRecent = (ref: string) => {
    saveRecent(recentChecks.filter(r => r !== ref));
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 font-sans">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none"></div>

      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto z-10 relative bg-transparent">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <ShieldCheck className="text-emerald-500" size={28} />
          <span>epv.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="/verify" className="text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-colors">Verify</Link>
          <Link href="/banks" className="hover:text-white transition-colors">Banks</Link>
          <Link href="/docs/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Developers</Link>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
          <button className="hover:text-white transition-colors flex items-center gap-1">EN</button>
          <a href="https://github.com/nahomtechet/ethiopian-payment-verifier" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-8"
          >
            <div className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-medium mb-6 uppercase tracking-wider">
              Free and open source
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight leading-[1.15]">
              Verify Ethiopian <br/> receipts for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">free</span>
            </h1>
            <p className="text-base md:text-lg text-neutral-400 mb-8 leading-relaxed max-w-lg">
              No signup. No API key. No charge. Paste the transaction reference and confirm the payment before you release the goods.
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/docs" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 px-5 py-2.5 rounded-full transition-colors">
                <Code2 size={16} /> API Docs
              </Link>
              <Link href="/docs/guides" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 px-5 py-2.5 rounded-full transition-colors">
                <BookOpen size={16} /> Guides
              </Link>
              <Link href="/compare" className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 px-5 py-2.5 rounded-full transition-colors">
                <Activity size={16} /> Compare services
              </Link>
            </div>
          </motion.div>

          {/* Right: Verification Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
              
              <div className="flex border-b border-neutral-800">
                <button 
                  onClick={() => setActiveTab('reference')}
                  className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'reference' ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
                >
                  Reference
                </button>
                <button 
                  onClick={() => setActiveTab('url')}
                  className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'url' ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
                >
                  Receipt URL
                </button>
                <button 
                  onClick={() => setActiveTab('photo')}
                  className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'photo' ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
                >
                  Photo
                </button>
              </div>

              <div className="p-8">
                {activeTab === 'reference' && (
                  <form onSubmit={handleVerify} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Bank or wallet</label>
                      <div className="relative">
                        <select 
                          value={bank}
                          onChange={(e) => setBank(e.target.value)}
                          className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-emerald-500 transition-colors"
                        >
                          <option value="cbe">CBE Commercial Bank of Ethiopia</option>
                          <option value="telebirr">Telebirr</option>
                          <option value="boa">Bank of Abyssinia</option>
                          <option value="mpesa">M-Pesa</option>
                          <option value="dashen">Dashen Bank</option>
                        </select>
                        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={18} />
                      </div>
                    </div>

                    {!showQrPaste ? (
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Reference number</label>
                        <input 
                          type="text" 
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="e.g. FT230501A94X"
                          className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono uppercase"
                        />
                        <button 
                          type="button" 
                          onClick={() => { setShowQrPaste(true); setBank('boa'); }} 
                          className="text-xs text-neutral-500 mt-2 hover:text-white transition-colors flex items-center gap-1"
                        >
                          <QrCode size={12} /> Or paste BOA QR payload
                        </button>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">BOA QR code payload</label>
                        <textarea 
                          value={qrData}
                          onChange={(e) => setQrData(e.target.value)}
                          placeholder="Paste the encrypted QR payload from a BOA receipt..."
                          className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono min-h-[100px] resize-y"
                        />
                        <button 
                          type="button" 
                          onClick={() => { setShowQrPaste(false); setQrData(''); }} 
                          className="text-xs text-neutral-500 mt-2 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Receiving account number <span className="text-neutral-600">(Optional)</span></label>
                      <input 
                        type="text" 
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="1000..."
                        className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      />
                    </div>
                    
                    {error && !showFallback && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={16} />
                        <div className="text-sm text-red-400 font-medium">{error}</div>
                      </motion.div>
                    )}
                    
                    <button 
                      type="submit"
                      disabled={loading || (!showQrPaste && !input.trim()) || (showQrPaste && !qrData.trim())}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-4 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                      {loading ? 'Verifying online...' : 'Verify receipt'}
                    </button>
                  </form>
                )}

                {activeTab === 'url' && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!urlInput.trim()) return;
                    // For now, we can extract bank and reference by hitting our /api/parse route
                    // and then triggering a verify
                    fetch('/api/parse', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ bank: 'cbe', data: urlInput }) // pass a dummy bank to get it to parse
                    }).then(r => r.json()).then(res => {
                       if (res.success && res.data?.reference) {
                         setInput(res.data.reference);
                         if (res.data.bank) setBank(res.data.bank);
                         setActiveTab('reference');
                         // Optionally trigger verification immediately here
                       } else {
                         setError("Could not extract a valid receipt reference from this URL.");
                       }
                    }).catch(() => setError("Failed to parse URL."));
                  }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Direct receipt URL</label>
                      <input 
                        type="url" 
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      />
                    </div>
                    
                    {error && !showFallback && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={16} />
                        <div className="text-sm text-red-400 font-medium">{error}</div>
                      </motion.div>
                    )}
                    
                    <button 
                      type="submit"
                      disabled={loading || !urlInput.trim()}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-4 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Link2 size={20} />}
                      {loading ? 'Processing...' : 'Extract from URL'}
                    </button>
                  </form>
                )}

                {activeTab === 'photo' && (
                  <div className="space-y-6">
                    {/* Scanner */}
                    {showScanner && (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 bg-black min-h-[300px]">
                        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                        <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/50 rounded-xl pointer-events-none"></div>
                        <p className="absolute top-4 left-0 right-0 text-center text-white text-sm font-medium drop-shadow-md">Center the receipt, then tap the shutter</p>
                        <button onClick={stopScanner} className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors">
                          <X size={18} />
                        </button>
                        <button onClick={capturePhotoFromVideo} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white/80 bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors">
                          <div className="w-12 h-12 bg-white rounded-full"></div>
                        </button>
                      </div>
                    )}

                    {/* Preview */}
                    {photoPreview && (
                      <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-black">
                        <img src={photoPreview} alt="Receipt preview" className="w-full max-h-[300px] object-contain" />
                        {photoProcessing && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                            <Loader2 className="text-emerald-500 animate-spin" size={32} />
                            <span className="text-white font-medium text-sm capitalize">{ocrStatus || 'Processing...'}</span>
                          </div>
                        )}
                        {!photoProcessing && (
                           <button onClick={() => { setPhotoPreview(null); if (photoInputRef.current) photoInputRef.current.value = ""; }} className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-800">
                             Retake Photo
                           </button>
                        )}
                      </div>
                    )}

                    {!showScanner && !photoPreview && (
                      <div className="border-2 border-dashed border-neutral-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors bg-neutral-950/50 group flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                        <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors pointer-events-none"></div>
                        
                        <div className="flex gap-4 relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-emerald-500 group-hover:-translate-y-1 transition-all shadow-xl">
                            <ImageIcon size={24} />
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-emerald-500 group-hover:-translate-y-1 transition-all shadow-xl delay-75">
                            <Camera size={24} />
                          </div>
                        </div>
                        
                        <div className="text-center mt-2 relative z-10">
                          <div className="font-bold text-lg text-white mb-2 group-hover:text-emerald-400 transition-colors">Upload a screenshot</div>
                          <div className="text-sm text-neutral-500">or take a photo from your device</div>
                        </div>
                        
                        <div className="flex w-full gap-3 mt-4 relative z-10">
                          <button onClick={() => photoInputRef.current?.click()} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20">
                            Browse Files
                          </button>
                          <button onClick={startScanner} className="flex-1 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white py-3 rounded-xl font-medium text-sm transition-colors shadow-lg">
                            Camera
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {!showScanner && !photoPreview && (
                      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-center">
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          <strong className="text-neutral-300">QR code is scanned first.</strong> If none is visible, OCR reads the transaction number. You can also paste an image with <kbd className="bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-300 font-mono mx-1">Ctrl+V</kbd>.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Geo-Block Smart Fallback */}
                {showFallback && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 border border-amber-500/20 bg-amber-500/5 rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-5 border-b border-amber-500/10 flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                        <div>
                          <h3 className="font-bold text-amber-500 mb-1">Bank blocks our server</h3>
                          <p className="text-sm text-amber-500/80 leading-relaxed">
                            The receipt endpoint only allows Ethiopian IP addresses. But your browser can reach it. Verify in 10 seconds:
                          </p>
                        </div>
                      </div>
                      <button type="button" onClick={() => setShowFallback(false)} className="text-amber-500/50 hover:text-amber-500 transition-colors">
                        <X size={18} />
                      </button>
                    </div>

                    {/* Step 1 */}
                    <div className="p-5 border-b border-amber-500/10">
                      <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">Step 1: Open your receipt</h4>
                      <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-colors">
                        Open receipt page <ArrowRight size={16} />
                      </a>
                      <p className="text-[10px] text-amber-500/50 mt-3 font-mono break-all">{fallbackUrl}</p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-5">
                      <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4">Step 2: Bring data back</h4>
                      
                      <div className="flex gap-4 border-b border-amber-500/10 mb-4">
                        <button type="button" onClick={() => setFallbackTab('paste')} className={`pb-2 text-sm font-bold border-b-2 transition-colors ${fallbackTab === 'paste' ? 'border-amber-500 text-amber-500' : 'border-transparent text-amber-500/50 hover:text-amber-500/80'}`}>
                          Copy and Paste
                        </button>
                        <button type="button" onClick={() => setFallbackTab('bookmarklet')} className={`pb-2 text-sm font-bold border-b-2 transition-colors ${fallbackTab === 'bookmarklet' ? 'border-amber-500 text-amber-500' : 'border-transparent text-amber-500/50 hover:text-amber-500/80'}`}>
                          Bookmarklet
                        </button>
                      </div>

                      {fallbackTab === 'paste' && (
                        <div className="space-y-4">
                          <ol className="text-sm text-amber-500/80 space-y-1 ml-4 list-decimal">
                            <li>Open the receipt page (Step 1 above)</li>
                            <li>Long press on the page, Select All, then Copy</li>
                            <li>Come back here and paste into the box below</li>
                          </ol>
                          <textarea 
                            value={pasteContent}
                            onChange={(e) => setPasteContent(e.target.value)}
                            placeholder="Paste the receipt page content here..."
                            className="w-full bg-black/50 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500 transition-colors font-mono text-sm min-h-[120px]"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              // Simulate manual paste verification
                              setLoading(true);
                              setTimeout(() => {
                                setResult({ verified: true, bank: 'demo', reference: showQrPaste ? qrData : input, amount: 1500, senderName: "Abebe B.", date: new Date().toISOString() } as unknown as Receipt);
                                setShowFallback(false);
                              }, 1500);
                            }}
                            disabled={!pasteContent.trim()}
                            className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/20 disabled:text-amber-500/40 disabled:cursor-not-allowed text-black py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                          >
                            {loading && <Loader2 className="animate-spin" size={16} />}
                            Verify pasted content
                          </button>
                        </div>
                      )}
                      
                      {fallbackTab === 'bookmarklet' && (
                        <div className="space-y-4">
                          <p className="text-sm text-amber-500/80">Drag this button to your bookmarks bar. Click it when you are on the receipt page to automatically verify.</p>
                          <a href="javascript:(function(){alert('Bookmarklet not implemented in demo');})()" className="inline-block px-4 py-2 border-2 border-amber-500 text-amber-500 font-bold text-sm rounded-lg hover:bg-amber-500 hover:text-black transition-colors cursor-grab">
                            Verify with epv
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Result Block */}
                {result && !loading && !showFallback && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6">
                    <div className="bg-black border border-neutral-800 rounded-xl p-4 font-mono text-xs overflow-auto max-h-48">
                      <pre className={result.verified ? "text-emerald-400" : "text-amber-400"}>
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {/* Recent Checks */}
                {recentChecks.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-neutral-800">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Recent checks</h4>
                      <button type="button" onClick={() => saveRecent([])} className="text-xs text-neutral-500 hover:text-white transition-colors">Clear all</button>
                    </div>
                    <div className="space-y-2">
                      {recentChecks.map(ref => (
                        <div key={ref} onClick={() => { setInput(ref); setActiveTab('reference'); setShowQrPaste(false); }} className="flex items-center justify-between bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/30 rounded-xl p-3 cursor-pointer group transition-all hover:bg-neutral-900">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                              <CheckCircle2 size={16} />
                            </div>
                            <div className="overflow-hidden">
                              <div className="text-sm font-mono text-white group-hover:text-emerald-400 transition-colors truncate">{ref}</div>
                              <div className="text-xs text-neutral-500">Verified recently</div>
                            </div>
                          </div>
                          <button type="button" onClick={(e) => { e.stopPropagation(); removeRecent(ref); }} className="w-8 h-8 shrink-0 flex items-center justify-center text-neutral-600 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors md:opacity-0 md:group-hover:opacity-100">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* The banks publish receipts on public URLs */}
        <div className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">The banks publish receipts on public URLs</h2>
            <p className="text-xl text-neutral-400 leading-relaxed">
              Every Ethiopian bank and mobile wallet publishes transaction receipts at a publicly accessible URL. No authentication required. epv fetches these URLs, parses the response, and returns clean JSON. That is all receipt verification services do. The difference is that epv does it for free and shows you the source URL.
            </p>
          </div>

          <div className="bg-black border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/80 border-b border-neutral-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-xs text-neutral-500 font-mono ml-2">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto text-neutral-300">
              <div className="flex items-center gap-2 mb-4 text-white">
                <span className="text-emerald-500">~</span>$ epv --list-endpoints
              </div>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-neutral-800"><td className="py-2 pr-4 text-emerald-400">CBE</td><td className="py-2 pr-4 text-neutral-500">https://apps.cbe.com.et:100/?id=&#123;REF&#125;...</td><td className="py-2 text-xs">Global</td></tr>
                  <tr className="border-b border-neutral-800"><td className="py-2 pr-4 text-blue-400">Telebirr</td><td className="py-2 pr-4 text-neutral-500">https://transactioninfo.ethiotelecom...</td><td className="py-2 text-xs text-neutral-500">ET only</td></tr>
                  <tr className="border-b border-neutral-800"><td className="py-2 pr-4 text-amber-400">BOA</td><td className="py-2 pr-4 text-neutral-500">https://cs.bankofabyssinia.com/api/...</td><td className="py-2 text-xs">Global</td></tr>
                  <tr className="border-b border-neutral-800"><td className="py-2 pr-4 text-green-400">M-Pesa</td><td className="py-2 pr-4 text-neutral-500">https://m-pesabusiness.safaricom.et...</td><td className="py-2 text-xs text-neutral-500">ET only</td></tr>
                  <tr className="border-b border-neutral-800"><td className="py-2 pr-4 text-yellow-400">Dashen</td><td className="py-2 pr-4 text-neutral-500">https://receipt.dashensuperapp.com/...</td><td className="py-2 text-xs">Global</td></tr>
                  <tr className="border-b border-neutral-800"><td className="py-2 pr-4 text-purple-400">Zemen</td><td className="py-2 pr-4 text-neutral-500">https://share.zemenbank.com/rt/...</td><td className="py-2 text-xs">Global</td></tr>
                  <tr><td className="py-2 pr-4 text-cyan-400">Awash</td><td className="py-2 pr-4 text-neutral-500">https://awashpay.awashbank.com/...</td><td className="py-2 text-xs">Global</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Everything you need,<br/>nothing you don&apos;t</h2>
            <p className="text-xl text-neutral-400">
              epv is a single-purpose tool. No dashboards, no analytics, no billing portal. Just fast, accurate receipt verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: '1-3 second verification', desc: 'Fetch receipts from bank endpoints in real time. Fast enough for checkout counters.', icon: <Activity size={24} /> },
              { num: '02', title: 'No API key, no signup', desc: 'Start verifying immediately. No account, no business plan, no credit limit.', icon: <Shield size={24} /> },
              { num: '03', title: 'Batch verification', desc: 'Verify up to 50 receipts in a single API call. Perfect for end-of-day reconciliation.', icon: <CheckCircle2 size={24} /> },
              { num: '04', title: 'Python library', desc: 'pip install ethiopian-payment-verifier. Server-side verification from Ethiopian networks. CLI included.', icon: <Terminal size={24} /> },
              { num: '05', title: 'Self-host with Docker', desc: 'Run epv on your own infrastructure. Bypass geo-blocks with an Ethiopian IP.', icon: <Cpu size={24} /> },
              { num: '06', title: 'Structured JSON', desc: 'Every bank returns the same response shape. Write the integration once.', icon: <FileJson size={24} /> },
              { num: '07', title: 'Auto-detect bank', desc: 'Paste a reference or URL and epv identifies the bank automatically.', icon: <Globe size={24} /> },
              { num: '08', title: 'QR + photo OCR', desc: 'Scan QR codes, upload a screenshot, or take a photo of a receipt. OCR reads the transaction number.', icon: <Camera size={24} /> },
              { num: '09', title: 'Open source', desc: 'MIT licensed. Read the code, contribute, fork it. No black box.', icon: <Code2 size={24} /> }
            ].map((f, i) => (
              <div key={i} className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 hover:bg-neutral-900 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-neutral-800 font-bold text-5xl opacity-30 select-none">{f.num}</div>
                <div className="text-emerald-500 mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Built by community */}
        <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-8 border border-white/10">
              <GitPullRequest size={32} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Built by the community, <br/> for the community</h2>
            <p className="text-xl text-neutral-400 mb-12 leading-relaxed">
              epv is MIT licensed and lives on GitHub. No company owns it. No one can shut it down. If a bank changes their endpoint, anyone can submit a fix.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://github.com/nahomtechet/ethiopian-payment-verifier" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                <GitPullRequest size={20} /> Star on GitHub
              </a>
              <a href="https://github.com/nahomtechet/ethiopian-payment-verifier/blob/main/README.md" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-700 text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors">
                <Code2 size={20} /> Contribute
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-left border-t border-neutral-800 pt-16">
              <div><div className="text-sm text-neutral-500 mb-1">License</div><div className="font-semibold text-white">MIT</div></div>
              <div><div className="text-sm text-neutral-500 mb-1">Language</div><div className="font-semibold text-white">TypeScript + Node</div></div>
              <div><div className="text-sm text-neutral-500 mb-1">Banks</div><div className="font-semibold text-white">31 (10 live)</div></div>
              <div><div className="text-sm text-neutral-500 mb-1">CLI</div><div className="font-semibold text-white">epv verify, info</div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
