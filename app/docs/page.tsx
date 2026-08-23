export default function DocsOverview() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Introduction to v3.0.0</h1>
      <p className="text-xl text-neutral-400 mb-8">
        Welcome to the Ethiopian Payment Verifier documentation. In version 3.0.0, we completely reimagined how receipts are verified.
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8">
        <h3 className="text-emerald-400 font-bold mb-2">The End of SMS Forgery</h3>
        <p className="text-sm text-emerald-200/80 m-0">
          Previous versions relied on offline regex parsing of SMS text messages. Bad actors could easily forge these texts. 
          <strong> v3.0.0 introduces Pure Online Verification.</strong> We scrape the live HTML and PDF portals of 8 major Ethiopian banks to guarantee the receipt is real.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Supported Providers</h2>
      <p className="mb-4">
        Our live scrapers currently support the following endpoints. You can pass the exact reference ID, or the full URL.
      </p>

      <div className="overflow-x-auto rounded-xl border border-neutral-800 mb-12">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="px-4 py-3 font-medium">Provider</th>
              <th className="px-4 py-3 font-medium">Extraction Method</th>
              <th className="px-4 py-3 font-medium">Secondary Params Required?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            <tr><td className="px-4 py-3">Telebirr</td><td className="px-4 py-3 text-neutral-400">HTML Table</td><td className="px-4 py-3 text-neutral-400">No</td></tr>
            <tr><td className="px-4 py-3">CBE</td><td className="px-4 py-3 text-neutral-400">HTML Table</td><td className="px-4 py-3 text-yellow-400">Yes (accountLast8)</td></tr>
            <tr><td className="px-4 py-3">BOA</td><td className="px-4 py-3 text-neutral-400">HTML Divs</td><td className="px-4 py-3 text-yellow-400">Yes (accountLast5)</td></tr>
            <tr><td className="px-4 py-3">M-PESA</td><td className="px-4 py-3 text-neutral-400">Embedded JSON</td><td className="px-4 py-3 text-neutral-400">No</td></tr>
            <tr><td className="px-4 py-3">Dashen</td><td className="px-4 py-3 text-neutral-400">HTML Table</td><td className="px-4 py-3 text-neutral-400">No</td></tr>
            <tr><td className="px-4 py-3">Awash</td><td className="px-4 py-3 text-neutral-400">HTML Extraction (URL required)</td><td className="px-4 py-3 text-neutral-400">No</td></tr>
            <tr><td className="px-4 py-3">Zemen</td><td className="px-4 py-3 text-neutral-400">PDF Parsing</td><td className="px-4 py-3 text-neutral-400">No</td></tr>
            <tr><td className="px-4 py-3">eBirr</td><td className="px-4 py-3 text-neutral-400">HTML Extraction (URL required)</td><td className="px-4 py-3 text-neutral-400">No</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Quick Start</h2>
      <div className="bg-[#0d1117] rounded-xl border border-neutral-800 p-4 font-mono text-sm overflow-x-auto text-emerald-400 mb-8">
        npm install ethiopian-payment-verifier
      </div>
      
      <p>Head over to the Installation guide or jump straight into the <code className="bg-neutral-800 px-1 py-0.5 rounded">verifyOnline</code> documentation to see how to implement this in your API.</p>
    </div>
  );
}
