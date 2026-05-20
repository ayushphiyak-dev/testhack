'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/store/auth-store';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push('/student');
    } else {
      setError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  const demoAccounts = [
    { email: 'arjun@student.edu', role: 'Student', pass: 'any' },
    { email: 'admin@dpsrkp.net', role: 'Institute Admin', pass: 'any' },
    { email: 'officer@edu.gov.in', role: 'Govt Official', pass: 'any' },
    { email: 'platform@eduwatch.in', role: 'Platform Admin', pass: 'any' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-trust-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">EduWatch</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-center gap-2 text-sm text-danger-700"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none transition-all"
                  placeholder="you@institute.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-trust-600 focus:ring-trust-500" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-trust-600 hover:text-trust-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 bg-trust-600 text-white py-2.5 rounded-lg font-medium hover:bg-trust-700 transition-colors",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Don't have an account? </span>
            <Link href="/register" className="text-trust-600 hover:text-trust-700 font-medium">
              Create one
            </Link>
          </div>

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => setEmail(demo.email)}
                  className="text-left p-2 rounded-lg bg-slate-50 hover:bg-trust-50 border border-slate-200 hover:border-trust-200 transition-colors text-xs"
                >
                  <span className="font-medium text-slate-700 block truncate">{demo.email}</span>
                  <span className="text-slate-400">{demo.role}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">Click any account to autofill. Password can be anything.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
