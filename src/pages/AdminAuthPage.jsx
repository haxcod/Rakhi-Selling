import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthPage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code === 'rakhi@2025') {
      localStorage.setItem('admin_access', 'true');
      navigate('/kundan-ashish-rakhi-startup');
    } else {
      alert('❌ Invalid access code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
          🔐 Admin Access
        </h2>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter secret code"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminAuthPage;
