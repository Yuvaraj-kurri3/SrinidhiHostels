import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Calendar, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';
import './FeeStatus.css';

const FeeStatus = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const months = [
        "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"
    ];
    const Paidmoths=[
        "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"
    ]
    const year={
        "Jun":25,
        "Jul":25,
        "Aug":25,
        "Sep":25,
        "Oct":25,
        "Nov":25,
        "Dec":25,
    }

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleDateString('en-US', { month: 'short' }).toLowerCase();
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Helper function to get payment for a specific month
    const getPaymentForMonth = (payments, monthIndex) => {
        if (!payments || payments.length === 0) return null;
        // For now, we'll check if any payment exists
        // You can enhance this to match specific months if needed
        return payments[monthIndex] || null;
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${api}/api/students/paymenthistroy`);
                console.log(response.data.responses)
                if (response.status === 200) {
                    // Enrich students with mock payment data
                 setStudents(response.data.responses)
                } else {
                    setError('Failed to fetch students');
                }
            } catch (err) {
                console.error('Error:', err);
                setError('Something went wrong while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return (
            <div className="fee-status-page">
                <Navbar />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading Fee Status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fee-status-page">
            <Navbar />

            <main className="fee-status-container">
                <div className="page-header">
                    <h1 className="page-title">Student Fee Status</h1>
                    <p className="page-subtitle">Academic Year 2025-2026</p>
                </div>

                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="table-card">
                        <div className="table-responsive">
                            <table className="fee-table">
                                <thead>
                                    <tr>
                                        <th className="sticky-col col-sno">S.No</th>
                                        <th className="sticky-col col-name" style={{ left: '50px' }}>Student Name</th>
                                        <th className="col-room">Room</th>
                                        {months.map(month => (
                                            <th key={month} className="col-month">{month}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student._id}>
                                            <td className="sticky-col col-sno">{index + 1}</td>
                                            <td className="sticky-col col-name" style={{ left: '50px', fontWeight: '500' }}>
                                                {student.studentname}
                                            </td>
                                            <td className="col-room">{student.roomnumber}</td>
                                            {months.map((month, monthIndex) => {
                                                const payment = student.payments && student.payments[monthIndex];
                                                // Mark as paid if in Paidmoths or if payment status is Paid
                                                const isPaid = Paidmoths.includes(month) || (payment && payment.status === 'Paid');
                                                const borderColor = isPaid ? '#10b981' : '#ef4444';
                                                // Use payment date if exists, otherwise use default date (01st of month)
                                                const displayDate = isPaid && payment && payment.date ? formatDate(payment.date) : `01-${month}-${year[month] || 26}`;
                                                
                                                return (
                                                    <td key={`${student._id}-${month}`} className="col-month">
                                                        <button
                                                            style={{
                                                                border: `2px solid ${borderColor}`,
                                                                backgroundColor: isPaid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                                color: borderColor,
                                                                padding: '8px 12px',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer',
                                                                fontWeight: '500',
                                                                fontSize: '14px',
                                                                transition: 'all 0.3s ease',
                                                                width: '100%',
                                                                minHeight: '40px'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.backgroundColor = borderColor;
                                                                e.target.style.color = 'white';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.backgroundColor = isPaid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
                                                                e.target.style.color = borderColor;
                                                            }}
                                                            
                                                        >
                                                            {isPaid ? displayDate : 'Unpaid'}
                                                        </button>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default FeeStatus;
