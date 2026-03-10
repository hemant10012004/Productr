import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import OTP from './pages/OTP';
import DashboardLayout from './components/DashboardLayout';
import Products from './pages/Products';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp" element={<OTP />} />

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<div className="p-6"><h1 className="text-2xl font-bold text-gray-800">Home Dashboard</h1><p className="text-gray-500 mt-2">Welcome to your Productr account!</p></div>} />
                    <Route path="products" element={<Products />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
