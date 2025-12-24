import React, { useState } from 'react';
import { Menu, LogOut, Edit2, Trash2, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [students, setStudents] = useState([
        { id: 1, roomNo: '101', sharing: '2', startDate: '2025-06-01', amount: 5000, name: 'Ramesh', mobile: '9876543210', college: 'ABC College', course: 'B.Tech', year: '2nd' },
        { id: 2, roomNo: '101', sharing: '2', startDate: '2025-06-01', amount: 5000, name: 'Suresh', mobile: '9123456789', college: 'ABC College', course: 'B.Tech', year: '2nd' },
    ]);

    const [formData, setFormData] = useState({
        roomNo: '',
        sharing: '1',
        startDate: '',
        amount: '',
        name: '',
        mobile: '',
        collegeName: '',
        course: '',
        year: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newStudent = {
                id: students.length + 1,
                ...formData
            };
            setStudents([...students, newStudent]);
            setFormData({
                roomNo: '', sharing: '1', startDate: '', amount: '', name: '', mobile: '',
                collegeName: '', course: '', year: ''
            });
            setIsLoading(false);
            alert('Student added successfully!');
        }, 1000);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            setStudents(students.filter(student => student.id !== id));
        }
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="admin-dashboard">
            {/* Navigation */}
            <br />
             <Navbar />

            {/* Header */}
            <header className="dashboard-header container">
                <div>
                    <h1 className="dashboard-title">Hostel Management Dashboard</h1>
                    <p className="dashboard-subtitle">Manage students, rooms, and payments easily</p>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-value">{students.length}</span>
                        <span className="stat-label">Total Students</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Rooms Occupied</span>
                    </div>
                </div>
            </header>

            {/* Add Student Form */}
            <section className="dashboard-section container">
                <h2 className="section-header">Add New Student</h2>
                <form onSubmit={handleSubmit} className="add-student-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Room Number</label>
                            <input
                                type="text"
                                name="roomNo"
                                value={formData.roomNo}
                                onChange={handleInputChange}
                                placeholder="Enter room number"
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Type of Sharing</label>
                            <select
                                name="sharing"
                                value={formData.sharing}
                                onChange={handleInputChange}
                                className="form-select"
                                required
                            >
                                <option value="1">1 Sharing</option>
                                <option value="2">2 Sharing</option>
                                <option value="3">3 Sharing</option>
                                <option value="4">4 Sharing</option>
                                <option value="5">5 Sharing</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Starting Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount / Month</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Enter monthly amount"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Student Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter student name"
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                placeholder="Enter mobile number"
                                pattern="[0-9]{10}"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="college-details-group">
                        <h4>College Details</h4>
                        <div className="form-row">
                            <input
                                type="text"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleInputChange}
                                placeholder="College Name"
                                className="form-input"
                                required
                            />
                            <input
                                type="text"
                                name="course"
                                value={formData.course}
                                onChange={handleInputChange}
                                placeholder="Course"
                                className="form-input"
                                required
                            />
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                placeholder="Year"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-add" disabled={isLoading}>
                        {isLoading ? 'Adding Student...' : 'Add Student'}
                    </button>
                </form>
            </section>

            {/* Unpaid Students Section */}
            <section className="dashboard-section unpaid-section container">
                <h2 className="section-header">Unpaid Students (This Month)</h2>
                <div className="table-container">
                    <table className="data-table unpaid-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Room No</th>
                                <th>Amount Due</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Anil</td>
                                <td>203</td>
                                <td>₹6000</td>
                                <td>98XXXXXX12</td>
                            </tr>
                            <tr>
                                <td>Kiran</td>
                                <td>105</td>
                                <td>₹4500</td>
                                <td>91XXXXXX34</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Student Details Table */}
            <section className="dashboard-section container">
                <h2 className="section-header">Student Details</h2>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Room</th>
                                <th>Sharing</th>
                                <th>Start Date</th>
                                <th>Amount</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>College</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.roomNo}</td>
                                    <td>{student.sharing}</td>
                                    <td>{student.startDate}</td>
                                    <td>₹{student.amount}</td>
                                    <td>{student.name}</td>
                                    <td>{student.mobile}</td>
                                    <td>{student.college}</td>
                                    <td>
                                        <button className="action-btn edit" title="Edit"><Edit2 size={18} /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(student.id)} title="Delete"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Footer */}
            <footer className="container" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                <p>© 2025 Srinidhi Hostels | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default AdminDashboard;
