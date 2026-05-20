'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, MessageSquare, FileText, Shield, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      { q: 'How do I create an account?', a: 'Click "Get Started" on the homepage, select your role (Student, Institute Admin, or Government Official), fill in your details, and verify your email.' },
      { q: 'What information do I need to provide?', a: 'Basic details include your name, email, phone number, and institution affiliation. Government officials may need additional verification.' },
      { q: 'Can I use EduWatch without an institution?', a: 'Currently, EduWatch requires affiliation with a registered educational institution. If your institution is not listed, you can request its addition.' },
    ]
  },
  {
    category: 'Reporting Issues',
    questions: [
      { q: 'How do I submit a complaint?', a: 'Go to your dashboard, click "New Complaint," and follow the step-by-step wizard. Include photos, location details, and a clear description.' },
      { q: 'Can I report anonymously?', a: 'Yes. During submission, toggle the "Anonymous" option. Your identity will be hidden from the institution and public view.' },
      { q: 'What makes a good complaint?', a: 'Clear photos, specific location details, timeline of events, and impact description. The AI system prioritizes detailed, evidence-backed reports.' },
    ]
  },
  {
    category: 'AI Verification',
    questions: [
      { q: 'How does AI verification work?', a: 'Our AI checks image quality, detects duplicates, assesses fraud risk, predicts categories, and suggests urgency levels. Results are combined with community confirmations.' },
      { q: 'What if AI flags my complaint incorrectly?', a: 'All AI-flagged complaints undergo human review. You can appeal any decision through the complaint details page.' },
      { q: 'Is my data used to train AI models?', a: 'Only anonymized, aggregated data is used for model improvement. Personal information is never included in training datasets.' },
    ]
  },
  {
    category: 'Institute Response',
    questions: [
      { q: 'How long do institutes have to respond?', a: 'Critical issues: 3 days. High urgency: 7 days. Medium: 14 days. Low: 30 days. Automatic escalation occurs if deadlines are missed.' },
      { q: 'What if my institute ignores the complaint?', a: 'The system automatically escalates unresolved complaints to district education officers, then state authorities if needed.' },
      { q: 'Can I see how other institutes perform?', a: 'Yes. Visit the Institution Directory to view ratings, response rates, and complaint statistics for all registered institutes.' },
    ]
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('Getting Started');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Help Center</h1>
          <p className="text-slate-500 mb-8">Find answers to common questions about EduWatch</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {filteredFaqs.map((category) => (
              <div key={category.category} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <h3 className="font-semibold text-slate-900">{category.category}</h3>
                  <ChevronRight className={cn("w-5 h-5 text-slate-400 transition-transform", openCategory === category.category && "rotate-90")} />
                </button>

                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100"
                    >
                      <div className="p-5 space-y-3">
                        {category.questions.map((q, i) => (
                          <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => setOpenQuestion(openQuestion === `${category.category}-${i}` ? null : `${category.category}-${i}`)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                            >
                              <span className="text-sm font-medium text-slate-900">{q.q}</span>
                              <ChevronRight className={cn("w-4 h-4 text-slate-400 transition-transform", openQuestion === `${category.category}-${i}` && "rotate-90")} />
                            </button>
                            <AnimatePresence>
                              {openQuestion === `${category.category}-${i}` && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="px-4 pb-4"
                                >
                                  <p className="text-sm text-slate-600 leading-relaxed">{q.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Contact Support</h3>
              <div className="space-y-3">
                <a href="mailto:support@eduwatch.in" className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-trust-50 transition-colors">
                  <MessageSquare className="w-5 h-5 text-trust-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email Support</p>
                    <p className="text-xs text-slate-500">support@eduwatch.in</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Phone className="w-5 h-5 text-trust-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Phone Support</p>
                    <p className="text-xs text-slate-500">1800-EDU-WATCH</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <FileText className="w-5 h-5 text-trust-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Documentation</p>
                    <p className="text-xs text-slate-500">API & Integration guides</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-trust-50 border border-trust-200 rounded-xl p-5">
              <Shield className="w-8 h-8 text-trust-600 mb-3" />
              <h3 className="font-semibold text-trust-900 mb-1">Report Abuse</h3>
              <p className="text-sm text-trust-700 mb-3">If you encounter misuse of the platform, please report it immediately.</p>
              <button className="text-sm text-trust-700 font-medium hover:text-trust-800">
                Report abuse →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
