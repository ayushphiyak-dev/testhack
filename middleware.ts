generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String    // hashed
  name          String
  phone         String?
  avatar        String?
  role          UserRole  @default(STUDENT)
  status        UserStatus @default(ACTIVE)
  isAnonymous   Boolean   @default(false)
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?

  // Relations
  complaints    Complaint[]
  confirmations Confirmation[]
  responses     Response[]
  notifications Notification[]
  auditLogs     AuditLog[]
  institute     Institute? @relation(fields: [instituteId], references: [id])
  instituteId   String?
  governmentAgency GovernmentAgency? @relation(fields: [agencyId], references: [id])
  agencyId      String?

  @@map("users")
}

model Institute {
  id            String   @id @default(uuid())
  name          String
  type          InstituteType
  address       String
  city          String
  district      String
  state         String
  pincode       String
  phone         String?
  email         String?
  website       String?
  logo          String?
  verified      Boolean  @default(false)
  verificationDoc String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  users         User[]
  complaints    Complaint[]
  ratings       InstituteRating[]

  @@map("institutes")
}

model GovernmentAgency {
  id          String   @id @default(uuid())
  name        String
  level       AgencyLevel // DISTRICT, STATE, NATIONAL
  jurisdiction String
  address     String?
  email       String
  phone       String?
  verified    Boolean  @default(false)
  createdAt   DateTime @default(now())

  users       User[]
  escalations Escalation[]

  @@map("government_agencies")
}

model Complaint {
  id              String   @id @default(uuid())
  title           String
  description     String   @db.Text
  category        ComplaintCategory
  subCategory     String?
  urgency         UrgencyLevel @default(MEDIUM)
  status          ComplaintStatus @default(DRAFT)
  location        String?
  department      String?
  isAnonymous     Boolean  @default(false)
  aiConfidence    Float?   // 0-100
  aiAnalysis      Json?    // full AI analysis result
  duplicateOfId   String?
  duplicateScore  Float?
  communityConfirmations Int @default(0)
  communityScore  Float?   // 0-100
  finalScore      Float?   // weighted combination
  submittedAt     DateTime @default(now())
  resolvedAt      DateTime?
  resolutionProof String?  // image URL
  resolutionNote  String?  @db.Text
  rejectionReason String?

  // Relations
  student         User     @relation(fields: [studentId], references: [id])
  studentId       String
  institute       Institute @relation(fields: [instituteId], references: [id])
  instituteId     String
  images          Image[]
  confirmations   Confirmation[]
  responses       Response[]
  escalations     Escalation[]
  auditLogs       AuditLog[]
  notifications   Notification[]

  @@map("complaints")
}

model Image {
  id          String   @id @default(uuid())
  url         String
  thumbnail   String?
  metadata    Json?    // EXIF, size, etc.
  aiQuality   Float?   // blur detection, relevance
  aiTags      String[] // detected objects
  createdAt   DateTime @default(now())

  complaint   Complaint @relation(fields: [complaintId], references: [id], onDelete: Cascade)
  complaintId String

  @@map("images")
}

model Confirmation {
  id          String   @id @default(uuid())
  type        ConfirmationType
  note        String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
  userId      String
  complaint   Complaint @relation(fields: [complaintId], references: [id], onDelete: Cascade)
  complaintId String

  @@unique([userId, complaintId])
  @@map("confirmations")
}

model Response {
  id          String   @id @default(uuid())
  content     String   @db.Text
  type        ResponseType @default(UPDATE)
  isPublic    Boolean  @default(true)
  createdAt   DateTime @default(now())

  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  complaint   Complaint @relation(fields: [complaintId], references: [id], onDelete: Cascade)
  complaintId String

  @@map("responses")
}

model Escalation {
  id          String   @id @default(uuid())
  reason      String   @db.Text
  level       Int      @default(1) // escalation level
  status      EscalationStatus @default(ACTIVE)
  assignedTo  String?  // field officer
  actionTaken String?  @db.Text
  deadline    DateTime?
  createdAt   DateTime @default(now())
  resolvedAt  DateTime?

  complaint   Complaint @relation(fields: [complaintId], references: [id], onDelete: Cascade)
  complaintId String
  agency      GovernmentAgency @relation(fields: [agencyId], references: [id])
  agencyId    String

  @@map("escalations")
}

model Notification {
  id          String   @id @default(uuid())
  type        NotificationType
  title       String
  message     String   @db.Text
  read        Boolean  @default(false)
  actionUrl   String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
  userId      String
  complaint   Complaint? @relation(fields: [complaintId], references: [id], onDelete: SetNull)
  complaintId String?

  @@map("notifications")
}

model AuditLog {
  id          String   @id @default(uuid())
  action      String
  entityType  String   // COMPLAINT, USER, INSTITUTE, etc.
  entityId    String
  oldValue    Json?
  newValue    Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
  userId      String
  complaint   Complaint? @relation(fields: [complaintId], references: [id], onDelete: SetNull)
  complaintId String?

  @@map("audit_logs")
}

model InstituteRating {
  id              String   @id @default(uuid())
  overallScore    Float    // 0-100
  responseRate    Float    // percentage
  avgResolutionTime Float  // hours
  repeatedIssueRate Float  // percentage
  transparencyScore Float  // 0-100
  unresolvedSeverity Float // 0-100
  totalComplaints Int      @default(0)
  resolvedComplaints Int   @default(0)
  periodStart     DateTime
  periodEnd       DateTime
  createdAt       DateTime @default(now())

  institute       Institute @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  instituteId     String

  @@map("institute_ratings")
}

enum UserRole {
  STUDENT
  INSTITUTE_ADMIN
  INSTITUTE_STAFF
  GOVERNMENT_OFFICIAL
  PLATFORM_ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  PENDING_VERIFICATION
  DELETED
}

enum InstituteType {
  SCHOOL
  COLLEGE
  UNIVERSITY
  TRAINING_CENTER
  COACHING_INSTITUTE
}

enum AgencyLevel {
  DISTRICT
  STATE
  NATIONAL
}

enum ComplaintCategory {
  INFRASTRUCTURE
  SAFETY
  SANITATION
  ACADEMIC_QUALITY
  FACULTY_BEHAVIOR
  ADMINISTRATION
  FINANCIAL
  TRANSPORTATION
  HOSTEL
  LABORATORY
  LIBRARY
  CANTEEN
  DISCRIMINATION
  BULLYING
  OTHER
}

enum UrgencyLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum ComplaintStatus {
  DRAFT
  SUBMITTED
  AI_CHECKING
  COMMUNITY_CONFIRMATION
  INSTITUTE_NOTIFIED
  UNDER_REVIEW
  IN_PROGRESS
  RESOLVED
  REJECTED
  VERIFIED_CLOSED
  ESCALATED
  APPEALED
}

enum ConfirmationType {
  SIMILAR_ISSUE
  WITNESS
  SUPPORT
}

enum ResponseType {
  UPDATE
  RESOLUTION
  REJECTION
  CLARIFICATION
  ESCALATION_NOTICE
}

enum EscalationStatus {
  ACTIVE
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum NotificationType {
  COMPLAINT_ACK
  INSTITUTE_NOTIFY
  REMINDER
  ESCALATION_ALERT
  RESOLUTION
  MODERATION_REQUEST
  SYSTEM
  COMMENT
}
