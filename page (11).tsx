import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EduWatch - Student Complaint & Accountability Platform",
  description: "Report, verify, and track education infrastructure issues. A transparent accountability system for schools, colleges, and universities.",
  keywords: ["student complaints", "education accountability", "school infrastructure", "college issues", "education transparency"],
  authors: [{ name: "EduWatch" }],
  openGraph: {
    title: "EduWatch - Making Education Institutions Accountable",
    description: "Report issues, track resolutions, and hold institutions accountable with verified data.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-slate-50`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
      </body>
    </html>
  );
}
