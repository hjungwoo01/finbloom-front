"use client";
import React, { useState, useEffect } from 'react';

export default function LoanRequestPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [repaymentTerm, setRepaymentTerm] = useState('');
  const [previousLoans, setPreviousLoans] = useState([]);

  useEffect(() => {
    // Fetch previous loan requests from the backend
    const fetchPreviousLoans = async () => {
      try {
        const response = await fetch('/api/loans'); // TODO: Update this endpoint
        const data = await response.json();
        setPreviousLoans(data.loans);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchPreviousLoans();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/submit-loan', { // TODO: Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loanAmount, purpose, repaymentTerm }),
      });
      if (response.ok) {
        console.log('Loan Request Submitted');
      } else {
        console.error('Failed to submit loan request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container flex">
        <div className="w-1/2 p-4">
            <h1>Loan Issuance Request</h1>
            <form onSubmit={handleSubmit} style={{ color: 'black' }}> {/* Adjust color as needed */}
            <div className="form-group mb-4">
                <label htmlFor="loanAmount" className="block mb-2">Loan Amount</label>
                <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="w-full p-2" // Styling for the input
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="purpose" className="block mb-2">Purpose of Loan</label>
                <input
                type="text"
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Enter purpose of loan"
                className="w-full p-2" // Styling for the input
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="repaymentTerm" className="block mb-2">Repayment Term</label>
                <input
                type="text"
                id="repaymentTerm"
                value={repaymentTerm}
                onChange={(e) => setRepaymentTerm(e.target.value)}
                placeholder="Enter repayment term"
                className="w-full p-2" // Styling for the input
                />
            </div>

            <button type="submit" className="p-2 bg-blue-500 text-white">Submit Request</button>
            </form>
        </div>

      <div className="w-1/2 p-4">
        <h2>Previous Loan Requests</h2>
        <ul>
          {previousLoans.map((loan, index) => (
            <li key={index}>
              Amount: {loan.amount}, Purpose: {loan.purpose}, Term: {loan.term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}