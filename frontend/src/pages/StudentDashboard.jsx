import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    User,
    CreditCard,
    Home,
    Phone,
    BookOpen,
    AlertCircle,
    ChevronRight,
    MessageSquare,
    Utensils,
    Calendar,
    MapPin,
    ShieldCheck,
    ArrowRight,
    Menu,
    LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import './StudentDashboard.css';
import Navbar from '../components/Navbar';
import LocationMap from '../components/LocationMap';
import AddStudent from '../components/AddStudent';

// Simulated Auth State
const IS_LOGGED_IN = true;

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Mock Data
    const studentData = {
        roomNo: "B-204",
        name: "Alex Johnson",
        courseYear: "B.Tech Computer Science - 3rd Year",
        mobile: "+91 98765 43210",
        paymentStatus: "Paid",
        hostelName: "Srinidhi Premium Boys Hostel",
        joinDate: "July 15, 2023"
    };

    useEffect(() => {
        const checkLogin = () => {
            if (!IS_LOGGED_IN) {
                alert("Please login to access your details");
                navigate("/login");
            }
            setLoading(false);
        };

        const timer = setTimeout(checkLogin, 800);
        return () => clearTimeout(timer);
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!IS_LOGGED_IN) return null;

    return (
        <div className="student-dashboard">

            {/* 1. CUSTOM STICKY NAVBAR - Overriding any global fixed styles to ensure it takes up space */}
           <Navbar />
            <br />
            <br />
            <br />  
            {/* 2. MAIN CONTENT - Boxed sections with massive margins to prevent "merging" */}
            <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-16 space-y-24">

                {/* HEADER SECTION - Sharp, High Contrast */}
                <header className="sd-header">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                        <div className="sd-hero">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest">
                                <ShieldCheck size={14} />
                                Verified Account
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                Welcome, <br />
                                <span className="text-indigo-600">{studentData.name}</span>
                            </h1>
                            <p className="text-slate-500 font-black text-xl uppercase tracking-tight border-l-8 border-slate-100 pl-6">
                                Managing your stay at <span className="text-slate-900">{studentData.hostelName}</span>
                            </p>
                        </div>
                        <div className="sd-stats">
                            <div className="sd-card">
                                <div className="value">{studentData.roomNo}</div>
                                <div className="label">Room No</div>
                            </div>
                            <div className="sd-card">
                                <div>
                                    <span className={`text-sm font-black px-3 py-1 inline-block ${studentData.paymentStatus === 'Paid' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'} uppercase tracking-widest rounded-full`}>
                                        {studentData.paymentStatus}
                                    </span>
                                </div>
                                <div className="label">Status</div>
                            </div>
                        </div>
                    </div>
                </header>
                     <AddStudent/>
                {/* DETAILS SECTION - Sharp Table with alternating colors */}
                <section className="sd-section">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-4">
                        <span className="bg-slate-900 text-white px-4 py-1">01</span>
                        Residential Details
                    </h2>
                    <div className="sd-table">
                        <table>
                            <tbody>
                                {[
                                    { label: "Full Name", value: studentData.name },
                                    { label: "Course & Year", value: studentData.courseYear },
                                    { label: "Mobile Number", value: studentData.mobile },
                                    { label: "Hostel Name", value: studentData.hostelName },
                                    { label: "Join Date", value: studentData.joinDate },
                                    { label: "Room Allotment", value: `${studentData.roomNo} (Bed A)` }
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                        <td className="key">{row.label}</td>
                                        <td className="val">{row.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* QUICK ACTIONS - Sharp Grid with hover effects */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-4">
                        <span className="bg-slate-900 text-white px-4 py-1">02</span>
                        Quick Actions
                    </h2>

                    <div className="sd-quick-actions">
                        {[
                            { title: "Raise Complaint", desc: "Maintenance & Room issues", icon: <MessageSquare />, color: "bg-amber-400" },
                            { title: "Mess Menu", desc: "Weekly food schedule", icon: <Utensils />, color: "bg-blue-400" },
                            { title: "Payment History", desc: "Receipts & Transactions", icon: <CreditCard />, color: "bg-purple-400" }
                        ].map((action, idx) => (
                            <button key={idx} className="action-card">
                                <div className={`icon ${action.color} p-3`}>{action.icon}</div>
                                <div>
                                    <h4>{action.title}</h4>
                                    <p>{action.desc}</p>
                                </div>
                                <div className="mt-auto flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest">
                                    Launch Tool <ArrowRight size={16} />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* CONTACT & SUPPORT - Sharp Blocks */}
                

            </main>

            <LocationMap />

            <Footer />
        </div>
    );
};

export default StudentDashboard;