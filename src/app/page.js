"use client";
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container p-4">
      <h1>Welcome to Our Financial Services Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Loan Issuance Request */}
        <div className="border p-4 rounded">
          <h2>Loan Issuance Request</h2>
          <p>Apply for a loan quickly and easily.</p>
          <Link href="/loan-request" className="text-blue-500">Go to Loan Request</Link>
        </div>

        {/* Credit Score Evaluation */}
        <div className="border p-4 rounded">
          <h2>Credit Score Evaluation</h2>
          <p>Check your credit score with a single click.</p>
          <Link href="/credit-score" className="text-blue-500">Evaluate Credit Score</Link>
        </div>

        {/* Repayment Schedule */}
        <div className="border p-4 rounded">
          <h2>Repayment Schedule</h2>
          <p>View your repayment schedule and track your loan status.</p>
          <Link href="/repayment-schedule" className="text-blue-500">View Repayment Schedule</Link>
        </div>

      </div>
    </div>
  );
}
