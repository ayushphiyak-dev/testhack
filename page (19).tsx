'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Filter, ChevronDown, Shield, Clock, Users,
  CheckCircle, AlertTriangle, Eye, ArrowRight, X
} from 'lucide-react';
import { mockComplaints, mockInstitutes } from '@/lib/mock-data';
import { cn, formatRelativeDate, getStatusColor, getUrgencyColor } from '@/lib/utils';
import { ComplaintCategory, ComplaintStatus, UrgencyLevel } from '@/types';

const categories: { value: ComplaintCategory | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
  { value: 'SAFETY', label: 'Safety' },
  { value: 'SANITATION', label: 'Sanitation' },
  { value: 'ACADEMIC_QUALITY', label: 'Academic Quality' },
  { value: 'TRANSPORTATION', label: 'Transportation' },
  { value: 'CANTEEN', label: 'Canteen' },
  { value: 'OTHER', label: 'Other' },
];

export default function PublicIssuesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ComplaintCategory | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | 'ALL'>('ALL');
  const [filterUrgency, setFilterUrgency] = useState<UrgencyLevel | 'ALL'>('ALL');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockComplaints.filter(c => {
    if (filterCategory !== 'ALL' && c.category !== filterCategory) return false;
    if (filterStatus !== 'ALL' && c.status !== filterStatus) return false;
    if (filterUrgency !== 'ALL' && c.urgency !== filterUrgency) return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900">Public Issue Tracker</h1>
          <p className="text-slate-500 mt-2">Browse verified complaints from students across institutions</p>
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
                placeholder="Search issues..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 focus:border-trust-500 outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 border rounded-lg font-medium transition-colors",
                showFilters ? "border-trust-500 bg-trust-50 text-trust-700" : "border-slate-300 text-slate-700 hover:bg-slate-50"
              )}
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as ComplaintCategory | 'ALL')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 outline-none bg-white"
                >
                  {categories.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as ComplaintStatus | 'ALL')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 outline-none bg-white"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="ESCALATED">Escalated</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
                <select
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value as UrgencyLevel | 'ALL')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-500 outline-none bg-white"
                >
                  <option value="ALL">All Urgency</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{filtered.length}</span> verified issues
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Eye className="w-4 h-4" />
            Privacy-safe public view
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filtered.map((complaint, i) => (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getStatusColor(complaint.status))}>
                      {complaint.status.replace('_', ' ')}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", getUrgencyColor(complaint.urgency))}>
                      {complaint.urgency}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      {complaint.category.replace('_', ' ')}
                    </span>
                    {complaint.isAnonymous && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Anonymous
                      </span>
                    )}
                  </div>

                  <h3 className="font-medium text-slate-900">{complaint.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{complaint.institute?.name} • {complaint.institute?.city}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatRelativeDate(complaint.submittedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {complaint.communityConfirmations} confirmations
                    </span>
                    {complaint.aiConfidence && (
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        AI {complaint.aiConfidence}% verified
                      </span>
                    )}
                  </div>
                </div>

                {complaint.images[0] && (
                  <img 
                    src={complaint.images[0].thumbnail || complaint.images[0].url} 
                    alt="" 
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0 hidden sm:block"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
