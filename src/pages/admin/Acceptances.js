// src/pages/admin/Acceptances.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Acceptances = () => {
  const [acceptances, setAcceptances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptances = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5000/api/acceptances', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setAcceptances(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        setError(err.message || 'Failed to load acceptances');
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptances();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Accepted Quotations
        </h1>

        {acceptances.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No acceptances yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-semibold">Proposal ID</th>
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Email</th>
                  <th className="p-4 text-left font-semibold">Position</th>
                  <th className="p-4 text-left font-semibold">Start Date</th>
                  <th className="p-4 text-left font-semibold">Accepted At</th>
                </tr>
              </thead>
              <tbody>
                {acceptances.map((acc, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-4">{acc.proposalId}</td>
                    <td className="p-4">{acc.name}</td>
                    <td className="p-4">{acc.email}</td>
                    <td className="p-4">{acc.positionHeld}</td>
                    <td className="p-4">{new Date(acc.anticipatedStartDate).toLocaleDateString()}</td>
                    <td className="p-4">{new Date(acc.acceptedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Acceptances;