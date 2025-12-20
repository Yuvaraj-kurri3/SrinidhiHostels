import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    const steps = [
        { number: '01', title: 'Register', desc: 'Create your account and setup your room and hostel details.' },
        { number: '02', title: 'Online Payment', desc: 'Pay your hostel fees online easily.' },
        { number: '03', title: 'Check mess', desc: 'Check your mess food online easily.' },
        { number: '04', title: 'Online Complaints', desc: 'Raise your complaints online easily.' },
        { number: '05', title: 'Payment Recipt', desc: 'Get your payment recipt online easily.' },
    ];

    return (
        <section id="how-it-works" className="section how-it-works-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">Get started in 5 simple steps.</p>
                </div>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <div className="step-number">{step.number}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
