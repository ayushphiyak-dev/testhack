import toast from 'react-hot-toast';

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  type: 'complaint_ack' | 'institute_notify' | 'reminder' | 'escalation' | 'resolution' | 'moderation';
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log('[Email Service]', payload.type, '→', payload.to);

  // In production, this would call Resend API
  // await resend.emails.send({
  //   from: 'EduWatch <noreply@eduwatch.in>',
  //   to: payload.to,
  //   subject: payload.subject,
  //   html: payload.body,
  // });

  return { success: true };
}

export async function sendComplaintAcknowledgement(studentEmail: string, complaintTitle: string): Promise<void> {
  await sendEmail({
    to: studentEmail,
    subject: 'Complaint Received - EduWatch',
    body: `<h2>Complaint Received</h2><p>Your complaint "${complaintTitle}" has been received and is being processed.</p>`,
    type: 'complaint_ack',
  });
}

export async function sendInstituteNotification(instituteEmail: string, complaintTitle: string): Promise<void> {
  await sendEmail({
    to: instituteEmail,
    subject: 'New Complaint Filed - Action Required',
    body: `<h2>New Complaint</h2><p>A new complaint "${complaintTitle}" has been filed against your institution. Please review and respond.</p>`,
    type: 'institute_notify',
  });
}

export async function sendEscalationAlert(officialEmail: string, complaintTitle: string, reason: string): Promise<void> {
  await sendEmail({
    to: officialEmail,
    subject: 'URGENT: Complaint Escalated - EduWatch',
    body: `<h2>Complaint Escalated</h2><p>The complaint "${complaintTitle}" has been escalated due to: ${reason}</p>`,
    type: 'escalation',
  });
}

export async function sendReminder(email: string, complaintTitle: string, daysRemaining: number): Promise<void> {
  await sendEmail({
    to: email,
    subject: 'Reminder: Pending Complaint Response',
    body: `<h2>Response Reminder</h2><p>You have ${daysRemaining} days remaining to respond to "${complaintTitle}".</p>`,
    type: 'reminder',
  });
}
