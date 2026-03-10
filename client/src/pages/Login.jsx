import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!identifier) return;

        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/send-otp', { identifier });
            // In a real app we'd just show "OTP Sent", but here we log it and alert for easy testing
            // Real Implementation: No more exposed dev_otp
            alert(`OTP has been sent to ${identifier}`);
            navigate('/otp', { state: { identifier } });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Left Banner Area */}
            <div className="hidden lg:flex lg:w-1/2 p-6 relative">
                <div className="absolute inset-0 bg-[#E8EBF2] bg-opacity-50">
                    {/* Abstract wavy background shape approximation */}
                    <svg className="absolute w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 0 C 20 60, 80 40, 100 100 L0 100 Z" fill="#D3D9E9" opacity="0.4" />
                        <path d="M100 0 C 80 40, 20 60, 0 100 L100 100 Z" fill="#F4E9E7" opacity="0.4" />
                    </svg>
                </div>

                <div className="relative z-10 w-full rounded-[32px] overflow-hidden flex flex-col pt-8 px-10">
                    {/* Logo inside left pane */}
                    <div className="flex items-center gap-2 mb-16">
                        <span className="text-[#1B1D4D] text-2xl font-bold tracking-tight">Productr</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#F16521]">
                            <circle cx="8" cy="12" r="6" stroke="currentColor" strokeWidth="3" />
                            <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </div>

                    {/* Central Image Card */}
                    <div className="flex-1 flex items-center justify-center -mt-12">
                        <div className="relative w-72 h-96 bg-gradient-to-br from-[#EA8336] to-[#401C11] rounded-[40px] shadow-2xl overflow-hidden flex flex-col justify-end p-8 border border-white/10">
                            {/* Person Silhouette Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none mix-blend-overlay">
                                <svg viewBox="0 0 200 200" className="w-full h-full text-black" fill="currentColor">
                                    <path d="M100 50c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm-10 50l-20 80h10l15-60 15 60h10l-20-80h-10z" />
                                </svg>
                            </div>
                            <h2 className="text-white text-xl font-medium text-center relative z-10 leading-snug">
                                Uplist your<br />product to market
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Area */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
                <div className="w-full max-w-md">
                    <h1 className="text-[28px] font-bold text-[#1B1D4D] mb-10">
                        {isSignup ? 'Signup for your Productr Account' : 'Login to your Productr Account'}
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm mb-4">{error}</div>}
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                                Email or Phone number
                            </label>
                            <input
                                id="identifier"
                                type="text"
                                placeholder="Enter email or phone number"
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#1F29B6] focus:ring-1 focus:ring-[#1F29B6] outline-none transition-all bg-white"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#11168B] hover:bg-[#0D1270] disabled:bg-[#11168B]/70 text-white py-3.5 rounded-xl font-medium transition-colors duration-200"
                        >
                            {loading ? 'Sending OTP...' : (isSignup ? 'Sign Up' : 'Login')}
                        </button>
                    </form>
                </div>

                {/* Signup Box at bottom */}
                <div className="absolute bottom-12 w-full max-w-sm px-8">
                    <div className="border border-dashed border-gray-300 rounded-xl py-6 text-center text-sm text-gray-500 bg-white/50 backdrop-blur-sm">
                        <div>{isSignup ? 'Already have a Productr Account?' : "Don't have a Productr Account?"}</div>
                        <button
                            type="button"
                            onClick={() => setIsSignup(!isSignup)}
                            className="text-[#1F29B6] font-semibold mt-1 inline-block hover:underline"
                        >
                            {isSignup ? 'Login Here' : 'SignUp Here'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
