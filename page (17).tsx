'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Star, TrendingUp, Clock, CheckCircle,
  AlertTriangle, FileText, ArrowLeft, Shield, Phone, Mail,
  Globe, ChevronRight, Eye
} from 'lucide-react';
import { mockInstitutes, getComplaintsByInstitute } from '@/lib/mock-data';
import { cn, formatRelativeDate, getStatusColor, getUrgencyColor } from '@/lib/utils';

export default function InstituteDetailPage() {
  const { id } = useParams();
  const institute = mockInstitutes.find(i => i.id === id);
  const complaints = getComplaintsByInstitute(id as string);

  if (!institute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900">Institute not found</h2>
          <Link href="/institutes" className="text-trust-600 hover:underline mt-4 inline-block">Back to directory</Link>
        </div>
      </div>
    );
  }

  const resolved = complaints.filter(c => c.status === 'RESOLVED' || c.status === 'VERIFIED_CLOSED');
  const pending = complaints.filter(c => !['RESOLVED', 'VERIFIED_CLOSED', 'REJECTED'].includes(c.status));
  const escalated = complaints.filter(c => c.escalations.length > 0);

  const categoryBreakdown = complaints.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link href="/institutes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-trust-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-trust-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-slate-900">{institute.name}</h1>
                {institute.verified && (
                  <span className="px-2 py-0.5 bg-civic-100 text-civic-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-slate-500 capitalize">{institute.type.toLowerCase().replace('_', ' ')}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{institute.address}, {institute.city}, {institute.state}</span>
                {institute.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{institute.phone}</span>}
                {institute.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{institute.email}</span>}
                {institute.website && <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{institute.website}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Rating Overview */}
        {institute.rating && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Overall Rating</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 rounded-full bg-trust-50 flex items-center justify-center border-4 border-trust-200">
                    <span className="text-3xl font-bold text-trust-700">{institute.rating.overallScore}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={cn("w-5 h-5", star <= Math.round(institute.rating!.overallScore / 20) ? "text-warning-400 fill-warning-400" : "text-slate-200")} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500">Based on {institute.rating.totalComplaints} verified complaints</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Response Rate', value: institute.rating.responseRate, color: 'bg-trust-500' },
                    { label: 'Resolution Speed', value: Math.max(0, 100 - (institute.rating.avgResolutionTime / 120) * 100), color: 'bg-civic-500' },
                    { label: 'Transparency', value: institute.rating.transparencyScore, color: 'bg-purple-500' },
                    { label: 'Issue Recurrence', value: Math.max(0, 100 - institute.rating.repeatedIssueRate), color: 'bg-warning-500' },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">{metric.label}</span>
                        <span className="font-medium text-slate-900">{Math.round(metric.value)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", metric.color)} style={{ width: `${metric.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Performance Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Total Complaints', value: institute.rating.totalComplaints, icon: FileText, color: 'text-trust-600 bg-trust-50' },
                    { label: 'Resolved', value: institute.rating.resolvedComplaints, icon: CheckCircle, color: 'text-civic-600 bg-civic-50' },
                    { label: 'Avg. Resolution', value: `${institute.rating.avgResolutionTime}h`, icon: Clock, color: 'text-warning-600 bg-warning-50' },
                    { label: 'Repeated Issues', value: `${institute.rating.repeatedIssueRate}%`, icon: AlertTriangle, color: 'text-danger-600 bg-danger-50' },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-slate-50 rounded-lg p-4">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", stat.color)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Complaints */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Complaints</h2>
            <div className="space-y-4">
              {complaints.slice(0, 5).map((complaint, i) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getStatusColor(complaint.status))}>
                      {complaint.status.replace('_', ' ')}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", getUrgencyColor(complaint.urgency))}>
                      {complaint.urgency}
                    </span>
                    {complaint.isAnonymous && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Anonymous
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-slate-900">{complaint.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{formatRelativeDate(complaint.submittedAt)}</p>
                  {complaint.resolutionNote && (
                    <div className="mt-3 p-3 bg-civic-50 rounded-lg text-sm text-civic-700">
                      <span className="font-medium">Resolution: </span>{complaint.resolutionNote}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Complaint Categories</h3>
              <div className="space-y-3">
                {Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]).map(([category, count]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-700">{category.replace('_', ' ')}</span>
                      <span className="font-medium text-slate-900">{count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-trust-500 rounded-full" style={{ width: `${(count / complaints.length) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Status Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pending</span>
                  <span className="text-sm font-medium text-warning-600">{pending.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Resolved</span>
                  <span className="text-sm font-medium text-civic-600">{resolved.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Escalated</span>
                  <span className="text-sm font-medium text-danger-600">{escalated.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
