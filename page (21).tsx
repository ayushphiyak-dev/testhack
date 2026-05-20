export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">Last updated: May 2024</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 mb-4">We collect information you provide directly, including name, email, phone number, institution details, and complaint submissions. We also collect technical data such as IP addresses and device information.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-4">Your information is used to: process complaints, verify identities, route issues to appropriate authorities, generate anonymous statistics, and improve our services.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Anonymous Reporting</h2>
          <p className="text-slate-600 mb-4">When you choose anonymous reporting, we strip identifiable metadata from images and do not share your identity with institutions or in public views. However, we retain internal records for abuse prevention.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Data Security</h2>
          <p className="text-slate-600 mb-4">We implement industry-standard encryption, access controls, and regular security audits. All administrative actions are logged in tamper-resistant audit trails.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Data Retention</h2>
          <p className="text-slate-600 mb-4">Complaint data is retained for 7 years for accountability purposes. Personal data is deleted upon account closure, except where legal obligations require retention.</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. Your Rights</h2>
          <p className="text-slate-600 mb-4">You have the right to access, correct, or delete your personal data. Contact support@eduwatch.in for data-related requests.</p>
        </div>
      </div>
    </div>
  );
}
