import { Complaint, Institute, User, Notification, DashboardStats, ComplaintStatus, ComplaintCategory, UrgencyLevel, UserRole } from '@/types';
import { generateId, formatDate } from './utils';

// Mock Institutes
export const mockInstitutes: Institute[] = [
  {
    id: 'inst-1',
    name: 'Delhi Public School, R.K. Puram',
    type: 'SCHOOL',
    address: 'R.K. Puram, Sector 12',
    city: 'New Delhi',
    district: 'South West Delhi',
    state: 'Delhi',
    pincode: '110022',
    phone: '+91-11-26171255',
    email: 'contact@dpsrkp.net',
    website: 'https://dpsrkp.net',
    verified: true,
    rating: {
      id: 'rate-1',
      overallScore: 78,
      responseRate: 82,
      avgResolutionTime: 96,
      repeatedIssueRate: 15,
      transparencyScore: 85,
      unresolvedSeverity: 20,
      totalComplaints: 142,
      resolvedComplaints: 116,
      periodStart: '2024-01-01',
      periodEnd: '2024-12-31',
    }
  },
  {
    id: 'inst-2',
    name: 'Indian Institute of Technology, Delhi',
    type: 'UNIVERSITY',
    address: 'Hauz Khas',
    city: 'New Delhi',
    district: 'South Delhi',
    state: 'Delhi',
    pincode: '110016',
    phone: '+91-11-26591701',
    email: 'admin@iitd.ac.in',
    website: 'https://iitd.ac.in',
    verified: true,
    rating: {
      id: 'rate-2',
      overallScore: 88,
      responseRate: 91,
      avgResolutionTime: 72,
      repeatedIssueRate: 8,
      transparencyScore: 92,
      unresolvedSeverity: 12,
      totalComplaints: 89,
      resolvedComplaints: 81,
      periodStart: '2024-01-01',
      periodEnd: '2024-12-31',
    }
  },
  {
    id: 'inst-3',
    name: 'St. Xavier\'s College, Mumbai',
    type: 'COLLEGE',
    address: '5, Mahapalika Marg',
    city: 'Mumbai',
    district: 'Mumbai City',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91-22-22620661',
    email: 'info@xaviers.edu',
    verified: true,
    rating: {
      id: 'rate-3',
      overallScore: 72,
      responseRate: 68,
      avgResolutionTime: 120,
      repeatedIssueRate: 22,
      transparencyScore: 70,
      unresolvedSeverity: 28,
      totalComplaints: 203,
      resolvedComplaints: 138,
      periodStart: '2024-01-01',
      periodEnd: '2024-12-31',
    }
  },
  {
    id: 'inst-4',
    name: 'Government Higher Secondary School, Trivandrum',
    type: 'SCHOOL',
    address: 'Palayam',
    city: 'Thiruvananthapuram',
    district: 'Trivandrum',
    state: 'Kerala',
    pincode: '695034',
    verified: false,
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'arjun@student.edu',
    name: 'Arjun Sharma',
    role: 'STUDENT',
    status: 'ACTIVE',
    isAnonymous: false,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user-2',
    email: 'priya@student.edu',
    name: 'Priya Patel',
    role: 'STUDENT',
    status: 'ACTIVE',
    isAnonymous: false,
    createdAt: '2024-02-20T14:15:00Z',
  },
  {
    id: 'user-3',
    email: 'admin@dpsrkp.net',
    name: 'Dr. Ramesh Gupta',
    role: 'INSTITUTE_ADMIN',
    status: 'ACTIVE',
    isAnonymous: false,
    instituteId: 'inst-1',
    createdAt: '2023-06-10T09:00:00Z',
  },
  {
    id: 'user-4',
    email: 'officer@edu.gov.in',
    name: 'Shalini Iyer',
    role: 'GOVERNMENT_OFFICIAL',
    status: 'ACTIVE',
    isAnonymous: false,
    createdAt: '2023-08-05T11:20:00Z',
  },
  {
    id: 'user-5',
    email: 'platform@eduwatch.in',
    name: 'EduWatch Admin',
    role: 'PLATFORM_ADMIN',
    status: 'ACTIVE',
    isAnonymous: false,
    createdAt: '2023-01-01T00:00:00Z',
  },
];

// Mock Complaints
export const mockComplaints: Complaint[] = [
  {
    id: 'comp-1',
    title: 'Broken ceiling fan in Physics Lab 204',
    description: 'The ceiling fan in Physics Lab 204 has been broken for 3 weeks. Students are unable to conduct experiments properly due to poor ventilation and extreme heat. The lab attendant has been informed multiple times but no action has been taken. This is affecting our practical examination preparation.',
    category: 'INFRASTRUCTURE',
    subCategory: 'Electrical',
    urgency: 'HIGH',
    status: 'IN_PROGRESS',
    location: 'Physics Lab 204, Block C',
    department: 'Science Department',
    isAnonymous: false,
    aiConfidence: 92,
    aiAnalysis: {
      categoryPrediction: [
        { category: 'INFRASTRUCTURE', confidence: 0.94 },
        { category: 'LABORATORY', confidence: 0.89 },
      ],
      imageQuality: { score: 85, issues: [] },
      duplicateDetection: { isDuplicate: false, similarity: 0.12 },
      fraudRisk: { score: 5, flags: [] },
      urgencySuggestion: 'HIGH',
      summary: 'Infrastructure issue in physics lab affecting student learning conditions',
      confidenceExplanation: 'Clear photographic evidence of broken equipment with contextual details about impact on examinations. Location and department information verified.',
    },
    communityConfirmations: 4,
    communityScore: 78,
    finalScore: 88,
    submittedAt: '2024-05-10T09:30:00Z',
    studentId: 'user-1',
    instituteId: 'inst-1',
    institute: mockInstitutes[0],
    images: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=800&q=80', thumbnail: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=200&q=60', aiTags: ['fan', 'laboratory', 'ceiling', 'broken'] },
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&q=60', aiTags: ['lab', 'equipment', 'student'] },
    ],
    confirmations: [
      { id: 'conf-1', type: 'SIMILAR_ISSUE', note: 'Same issue in Lab 205', userId: 'user-2', createdAt: '2024-05-11T10:00:00Z' },
      { id: 'conf-2', type: 'WITNESS', userId: 'user-1', createdAt: '2024-05-11T11:30:00Z' },
    ],
    responses: [
      { id: 'resp-1', content: 'Thank you for reporting this. We have logged the issue and assigned it to the electrical maintenance team. Expected resolution: 2 business days.', type: 'UPDATE', isPublic: true, authorId: 'user-3', createdAt: '2024-05-10T14:00:00Z' },
      { id: 'resp-2', content: 'Technician visited today. Fan motor needs replacement. Parts ordered. Will update once installed.', type: 'UPDATE', isPublic: true, authorId: 'user-3', createdAt: '2024-05-12T16:30:00Z' },
    ],
    escalations: [],
    student: mockUsers[0],
  },
  {
    id: 'comp-2',
    title: 'Unsafe drinking water in Hostel Block B',
    description: 'Students in Hostel Block B have been reporting foul smell and discoloration in drinking water for the past week. Several students have experienced stomach issues. The water tank was supposedly cleaned last month but the problem persists. We need immediate water quality testing and remediation.',
    category: 'SANITATION',
    subCategory: 'Water Quality',
    urgency: 'CRITICAL',
    status: 'ESCALATED',
    location: 'Hostel Block B, Ground Floor',
    department: 'Hostel Administration',
    isAnonymous: true,
    aiConfidence: 88,
    aiAnalysis: {
      categoryPrediction: [
        { category: 'SANITATION', confidence: 0.91 },
        { category: 'SAFETY', confidence: 0.76 },
      ],
      imageQuality: { score: 78, issues: ['slight_blur'] },
      duplicateDetection: { isDuplicate: false, similarity: 0.08 },
      fraudRisk: { score: 8, flags: ['anonymous_report'] },
      urgencySuggestion: 'CRITICAL',
      summary: 'Critical health hazard: contaminated drinking water in student hostel',
      confidenceExplanation: 'Multiple corroborating details about health impacts. Images show water discoloration. Anonymous but high community confirmation potential.',
    },
    communityConfirmations: 12,
    communityScore: 85,
    finalScore: 90,
    submittedAt: '2024-05-08T07:15:00Z',
    studentId: 'user-2',
    instituteId: 'inst-2',
    institute: mockInstitutes[1],
    images: [
      { id: 'img-3', url: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80', thumbnail: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&q=60', aiTags: ['water', 'glass', 'discoloration'] },
    ],
    confirmations: [
      { id: 'conf-3', type: 'SIMILAR_ISSUE', userId: 'user-1', createdAt: '2024-05-08T09:00:00Z' },
      { id: 'conf-4', type: 'WITNESS', note: 'I got sick too after drinking this water', userId: 'user-2', createdAt: '2024-05-08T10:30:00Z' },
    ],
    responses: [
      { id: 'resp-3', content: 'This is a serious health concern. We have immediately dispatched the health and safety team to collect water samples for testing. Hostel Block B residents are advised to use bottled water from the mess until further notice.', type: 'UPDATE', isPublic: true, authorId: 'user-3', createdAt: '2024-05-08T10:00:00Z' },
    ],
    escalations: [
      { id: 'esc-1', reason: 'No resolution after 5 days for critical health hazard. Institute response insufficient.', level: 1, status: 'ACTIVE', deadline: '2024-05-20T00:00:00Z', createdAt: '2024-05-13T00:00:00Z', agency: { id: 'agency-1', name: 'Delhi Health Department', level: 'DISTRICT', jurisdiction: 'South Delhi' } },
    ],
    student: mockUsers[1],
  },
  {
    id: 'comp-3',
    title: 'Library AC not working during peak hours',
    description: 'The air conditioning in the central library has been non-functional for over a month. With temperatures reaching 42°C, the study environment is unbearable. Students are forced to study in corridors. The library staff claims budget constraints but this is unacceptable during exam season.',
    category: 'INFRASTRUCTURE',
    subCategory: 'HVAC',
    urgency: 'MEDIUM',
    status: 'INSTITUTE_NOTIFIED',
    location: 'Central Library, Reading Hall',
    department: 'Library Services',
    isAnonymous: false,
    aiConfidence: 85,
    aiAnalysis: {
      categoryPrediction: [
        { category: 'INFRASTRUCTURE', confidence: 0.88 },
        { category: 'LIBRARY', confidence: 0.82 },
      ],
      imageQuality: { score: 90, issues: [] },
      duplicateDetection: { isDuplicate: true, similarity: 0.78, originalId: 'comp-1' },
      fraudRisk: { score: 3, flags: [] },
      urgencySuggestion: 'MEDIUM',
      summary: 'Infrastructure failure affecting library study environment during exam period',
      confidenceExplanation: 'High quality images with clear temperature readings. Similar to previous infrastructure reports but distinct location.',
    },
    communityConfirmations: 2,
    communityScore: 45,
    finalScore: 72,
    submittedAt: '2024-05-14T11:00:00Z',
    studentId: 'user-1',
    instituteId: 'inst-3',
    institute: mockInstitutes[2],
    images: [
      { id: 'img-4', url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80', thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=200&q=60', aiTags: ['library', 'interior', 'hot', 'students'] },
    ],
    confirmations: [],
    responses: [],
    escalations: [],
    student: mockUsers[0],
  },
  {
    id: 'comp-4',
    title: 'Canteen food quality deterioration',
    description: 'The quality of food served in the college canteen has significantly deteriorated over the past month. Students have found insects in rice on two occasions. The canteen contractor was changed recently and the new vendor is cutting corners on hygiene. Several students have reported food poisoning symptoms.',
    category: 'CANTEEN',
    subCategory: 'Food Safety',
    urgency: 'HIGH',
    status: 'UNDER_REVIEW',
    location: 'Main Canteen',
    department: 'Student Welfare',
    isAnonymous: false,
    aiConfidence: 79,
    aiAnalysis: {
      categoryPrediction: [
        { category: 'CANTEEN', confidence: 0.87 },
        { category: 'SAFETY', confidence: 0.71 },
      ],
      imageQuality: { score: 72, issues: ['low_light'] },
      duplicateDetection: { isDuplicate: false, similarity: 0.15 },
      fraudRisk: { score: 15, flags: ['sensitive_claim'] },
      urgencySuggestion: 'HIGH',
      summary: 'Food safety violation in college canteen with potential health risks',
      confidenceExplanation: 'Images show food quality issues but lighting conditions reduce clarity. Multiple student claims support validity.',
    },
    communityConfirmations: 7,
    communityScore: 68,
    finalScore: 76,
    submittedAt: '2024-05-12T13:45:00Z',
    studentId: 'user-2',
    instituteId: 'inst-3',
    institute: mockInstitutes[2],
    images: [
      { id: 'img-5', url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=60', aiTags: ['food', 'canteen', 'quality'] },
    ],
    confirmations: [
      { id: 'conf-5', type: 'SUPPORT', note: 'I also got sick after eating here last week', userId: 'user-1', createdAt: '2024-05-12T15:00:00Z' },
    ],
    responses: [
      { id: 'resp-4', content: 'We are investigating this matter seriously. The canteen committee has been formed and will submit a report within 48 hours. Food samples have been collected for testing.', type: 'UPDATE', isPublic: true, authorId: 'user-3', createdAt: '2024-05-12T17:00:00Z' },
    ],
    escalations: [],
    student: mockUsers[1],
  },
  {
    id: 'comp-5',
    title: 'Bus route cancellation without notice',
    description: 'The college administration cancelled the Route 7 bus service (covering Dwarka and Janakpuri) without any prior notice to students. Over 200 students from these areas are now forced to use expensive private transport or walk long distances. This decision was apparently made to cut costs but severely impacts accessibility.',
    category: 'TRANSPORTATION',
    subCategory: 'Bus Service',
    urgency: 'MEDIUM',
    status: 'RESOLVED',
    location: 'Transport Office',
    department: 'Transport Department',
    isAnonymous: false,
    aiConfidence: 95,
    aiAnalysis: {
      categoryPrediction: [
        { category: 'TRANSPORTATION', confidence: 0.96 },
        { category: 'ADMINISTRATION', confidence: 0.74 },
      ],
      imageQuality: { score: 88, issues: [] },
      duplicateDetection: { isDuplicate: false, similarity: 0.05 },
      fraudRisk: { score: 2, flags: [] },
      urgencySuggestion: 'MEDIUM',
      summary: 'Administrative decision affecting student transportation accessibility',
      confidenceExplanation: 'Documentary evidence of bus schedule changes with official communication. High confidence due to verifiable institutional records.',
    },
    communityConfirmations: 15,
    communityScore: 92,
    finalScore: 94,
    submittedAt: '2024-05-01T08:00:00Z',
    resolvedAt: '2024-05-06T16:00:00Z',
    resolutionProof: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    resolutionNote: 'Route 7 service has been restored effective immediately. Additional bus added during peak hours. Student transport committee formed for future consultations.',
    studentId: 'user-1',
    instituteId: 'inst-1',
    institute: mockInstitutes[0],
    images: [
      { id: 'img-6', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=60', aiTags: ['bus', 'transport', 'students'] },
    ],
    confirmations: [
      { id: 'conf-6', type: 'SIMILAR_ISSUE', note: 'Route 5 also reduced', userId: 'user-2', createdAt: '2024-05-01T10:00:00Z' },
    ],
    responses: [
      { id: 'resp-5', content: 'We acknowledge the inconvenience caused. The transport committee is reviewing all routes and will publish a revised schedule by Friday.', type: 'UPDATE', isPublic: true, authorId: 'user-3', createdAt: '2024-05-01T12:00:00Z' },
      { id: 'resp-6', content: 'Route 7 has been restored. Additional bus deployed. Thank you for your patience.', type: 'RESOLUTION', isPublic: true, authorId: 'user-3', createdAt: '2024-05-06T16:00:00Z' },
    ],
    escalations: [],
    student: mockUsers[0],
  },
];

export const mockNotifications: Notification[] = [
  { id: 'notif-1', type: 'COMPLAINT_ACK', title: 'Complaint Received', message: 'Your complaint about broken ceiling fan has been received and is being processed.', read: false, actionUrl: '/student/reports/comp-1', createdAt: '2024-05-10T09:35:00Z', complaintId: 'comp-1' },
  { id: 'notif-2', type: 'UPDATE', title: 'Status Update', message: 'Technician assigned to your complaint. Expected visit today.', read: false, actionUrl: '/student/reports/comp-1', createdAt: '2024-05-12T09:00:00Z', complaintId: 'comp-1' },
  { id: 'notif-3', type: 'ESCALATION_ALERT', title: 'Issue Escalated', message: 'Your water quality complaint has been escalated to Health Department due to delayed response.', read: true, actionUrl: '/student/reports/comp-2', createdAt: '2024-05-13T00:05:00Z', complaintId: 'comp-2' },
  { id: 'notif-4', type: 'RESOLUTION', title: 'Issue Resolved', message: 'Your bus route complaint has been resolved. Route 7 restored.', read: true, actionUrl: '/student/reports/comp-5', createdAt: '2024-05-06T16:05:00Z', complaintId: 'comp-5' },
];

export function getDashboardStats(role: UserRole, instituteId?: string): DashboardStats {
  if (role === 'STUDENT') {
    const myComplaints = mockComplaints.filter(c => c.studentId === 'user-1');
    return {
      totalComplaints: myComplaints.length,
      pendingComplaints: myComplaints.filter(c => !['RESOLVED', 'VERIFIED_CLOSED', 'REJECTED'].includes(c.status)).length,
      resolvedThisMonth: myComplaints.filter(c => c.resolvedAt && new Date(c.resolvedAt).getMonth() === new Date().getMonth()).length,
      avgResolutionTime: 84,
    };
  }
  if (role === 'INSTITUTE_ADMIN' || role === 'INSTITUTE_STAFF') {
    const instComplaints = mockComplaints.filter(c => c.instituteId === instituteId);
    return {
      totalComplaints: instComplaints.length,
      pendingComplaints: instComplaints.filter(c => !['RESOLVED', 'VERIFIED_CLOSED', 'REJECTED'].includes(c.status)).length,
      resolvedThisMonth: instComplaints.filter(c => c.resolvedAt && new Date(c.resolvedAt).getMonth() === new Date().getMonth()).length,
      avgResolutionTime: 72,
      responseRate: 82,
      escalationRate: 8,
    };
  }
  if (role === 'GOVERNMENT_OFFICIAL') {
    return {
      totalComplaints: mockComplaints.filter(c => c.escalations.length > 0).length,
      pendingComplaints: mockComplaints.filter(c => c.escalations.some(e => e.status === 'ACTIVE')).length,
      resolvedThisMonth: 12,
      avgResolutionTime: 48,
    };
  }
  return {
    totalComplaints: mockComplaints.length,
    pendingComplaints: mockComplaints.filter(c => !['RESOLVED', 'VERIFIED_CLOSED', 'REJECTED'].includes(c.status)).length,
    resolvedThisMonth: 3,
    avgResolutionTime: 68,
  };
}

export function getComplaintById(id: string): Complaint | undefined {
  return mockComplaints.find(c => c.id === id);
}

export function getComplaintsByUser(userId: string): Complaint[] {
  return mockComplaints.filter(c => c.studentId === userId);
}

export function getComplaintsByInstitute(instituteId: string): Complaint[] {
  return mockComplaints.filter(c => c.instituteId === instituteId);
}

export function getEscalatedComplaints(): Complaint[] {
  return mockComplaints.filter(c => c.escalations.length > 0);
}
