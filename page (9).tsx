'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, CheckCircle, Clock, Users, BarChart3, MapPin, 
  ChevronRight, Star, ArrowRight, Menu, X, FileText,
  AlertTriangle, Search, Bell, Lock, Zap, HeartHandshake,
  GraduationCap, Building2, Gavel, Eye, TrendingUp,
  MessageSquare, Phone, Mail, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Issues Reported', value: '12,847', icon: FileText },
  { label: 'Resolved', value: '9,632', icon: CheckCircle },
  { label: 'Institutions', value: '1,204', icon: Building2 },
  { label: 'Student Users', value: '45,200', icon: Users },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Reporting',
    description: 'AI-powered image verification and duplicate detection ensure every report is credible and actionable.',
    color: 'bg-trust-50 text-trust-600',
  },
  {
    icon: Users,
    title: 'Community Confirmation',
    description: 'Other students can confirm similar issues, building a confidence score that institutions cannot ignore.',
    color: 'bg-civic-50 text-civic-600',
  },
  {
    icon: Eye,
    title: 'Transparent Tracking',
    description: 'Real-time status updates from submission to resolution. No more black boxes or lost complaints.',
    color: 'bg-warning-50 text-warning-600',
  },
  {
    icon: BarChart3,
    title: 'Institution Ratings',
    description: 'Fair, data-driven ratings based only on verified complaints and actual response performance.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Gavel,
    title: 'Automatic Escalation',
    description: 'Unresolved critical issues automatically escalate to district and state education authorities.',
    color: 'bg-danger-50 text-danger-600',
  },
  {
    icon: Lock,
    title: 'Anonymous Option',
    description: 'Report sensitive issues without revealing your identity. Privacy protections built into every layer.',
    color: 'bg-slate-100 text-slate-600',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Report an Issue',
    description: 'Take photos, describe the problem, and select your institution. AI helps categorize and verify instantly.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Community Verification',
    description: 'Other students confirm similar problems. The system calculates a confidence score combining AI and community input.',
    icon: Users,
  },
  {
    step: '03',
    title: 'Institute Notified',
    description: 'High-confidence reports are automatically routed to the right department with SLA tracking and reminders.',
    icon: Bell,
  },
  {
    step: '04',
    title: 'Track & Escalate',
    description: 'Monitor progress in real-time. If unresolved, the system escalates to higher authorities with full audit trails.',
    icon: TrendingUp,
  },
];

const resolvedIssues = [
  {
    title: 'Unsafe laboratory equipment replaced',
    institute: 'IIT Delhi',
    category: 'Infrastructure',
    days: 5,
    confirmations: 23,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=400&q=80',
  },
  {
    title: 'Bus service restored for 200+ students',
    institute: 'DPS R.K. Puram',
    category: 'Transportation',
    days: 4,
    confirmations: 45,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80',
  },
  {
    title: 'Canteen hygiene standards enforced',
    institute: 'St. Xavier's Mumbai',
    category: 'Food Safety',
    days: 7,
    confirmations: 18,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  },
];

const faqs = [
  {
    question: 'How does EduWatch verify complaints?',
    answer: 'We use a multi-layer verification system: AI analyzes images for quality and relevance, detects duplicates, and assesses fraud risk. Community confirmations from other students add a social verification layer. The final confidence score combines both signals.',
  },
  {
    question: 'Can I report anonymously?',
    answer: 'Yes. Anonymous reporting is available for all complaint types. Your identity is never revealed to the institution or other users. However, anonymous reports may require higher community confirmation to reach high confidence scores.',
  },
  {
    question: 'What happens if my institute ignores the complaint?',
    answer: 'The system has automatic escalation rules. If an institute does not respond within the SLA (varies by urgency: 3-14 days), the complaint escalates to district education officers, then state authorities if still unresolved.',
  },
  {
    question: 'How are institute ratings calculated?',
    answer: 'Ratings are based solely on verified data: response rate, average resolution time, repeated issue frequency, transparency in communication, and severity of unresolved issues. No fake or unverified complaints affect ratings.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption, role-based access controls, and strict data handling policies. Image metadata is stripped for privacy. Audit logs track every administrative action for accountability.',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-trust-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">EduWatch</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How It Works</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#institutes" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Institutes</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="text-sm font-medium bg-trust-600 text-white px-4 py-2 rounded-lg hover:bg-trust-700 transition-colors"
              >
                Get Started
              </Link>
            </div>

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#how-it-works" className="block text-sm font-medium text-slate-600 py-2">How It Works</a>
              <a href="#features" className="block text-sm font-medium text-slate-600 py-2">Features</a>
              <a href="#institutes" className="block text-sm font-medium text-slate-600 py-2">Institutes</a>
              <a href="#faq" className="block text-sm font-medium text-slate-600 py-2">FAQ</a>
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link href="/login" className="text-sm font-medium text-slate-600 py-2">Sign In</Link>
                <Link href="/register" className="text-sm font-medium bg-trust-600 text-white px-4 py-2 rounded-lg text-center">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-trust-50 via-white to-civic-50 opacity-70" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-trust-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-civic-100 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trust-50 text-trust-700 text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-trust-600" />
                Trusted by 45,000+ students across India
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Hold Your Institution{' '}
                <span className="text-trust-600">Accountable</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Report infrastructure issues, track resolutions, and ensure your voice is heard. 
                AI-verified complaints with transparent escalation to education authorities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-trust-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-trust-700 transition-colors"
                >
                  Report an Issue
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/issues"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Browse Public Issues
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-civic-500" />
                  AI Verified
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-civic-500" />
                  Anonymous Option
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-civic-500" />
                  Govt. Escalation
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-900">Recent Verified Issues</h3>
                    <p className="text-sm text-slate-500">Updated in real-time</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-civic-50 text-civic-700 rounded-full text-xs font-medium">
                    <div className="w-2 h-2 bg-civic-500 rounded-full animate-pulse" />
                    Live
                  </div>
                </div>

                <div className="space-y-4">
                  {resolvedIssues.slice(0, 2).map((issue, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <img src={issue.image} alt={issue.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 text-sm truncate">{issue.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{issue.institute}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {issue.days} days
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {issue.confirmations} confirmed
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 bg-civic-100 text-civic-700 text-xs font-medium rounded">
                          Resolved
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Resolution rate this month</span>
                    <span className="font-semibold text-civic-600">87.3%</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-civic-500 rounded-full" style={{ width: '87.3%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-trust-100 text-trust-600 mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">How EduWatch Works</h2>
            <p className="text-lg text-slate-600">A simple, powerful process designed to turn your complaints into action.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="text-6xl font-bold text-slate-100 absolute -top-4 -left-2 select-none">
                    {step.step}
                  </div>
                  <div className="relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-lg bg-trust-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-trust-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ChevronRight className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Built for Accountability</h2>
            <p className="text-lg text-slate-600">Every feature designed to ensure your complaint reaches the right people and gets resolved.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all duration-300 group"
                >
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110", feature.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Trust & Safety at the Core
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Lock, title: 'Privacy First', desc: 'Anonymous reporting with metadata stripping. Your identity is protected by design.' },
                  { icon: Shield, title: 'AI Verification', desc: 'Computer vision detects fake, irrelevant, or duplicate images before they reach institutions.' },
                  { icon: Eye, title: 'Transparent Audit', desc: 'Every administrative action is logged. Tamper-resistant records for government oversight.' },
                  { icon: HeartHandshake, title: 'Fair Ratings', desc: 'Institute ratings use only verified, resolved complaint data. No gaming the system.' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-trust-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-trust-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-civic-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-civic-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Verification Pipeline</h3>
                  <p className="text-sm text-slate-500">How we ensure quality</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Image Quality Check', status: 'passed', detail: 'Sharp, relevant, no manipulation detected' },
                  { label: 'Duplicate Detection', status: 'passed', detail: 'Unique report, no existing match >60%' },
                  { label: 'Fraud Risk Analysis', status: 'passed', detail: 'Low risk score: 3/100' },
                  { label: 'Category Prediction', status: 'passed', detail: 'Infrastructure: 94% confidence' },
                  { label: 'Community Confirmation', status: 'pending', detail: 'Awaiting peer verification' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      item.status === 'passed' ? 'bg-civic-100 text-civic-600' : 'bg-warning-100 text-warning-600'
                    )}>
                      {item.status === 'passed' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{item.label}</span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          item.status === 'passed' ? 'bg-civic-100 text-civic-700' : 'bg-warning-100 text-warning-700'
                        )}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resolved Issues */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Recently Resolved</h2>
            <p className="text-lg text-slate-600">Real issues from real students that got fixed through EduWatch.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {resolvedIssues.map((issue, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-civic-500 text-white text-xs font-medium rounded-lg">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Resolved
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">{issue.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{issue.institute}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {issue.days} days
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {issue.confirmations}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-trust-600 bg-trust-50 px-2 py-1 rounded">
                      {issue.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Everything you need to know about using EduWatch.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                  <ChevronRight className={cn(
                    "w-5 h-5 text-slate-400 flex-shrink-0 transition-transform",
                    openFaq === i && "rotate-90"
                  )} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-trust-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make Your Institution Better?
          </h2>
          <p className="text-lg text-trust-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are holding their schools and colleges accountable. 
            Your report could be the catalyst for real change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-trust-700 px-8 py-3 rounded-lg font-semibold hover:bg-trust-50 transition-colors"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/institutes"
              className="inline-flex items-center justify-center gap-2 bg-trust-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-trust-800 transition-colors border border-trust-500"
            >
              Browse Institutes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-trust-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">EduWatch</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                A civic-tech platform ensuring transparency and accountability in educational institutions across India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><Link href="/institutes" className="hover:text-white transition-colors">Institute Directory</Link></li>
                <li><Link href="/issues" className="hover:text-white transition-colors">Public Issues</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  support@eduwatch.in
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  1800-EDU-WATCH
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  New Delhi, India
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2024 EduWatch. All rights reserved. Built for public good.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">Secured by</span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Lock className="w-3 h-3" />
                End-to-end encryption
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
