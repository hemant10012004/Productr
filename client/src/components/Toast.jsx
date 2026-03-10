import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, isVisible, onClose }) {
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-[#4CAF50] rounded-md p-1">
                <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800 text-sm">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
