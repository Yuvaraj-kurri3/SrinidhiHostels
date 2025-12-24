import React, { useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import './AddStudent.css';

const initial = {
  studentName: '',
  roomNumber: '',
  sharing: '1-sharing',
  secondaryName: '',
  collegeName: '',
  courseYear: '',
  mobile: ''
};

export default function AddStudent({ onAdd }) {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });
    
    // Validate required fields
    if (!form.studentName || !form.roomNumber || !form.mobile) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      setSubmitting(false);
      return;
    }

    // simple mock delay to simulate submit
    setTimeout(() => {
      setSubmitting(false);
      if (onAdd) onAdd(form);
      setMessage({ type: 'success', text: 'Student added successfully!' });
      setForm(initial);
      // Clear success message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 600);
  };

  return (
    <>
    <br />
    <form onSubmit={handleSubmit} className="add-student-container">
      <h3 className="add-student-title">Add New Student</h3>

      {message.text && (
        <div className={message.type === 'success' ? 'form-success-message' : 'form-error-message'}>
          {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}

      <div className="form-grid">
        <label className="form-group">
          <span className="form-label">Student Name *</span>
          <input 
            type="text"
            name="studentName" 
            value={form.studentName} 
            onChange={handleChange}
            className="form-input"
            placeholder="Full name" 
            required 
          />
        </label>

        <label className="form-group">
          <span className="form-label">Room Number *</span>
          <input 
            type="text"
            name="roomNumber" 
            value={form.roomNumber} 
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. B-204" 
            required 
          />
        </label>

        <label className="form-group">
          <span className="form-label">Type of Sharing</span>
          <select 
            name="sharing" 
            value={form.sharing} 
            onChange={handleChange}
            className="form-select"
          >
            <option>1-sharing</option>
            <option>2-sharing</option>
            <option>3-sharing</option>
            <option>4-sharing</option>
            <option>5-sharing</option>
          </select>
        </label>

        <label className="form-group">
          <span className="form-label">Secondary Name</span>
          <input 
            type="text"
            name="secondaryName" 
            value={form.secondaryName} 
            onChange={handleChange}
            className="form-input"
            placeholder="Optional second contact" 
          />
        </label>

        <label className="form-group">
          <span className="form-label">College Name</span>
          <input 
            type="text"
            name="collegeName" 
            value={form.collegeName} 
            onChange={handleChange}
            className="form-input"
            placeholder="College / Institute" 
          />
        </label>

        <label className="form-group">
          <span className="form-label">Course & Year</span>
          <input 
            type="text"
            name="courseYear" 
            value={form.courseYear} 
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. B.Tech CS - 3rd Year" 
          />
        </label>

        <label className="form-group full-width">
          <span className="form-label">Mobile Number *</span>
          <input 
            type="tel"
            name="mobile" 
            value={form.mobile} 
            onChange={handleChange}
            className="form-input"
            placeholder="+91 98765 43210" 
            required 
          />
        </label>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          disabled={submitting}
          className={`btn btn-primary ${submitting ? 'loading' : ''}`}
        >
          {submitting ? 'Adding...' : 'Add Student'} 
          {!submitting && <ArrowRight size={16} />}
        </button>
      </div>
    </form>
    
    </>
  );
}
