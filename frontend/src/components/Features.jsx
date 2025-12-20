import React from 'react';
import { Bed, CreditCard, Utensils, MessageSquareWarning, BarChart3, Bell } from 'lucide-react';
import './Features.css';

const Features = () => {
    const features = [
        { icon: <Bed size={24} />, title: 'Room Access', desc: 'You Can Access Your Room Details.' },
        { icon: <CreditCard size={24} />, title: 'Fee Management', desc: 'You Can Track Your Payment Recipts.' },
        { icon: <Utensils size={24} />, title: 'Mess Management', desc: 'You Can Track Your Mess Details.' },
        { icon: <MessageSquareWarning size={24} />, title: 'Complaints', desc: 'You Can Raise Your Complaints.' },
        { icon: <BarChart3 size={24} />, title: 'Reports', desc: 'You Can Track Your Payment Recipts.' },
        { icon: <Bell size={24} />, title: 'Notifications', desc: 'You Will Get Notifications For Fee Dues.' },
    ];

    return (
        <section id="features" className="section features-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Everything You Need</h2>
                    <p className="section-subtitle">Powerful features to manage your hostel efficiently.</p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
