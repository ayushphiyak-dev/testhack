'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Mail, Lock, User, Phone, Building2, ArrowRight, AlertCircle, CheckCircle, GraduationCap, Briefcase, Gavel, Settings } from 'lucide-react';
import { useAuth } from '@/store/auth-store';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { mockInstitutes } from '@/lib/mock-data';

const roles: { value: UserRole; label: string; icon: any; desc: string }[] = [
  { value: 'STUDENT', label: 'Student', icon: GraduationCap, desc: 'Report issues at your institution' },
  { value: 'INSTITUTE_ADMIN', label: 'Institute Admin', icon: Building2, desc: 'Manage complaints for your institute' },
  { value: 'GOVERNMENT_OFFICIAL', label: 'Government Official', icon: Gavel, desc: 'Monitor escalated issues' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT' as UserRole,
    instituteId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: formData.role,
      instituteId: formData.instituteId || undefined,
      phone: formData.phone || undefined,
    });

    if (result.success) {
      router.push('/student');
    } else {
      setError(result.error || 'Registration failed');
    }

    setIsLoading(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
            <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-500 mt-2">Join the student accountability movement</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div className={cn(
                  "h-2 rounded-full transition-colors",
                  s <= step ? "bg-trust-500" : "bg-slate-200"
                )} />
              </div>
            ))}
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

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-semibold text-slate-900 mb-4">Select your role</h2>
                <div className="space-y-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = formData.role === role.value;
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => updateField('role', role.value)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                          isSelected 
                            ? "border-trust-500 bg-trust-50" 
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          isSelected ? "bg-trust-100 text-trust-600" : "bg-slate-100 text-slate-500"
                        )}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={cn("font-medium", isSelected ? "text-trust-900" : "text-slate-900")}>{role.label}</h3>
                          <p className="text-sm text-slate-500">{role.desc}</p>
                        </div>
                        {isSelected && <CheckCircle className="w-5 h-5 text-trust-600 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-trust-600 text-white py-2.5 rounded-lg font-medium hover:bg-trust-700 transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-semibold text-slate-900 mb-4">Personal Information</h2>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
                      placeholder="you@institute.edu"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone (optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {(formData.role === 'STUDENT' || formData.role === 'INSTITUTE_ADMIN') && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Institution</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select
                        value={formData.instituteId}
                        onChange={(e) => updateField('instituteId', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none appearance-none bg-white"
                        required
                      >
                        <option value="">Select your institution</option>
                        {mockInstitutes.map(inst => (
                          <option key={inst.id} value={inst.id}>{inst.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-trust-600 text-white py-2.5 rounded-lg font-medium hover:bg-trust-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-semibold text-slate-900 mb-4">Security</h2>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className="w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
                      placeholder="Min 8 characters"
                      required
                      minLength={8}
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

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
                      placeholder="Repeat password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-4">
                  <input type="checkbox" required className="mt-1 rounded border-slate-300 text-trust-600 focus:ring-trust-500" />
                  <p className="text-sm text-slate-600">
                    I agree to the <Link href="/terms" className="text-trust-600 hover:underline">Terms of Service</Link> and{' '}
                    <Link href="/privacy" className="text-trust-600 hover:underline">Privacy Policy</Link>. 
                    I understand that abuse of the platform may result in account suspension.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 bg-trust-600 text-white py-2.5 rounded-lg font-medium hover:bg-trust-700 transition-colors",
                      isLoading && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link href="/login" className="text-trust-600 hover:text-trust-700 font-medium">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
