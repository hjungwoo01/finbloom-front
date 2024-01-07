"use client";
import React, { useState, useEffect } from 'react';

export default function RepaymentSchedulePage() {
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);

  useEffect(() => {
    // Fetch repayment schedule from the backend
    const fetchRepaymentSchedule = async () => {
      try {
        // TODO: Replace '/api/repayment-schedule' with actual API endpoint
        const response = await fetch('/api/repayment-schedule');
        if (response.ok) {
          const data = await response.json();
          setRepaymentSchedule(data.schedule); // Adjust based on API response
        } else {
          console.error('Failed to fetch repayment schedule');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRepaymentSchedule();
  }, []);

  return (
    <div className="container p-4">
      <h1>Repayment Schedule</h1>
      {repaymentSchedule.length > 0 ? (
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {repaymentSchedule.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>${item.amount}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No repayment schedule found.</p>
      )}
    </div>
  );
}