import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, XCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export default function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify-email/${token}`);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };
    verify();
  }, [token]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => navigate('/login'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-product p-8 shadow-modal text-center"
      >
        {status === 'loading' && (
          <>
            <Loader className="w-16 h-16 text-amber-500 animate-spin mx-auto mb-4" />
            <h1 className="font-serif text-2xl text-stone-900 mb-2">Verifying...</h1>
            <p className="text-stone-600">Please wait while we verify your email.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="font-serif text-2xl text-stone-900 mb-2">Email Verified!</h1>
            <p className="text-stone-600 mb-6">
              Your email has been verified successfully. Redirecting to login...
            </p>
            <Link to="/login" className="text-amber-600 hover:underline">
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="font-serif text-2xl text-stone-900 mb-2">Verification Failed</h1>
            <p className="text-stone-600 mb-6">
              This verification link is invalid or has expired.
            </p>
            <Link to="/login" className="text-amber-600 hover:underline">
              Back to Login
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}