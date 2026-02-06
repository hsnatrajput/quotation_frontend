// src/pages/admin/QuotationsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuotationsList = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotations = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/quotations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuotations(res.data.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Session expired or unauthorized. Please login again.');
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        } else {
          setError('Failed to load quotations. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const handleViewPublic = (proposalId) => {
    window.open(`http://localhost:3000/proposal/${proposalId}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700">Loading quotations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-lg px-6">
          <h1 className="text-3xl font-bold text-red-600 mb-6">Error</h1>
          <p className="text-xl text-gray-700 mb-8">{error}</p>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin/login');
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Manage Quotations
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/quotation/create')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Create New Quotation
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        {quotations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Quotations Yet
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              You haven't created any quotations. Start by creating your first one.
            </p>
            <button
              onClick={() => navigate('/admin/quotation/create')}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 transition text-lg font-medium"
            >
              Create Your First Quotation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {quotations.map((q) => (
              <div
                key={q._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Card header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-5">
                  <h3 className="text-xl font-bold truncate">
                    {q.projectTitle || 'Untitled Project'}
                  </h3>
                  <p className="text-blue-100 mt-1 text-sm">
                    {q.customerName} • {new Date(q.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Address:</span>{' '}
                    {q.projectAddress?.slice(0, 40)}
                    {q.projectAddress?.length > 40 ? '...' : ''}
                  </p>

                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Total:</span>{' '}
                    <strong className="text-green-700">
                      £{q.totalAmount?.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </strong>
                  </p>

                  <p className="text-sm text-gray-500 mb-6">
                    Status: <span className="font-medium capitalize">{q.status || 'draft'}</span>
                  </p>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate(`/admin/quotation/edit/${q._id}`)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleViewPublic(q.proposalId)}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
                    >
                      View Public
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationsList;