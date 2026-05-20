import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: 'bg-slate-100 text-slate-700',
    SUBMITTED: 'bg-trust-100 text-trust-700',
    AI_CHECKING: 'bg-purple-100 text-purple-700',
    COMMUNITY_CONFIRMATION: 'bg-indigo-100 text-indigo-700',
    INSTITUTE_NOTIFIED: 'bg-blue-100 text-blue-700',
    UNDER_REVIEW: 'bg-amber-100 text-amber-700',
    IN_PROGRESS: 'bg-warning-100 text-warning-700',
    RESOLVED: 'bg-civic-100 text-civic-700',
    REJECTED: 'bg-danger-100 text-danger-700',
    VERIFIED_CLOSED: 'bg-civic-100 text-civic-800',
    ESCALATED: 'bg-danger-100 text-danger-700',
    APPEALED: 'bg-purple-100 text-purple-700',
  };
  return colors[status] || 'bg-slate-100 text-slate-700';
}

export function getUrgencyColor(urgency: string): string {
  const colors: Record<string, string> = {
    LOW: 'bg-civic-100 text-civic-700 border-civic-200',
    MEDIUM: 'bg-warning-100 text-warning-700 border-warning-200',
    HIGH: 'bg-orange-100 text-orange-700 border-orange-200',
    CRITICAL: 'bg-danger-100 text-danger-700 border-danger-200',
  };
  return colors[urgency] || 'bg-slate-100 text-slate-700';
}

export function getConfidenceColor(score: number): string {
  if (score >= 80) return 'text-civic-600 bg-civic-50';
  if (score >= 60) return 'text-warning-600 bg-warning-50';
  if (score >= 40) return 'text-orange-600 bg-orange-50';
  return 'text-danger-600 bg-danger-50';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
