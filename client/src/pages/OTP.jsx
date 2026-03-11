import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
export default function OTP() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    const identifier = location.state?.identifier;

    useEffect(() => {
        if (!identifier) {
            navigate('/login');
        }
    }, [identifier, navigate]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if current field is filled
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current field is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length < 6) {
            setError('Please enter complete OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await api.post('/api/auth/verify-otp', {
                identifier,
                otp: otpValue
            });

            // Store token and redirect
            localStorage.setItem('productr_token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setTimer(30);
        setError('');
        try {
            const res = await api.post('/api/auth/send-otp', { identifier });
            alert(`A new OTP has been sent to ${identifier}`);
        } catch (err) {
            setError('Failed to resend OTP');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Left Banner Area (Same as Login) */}
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
                    <h1 className="text-[28px] font-bold text-[#1B1D4D] mb-10">Login to your Productr Account</h1>

                    <form onSubmit={handleVerify} className="space-y-8">
                        {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm text-center font-medium">{error}</div>}
                        <div className="flex gap-3 sm:gap-4 justify-between">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 sm:w-14 sm:h-16 border border-gray-200 rounded-xl text-center text-xl font-semibold text-gray-800 focus:border-[#1F29B6] focus:ring-1 focus:ring-[#1F29B6] outline-none transition-all"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.join('').length < 6}
                            className="w-full bg-[#11168B] hover:bg-[#0D1270] disabled:bg-[#11168B]/70 text-white py-4 rounded-xl font-medium text-base transition-colors duration-200"
                        >
                            {loading ? 'Verifying...' : 'Enter your OTP'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Didn't receive OTP?{' '}
                        {timer > 0 ? (
                            <span className="font-medium">Resend in {timer}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-[#1F29B6] font-medium hover:underline"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
