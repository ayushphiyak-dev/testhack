export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">Last updated: May 2024</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 mb-4">By accessing and using EduWatch, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. User Responsibilities</h2>
          <p className="text-slate-600 mb-4">Users must provide accurate information when submitting complaints. False or malicious reports may result in account suspension and legal action.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Content Moderation</h2>
          <p className="text-slate-600 mb-4">All submitted content undergoes AI and human moderation. We reserve the right to remove content that violates our policies or is deemed inappropriate.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Privacy</h2>
          <p className="text-slate-600 mb-4">We collect and process personal data in accordance with our Privacy Policy. Anonymous reporting options are available for sensitive issues.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Institute Obligations</h2>
          <p className="text-slate-600 mb-4">Registered institutes must respond to verified complaints within the specified SLA timeframes. Failure to respond may result in automatic escalation.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-slate-600 mb-4">EduWatch is a platform for communication and accountability. We are not responsible for the actions or inactions of institutes or government authorities.</p>
        </div>
      </div>
    </div>
  );
}
