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

    // Helper to generate random date within a month
    const getRandomDate = (monthIndex) => {
        // Month index 0-11 (Jan-Dec). mapping our months array to real month indices
        // our months array starts with Jun (index 5) -> Apr (index 3 next year)

        const currentYear = new Date().getFullYear();
        // Logic to handle academic year spanning 2 calendar years
        // Jun(5)-Dec(11) is previous year/current year
        // Jan(0)-Apr(3) is current year/next year

        // For simplicity, let's just generate a random day 1-28
        const day = Math.floor(Math.random() * 28) + 1;
        return `${day}`;
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${api}/api/students/allstudents`);
                if (response.status === 200) {
                    // Enrich students with mock payment data
                 setStudents(response.data.data)
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
                    <p className="page-subtitle">Academic Year 2024-2025</p>
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
                                                {student.StudentName}
                                            </td>
                                            <td className="col-room">{student.RoomNumber}</td>
                                             <td className="col-room">{student.paymentstatus && student.paymentstatus=="Paid" ? 'green' : 'red' }</td>
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
