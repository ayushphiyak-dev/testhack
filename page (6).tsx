export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  isAnonymous: boolean;
  instituteId?: string;
  agencyId?: string;
  createdAt: string;
}

export type UserRole = 'STUDENT' | 'INSTITUTE_ADMIN' | 'INSTITUTE_STAFF' | 'GOVERNMENT_OFFICIAL' | 'PLATFORM_ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION' | 'DELETED';

export interface Institute {
  id: string;
  name: string;
  type: InstituteType;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  verified: boolean;
  rating?: InstituteRating;
}

export type InstituteType = 'SCHOOL' | 'COLLEGE' | 'UNIVERSITY' | 'TRAINING_CENTER' | 'COACHING_INSTITUTE';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  subCategory?: string;
  urgency: UrgencyLevel;
  status: ComplaintStatus;
  location?: string;
  department?: string;
  isAnonymous: boolean;
  aiConfidence?: number;
  aiAnalysis?: AIAnalysis;
  communityConfirmations: number;
  communityScore?: number;
  finalScore?: number;
  submittedAt: string;
  resolvedAt?: string;
  resolutionProof?: string;
  resolutionNote?: string;
  rejectionReason?: string;
  studentId: string;
  instituteId: string;
  institute?: Institute;
  images: Image[];
  confirmations: Confirmation[];
  responses: Response[];
  escalations: Escalation[];
  student?: User;
}

export type ComplaintCategory = 
  | 'INFRASTRUCTURE' | 'SAFETY' | 'SANITATION' | 'ACADEMIC_QUALITY' 
  | 'FACULTY_BEHAVIOR' | 'ADMINISTRATION' | 'FINANCIAL' | 'TRANSPORTATION'
  | 'HOSTEL' | 'LABORATORY' | 'LIBRARY' | 'CANTEEN' | 'DISCRIMINATION' | 'BULLYING' | 'OTHER';

export type UrgencyLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ComplaintStatus = 
  | 'DRAFT' | 'SUBMITTED' | 'AI_CHECKING' | 'COMMUNITY_CONFIRMATION' 
  | 'INSTITUTE_NOTIFIED' | 'UNDER_REVIEW' | 'IN_PROGRESS' | 'RESOLVED' 
  | 'REJECTED' | 'VERIFIED_CLOSED' | 'ESCALATED' | 'APPEALED';

export interface AIAnalysis {
  categoryPrediction: { category: string; confidence: number }[];
  imageQuality: { score: number; issues: string[] };
  duplicateDetection: { isDuplicate: boolean; similarity: number; originalId?: string };
  fraudRisk: { score: number; flags: string[] };
  urgencySuggestion: UrgencyLevel;
  summary: string;
  confidenceExplanation: string;
}

export interface Image {
  id: string;
  url: string;
  thumbnail?: string;
  metadata?: Record<string, any>;
  aiQuality?: number;
  aiTags?: string[];
}

export interface Confirmation {
  id: string;
  type: ConfirmationType;
  note?: string;
  userId: string;
  user?: User;
  createdAt: string;
}

export type ConfirmationType = 'SIMILAR_ISSUE' | 'WITNESS' | 'SUPPORT';

export interface Response {
  id: string;
  content: string;
  type: ResponseType;
  isPublic: boolean;
  authorId: string;
  author?: User;
  createdAt: string;
}

export type ResponseType = 'UPDATE' | 'RESOLUTION' | 'REJECTION' | 'CLARIFICATION' | 'ESCALATION_NOTICE';

export interface Escalation {
  id: string;
  reason: string;
  level: number;
  status: EscalationStatus;
  assignedTo?: string;
  actionTaken?: string;
  deadline?: string;
  createdAt: string;
  resolvedAt?: string;
  agency?: GovernmentAgency;
}

export type EscalationStatus = 'ACTIVE' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface GovernmentAgency {
  id: string;
  name: string;
  level: AgencyLevel;
  jurisdiction: string;
}

export type AgencyLevel = 'DISTRICT' | 'STATE' | 'NATIONAL';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  complaintId?: string;
}

export type NotificationType = 
  | 'COMPLAINT_ACK' | 'INSTITUTE_NOTIFY' | 'REMINDER' | 'ESCALATION_ALERT' 
  | 'RESOLUTION' | 'MODERATION_REQUEST' | 'SYSTEM' | 'COMMENT';

export interface InstituteRating {
  id: string;
  overallScore: number;
  responseRate: number;
  avgResolutionTime: number;
  repeatedIssueRate: number;
  transparencyScore: number;
  unresolvedSeverity: number;
  totalComplaints: number;
  resolvedComplaints: number;
  periodStart: string;
  periodEnd: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: User;
}

export interface DashboardStats {
  totalComplaints: number;
  pendingComplaints: number;
  resolvedThisMonth: number;
  avgResolutionTime: number;
  institutionRank?: number;
  responseRate?: number;
  escalationRate?: number;
}

export interface FilterParams {
  status?: ComplaintStatus | ComplaintStatus[];
  category?: ComplaintCategory | ComplaintCategory[];
  urgency?: UrgencyLevel | UrgencyLevel[];
  instituteId?: string;
  district?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
