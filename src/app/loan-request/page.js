"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserAuth } from '../utils/auth-helper';

export default function LoanRequestPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [repaymentDate, setRepaymentDate] = useState('');
  const [previousLoans, setPreviousLoans] = useState([]);

  const user = useContext(UserAuth);
  const router = useRouter();


  useEffect(() => {
    if (!router.isReady || !user) {
      return;
    }

    // Fetch previous loan requests from Firestore
    const fetchPreviousLoans = async () => {
      const q = query(collection(db, "users", user.uid, "loans"));
      try {
        const querySnapshot = await getDocs(q);
        const loans = querySnapshot.docs.map(doc => doc.data());
        setPreviousLoans(loans);
      } catch (error) {
        console.error('Error fetching loans from Firestore:', error);
      }
    };

    fetchPreviousLoans();
  }, [router.isReady, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Ensure user is logged in

    try {
      const loanId = `loan${Math.random().toString(16).slice(2)}`;
      const loanData = {
        loanId: loanId,
        isEligible: true,
        takenAmount: parseFloat(loanAmount),
        repaymentAmount: parseFloat(loanAmount) * 1.1,
        dateDue: repaymentDate,
        dateTaken: loanDate,
        repayed: false
      };

      await addDoc(collection(db, "users", user.uid, "loans"), loanData);
    } catch (error) {
      console.error('Error submitting loan to Firestore:', error);
    }
  };

  return (
    <div className="container flex">
        <div className="w-1/2 p-4">
            <h1>Loan Issuance Request</h1>
            <form onSubmit={handleSubmit} style={{ color: 'black' }}>
            <div className="form-group mb-4">
                <label htmlFor="loanAmount" className="block mb-2" style={{color: 'white'}}>Loan Amount</label>
                <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="w-full p-2"
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="loanDate" className="block mb-2"style={{color: 'white'}}>Date of Loan</label>
                <input
                type="date"
                id="loanDate"
                value={loanDate}
                onChange={(e) => setLoanDate(e.target.value)}
                className="w-full p-2"
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="repaymentDate" className="block mb-2" style={{color: 'white'}}>Repayment Date</label>
                <input
                type="date"
                id="repaymentDate"
                value={repaymentDate}
                onChange={(e) => setRepaymentDate(e.target.value)}
                className="w-full p-2"
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
                  Amount: {loan.amount}, Date Taken: {loan.dateTaken}, Repayment Date: {loan.dateDue}
                </li>
              ))}
            </ul>
        </div>
    </div>
  );
}