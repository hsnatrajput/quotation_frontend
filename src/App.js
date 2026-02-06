import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProposalPage from './pages/public/ProposalPage';
import AdminLogin from './pages/admin/Login';
import QuotationsList from './pages/admin/QuotationsList';
import QuotationEdit from './pages/admin/QuotationEdit';
import QuotationCreate from './pages/admin/QuotationCreate';  // ← NEW

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public */}
          <Route path="/proposal/:proposalId" element={<ProposalPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/quotations"
            element={
              <ProtectedRoute>
                <QuotationsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/quotation/edit/:id"
            element={
              <ProtectedRoute>
                <QuotationEdit />
              </ProtectedRoute>
            }
          />

          {/* New: Create quotation route */}
          <Route
            path="/admin/quotation/create"
            element={
              <ProtectedRoute>
                <QuotationCreate />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                {/* Your blue test card + message */}
                <div className="bg-blue-600 text-white p-8 text-center rounded-2xl shadow-2xl max-w-2xl mx-4 mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Tailwind v4 is working!
                  </h1>
                  <p className="text-xl md:text-2xl">
                    If you see this blue card with white text styled correctly → success
                  </p>
                </div>

                <div className="text-center p-8">
                  <h1 className="text-5xl font-bold text-gray-800 mb-6">Air Utilities</h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Quotation system – access a quotation via the link sent to you
                  </p>
                  <p className="text-gray-500">
                    Example: <code className="bg-gray-200 px-2 py-1 rounded">/proposal/s562lviai9</code>
                  </p>
                  <p className="mt-6 text-lg">
                    Admin area: <a href="/admin/login" className="text-blue-600 hover:underline">Login here</a>
                  </p>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;