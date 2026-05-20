'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, Search, MapPin, Star, TrendingUp, Clock,
  ArrowRight, Filter, ChevronDown, FileText, CheckCircle,
  AlertTriangle, Shield
} from 'lucide-react';
import { mockInstitutes, getComplaintsByInstitute } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { InstituteType } from '@/types';

export default function PublicInstitutesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<InstituteType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'rating' | 'complaints' | 'response'>('rating');

  const filtered = mockInstitutes.filter(inst => {
    if (filterType !== 'ALL' && inst.type !== filterType) return false;
    if (searchQuery && !inst.name.toLowerCase().includes(searchQuery.toLowerCase()) && !inst.city.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return (b.rating?.overallScore || 0) - (a.rating?.overallScore || 0);
    if (sortBy === 'complaints') return (b.rating?.totalComplaints || 0) - (a.rating?.totalComplaints || 0);
    if (sortBy === 'response') return (b.rating?.responseRate || 0) - (a.rating?.responseRate || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900">Institution Directory</h1>
          <p className="text-slate-500 mt-2">Browse institutions, view ratings, and see complaint statistics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or city..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as InstituteType | 'ALL')}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none bg-white"
            >
              <option value="ALL">All Types</option>
              <option value="SCHOOL">School</option>
              <option value="COLLEGE">College</option>
              <option value="UNIVERSITY">University</option>
              <option value="TRAINING_CENTER">Training Center</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none bg-white"
            >
              <option value="rating">Sort by Rating</option>
              <option value="complaints">Sort by Complaints</option>
              <option value="response">Sort by Response Rate</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((institute, i) => {
            const complaints = getComplaintsByInstitute(institute.id);
            const pending = complaints.filter(c => !['RESOLVED', 'VERIFIED_CLOSED', 'REJECTED'].includes(c.status)).length;

            return (
              <motion.div
                key={institute.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-trust-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-trust-600" />
                    </div>
                    {institute.verified && (
                      <span className="px-2 py-1 bg-civic-100 text-civic-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-slate-900 mb-1">{institute.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" />
                    {institute.city}, {institute.state}
                  </p>

                  {institute.rating && (
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Overall Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                          <span className="text-sm font-bold text-slate-900">{institute.rating.overallScore}</span>
                          <span className="text-xs text-slate-400">/100</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            institute.rating.overallScore >= 80 ? "bg-civic-500" :
                            institute.rating.overallScore >= 60 ? "bg-warning-500" :
                            "bg-danger-500"
                          )}
                          style={{ width: `${institute.rating.overallScore}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-50 rounded-lg p-2">
                          <p className="text-slate-500">Response Rate</p>
                          <p className="font-medium text-slate-900">{institute.rating.responseRate}%</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2">
                          <p className="text-slate-500">Avg. Resolution</p>
                          <p className="font-medium text-slate-900">{institute.rating.avgResolutionTime}h</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {complaints.length} complaints
                      </span>
                      {pending > 0 && (
                        <span className="flex items-center gap-1 text-warning-600">
                          <AlertTriangle className="w-3 h-3" />
                          {pending} pending
                        </span>
                      )}
                    </div>
                    <Link 
                      href={`/institutes/${institute.id}`}
                      className="text-sm text-trust-600 hover:text-trust-700 font-medium flex items-center gap-1"
                    >
                      View
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
