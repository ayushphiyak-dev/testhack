import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <p className="text-lg text-slate-600 mb-2">Page not found</p>
        <p className="text-sm text-slate-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-trust-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-trust-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
