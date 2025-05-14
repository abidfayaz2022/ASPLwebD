"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const NRITaxReturn = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 8;
    const [formData, setFormData] = useState({
        // Step 1: Residency Status
        residency_status: '',

        // Step 2: Personal Information
        name: '',
        email: '',
        phone: '',
        country_code: '+65',

        // Step 3: Address
        street_address: '',
        street_address_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',

        // Step 4: Identification
        aadhaar_status: '',
        aadhaar_number: '',
        pan_status: '',
        pan_number: '',
        passport_number: '',
        foreign_residence_id: '',

        // Step 5: Stay Duration
        days_in_india: '',
        days_in_india_4_years: '',

        // Step 6: Income Sources
        income_sources: [],

        // Step 7: Deductions
        deductions: [],

        // Step 8: Declaration
        declaration_accuracy: false,
        declaration_authorization: false,
        declaration_date: new Date().toISOString().split('T')[0],
        declaration_place: '',
        signature: ''
    });

    const [summaryData, setSummaryData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const estimatedTime = {
        1: "1 minute",
        2: "3 minutes",
        3: "2 minutes",
        4: "3 minutes",
        5: "2 minutes",
        6: "3 minutes",
        7: "3 minutes",
        8: "2 minutes"
    };

    // Load saved progress when component mounts
    useEffect(() => {
        const savedData = localStorage.getItem('nriTaxReturnData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setFormData(parsedData.formData);
                setCurrentStep(parsedData.currentStep);
                setSaveMessage('Saved progress loaded successfully');
                setTimeout(() => setSaveMessage(''), 3000);
            } catch (error) {
                console.error('Error loading saved progress:', error);
            }
        }
    }, []);

    const validateStep = () => {
        setError(null); // Clear previous errors
        const {
            residency_status, name, email, phone, country_code, // Step 1 & 2
            street_address, city, state, postal_code, country, // Step 3
            passport_number, foreign_residence_id, aadhaar_status, aadhaar_number, pan_status, pan_number, // Step 4
            days_in_india, days_in_india_4_years, // Step 5
            // income_sources, // Step 6 - complex validation, skip for now or add later
            // deductions, // Step 7 - complex validation, skip for now or add later
            declaration_accuracy, declaration_authorization, declaration_date, declaration_place, signature // Step 8
        } = formData;

        switch (currentStep) {
            case 1:
                if (!residency_status) {
                    setError('Please select your residency status.');
                    return false;
                }
                break;
            case 2:
                if (!name || !email || !phone || !country_code) {
                    setError('Please fill in all personal information fields.');
                    return false;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                    setError('Please enter a valid email address.');
                    return false;
                }
                break;
            case 3:
                if (!street_address || !city || !state || !postal_code || !country) {
                    setError('Please fill in all address information fields.');
                    return false;
                }
                break;
            case 4:
                if (!passport_number || !foreign_residence_id) {
                    setError('Please provide passport number and foreign residence ID.');
                    return false;
                }
                if (!aadhaar_status) {
                    setError('Please select your Aadhaar status.');
                    return false;
                }
                if (aadhaar_status === 'have_aadhaar' && !aadhaar_number) {
                    setError('Please enter your Aadhaar number.');
                    return false;
                }
                if (!pan_status) {
                    setError('Please select your PAN status.');
                    return false;
                }
                if (pan_status === 'have_pan' && !pan_number) {
                    setError('Please enter your PAN number.');
                    return false;
                }
                break;
            case 5:
                if (days_in_india === '' || days_in_india_4_years === '') { // Check for empty string as type number can allow it
                    setError('Please fill in both stay duration fields.');
                    return false;
                }
                if (isNaN(parseInt(days_in_india, 10)) || isNaN(parseInt(days_in_india_4_years, 10))) {
                    setError('Stay duration must be a number.');
                    return false;
                }
                if (parseInt(days_in_india, 10) < 0 || parseInt(days_in_india_4_years, 10) < 0) {
                    setError('Stay duration cannot be negative.');
                    return false;
                }
                break;
            // Step 6 (Income Sources) and Step 7 (Deductions) validation can be added here if needed.
            // For now, allowing to proceed without selecting any.
            case 8: // This case is for the final submit, HTML5 validation will also apply
                if (!declaration_accuracy || !declaration_authorization) {
                    setError('Please check both declaration boxes.');
                    return false;
                }
                if (!declaration_date || !declaration_place || !signature) {
                    setError('Please fill in all declaration fields (date, place, signature).');
                    return false;
                }
                break;
            default:
                return true;
        }
        return true;
    };

    const saveProgress = () => {
        try {
            const dataToSave = {
                formData,
                currentStep,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem('nriTaxReturnData', JSON.stringify(dataToSave));
            setSaveMessage('Progress saved successfully');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            setError('Failed to save progress. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleIncomeSourceChange = (index, field, value) => {
        const updatedSources = [...formData.income_sources];
        updatedSources[index] = {
            ...updatedSources[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            income_sources: updatedSources
        }));
    };

    const handleDeductionChange = (index, field, value) => {
        const updatedDeductions = [...formData.deductions];
        updatedDeductions[index] = {
            ...updatedDeductions[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            deductions: updatedDeductions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep < totalSteps) {
            if (!validateStep()) {
                return; // Stop if validation fails for current step before proceeding
            }
            setCurrentStep(prev => prev + 1);
            setIsSubmitting(false); // Not actually submitting yet, just moving to next step
            return; 
        }

        // Final submission validation (Step 8 specifically, or any other final checks)
        if (!validateStep()) {
            setIsSubmitting(false); // Ensure button is re-enabled if final validation fails
            return;
        }
        
        setIsSubmitting(true);
        setError(null);

        try {
            // Final submission - only send email
            const submissionData = {
                ...formData,
                submittedAt: new Date().toISOString(),
                formType: 'NRITaxReturn' // Added formType for email formatting
            };

            // console.log('Preparing to send email with data:', submissionData);

            // Send email with form data
            try {
                const emailResponse = await fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData)
                });

                if (!emailResponse.ok) {
                    const errorData = await emailResponse.json();
                    // Throw an error to be caught by the outer catch block
                    throw new Error(errorData.message || 'Failed to send email');
                } else {
                    console.log('Email sent successfully');
                }
            } catch (emailError) {
                // Re-throw the error to be caught by the outer catch block, ensuring UI updates
                throw emailError;
            }

            // Clear saved progress after successful email submission
            localStorage.removeItem('nriTaxReturnData');

            // Show success message and redirect
            setIsSuccess(true);
        } catch (err) {
            setError(err.message || 'Submission failed. Please try again.');
            console.error('Submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const clearProgress = () => {
        try {
            localStorage.removeItem('nriTaxReturnData');
            // Reset form data to initial state
            setFormData({
                residency_status: '',
                name: '',
                email: '',
                phone: '',
                country_code: '+65',
                street_address: '',
                street_address_2: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                aadhaar_status: '',
                aadhaar_number: '',
                pan_status: '',
                pan_number: '',
                passport_number: '',
                foreign_residence_id: '',
                days_in_india: '',
                days_in_india_4_years: '',
                income_sources: [],
                deductions: [],
                declaration_accuracy: false,
                declaration_authorization: false,
                declaration_date: new Date().toISOString().split('T')[0],
                declaration_place: '',
                signature: ''
            });
            setCurrentStep(1);
            setError('Progress cleared successfully');
            setTimeout(() => setError(null), 3000);
        } catch (error) {
            setError('Failed to clear progress. Please try again.');
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Residency Status</h4>
                        <div className="form-group">
                            <label className="form-label">Select your residency status</label>
                            <div className="form-check mb-3">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="residency_status"
                                    value="nri"
                                    checked={formData.residency_status === 'nri'}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label">Non-Resident Indian (NRI)</label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="residency_status"
                                    value="rnor"
                                    checked={formData.residency_status === 'rnor'}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label">Resident but Not Ordinarily Resident (RNOR)</label>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Personal Information</h4>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Country Code</label>
                                <select
                                    className="form-select"
                                    name="country_code"
                                    value={formData.country_code}
                                    onChange={handleInputChange}
                                >
                                    <option value="+65">+65 (SG)</option>
                                    <option value="+1">+1 (US/CA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+61">+61 (AU)</option>
                                    <option value="+971">+971 (UAE)</option>
                                </select>
                            </div>
                            <div className="col-md-8">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Address Information</h4>
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label">Street Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="street_address"
                                    value={formData.street_address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Street Address 2 (Optional)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="street_address_2"
                                    value={formData.street_address_2}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">State/Province</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Postal Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Country</label>
                                <select
                                    className="form-select"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Country</option>
                                    <option value="SG">Singapore</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                    <option value="CA">Canada</option>
                                    <option value="AE">United Arab Emirates</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Identification Documents</h4>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Passport Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="passport_number"
                                    value={formData.passport_number}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Foreign Residence ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="foreign_residence_id"
                                    value={formData.foreign_residence_id}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Do you have an Aadhaar number?</label>
                                <select
                                    className="form-select"
                                    name="aadhaar_status"
                                    value={formData.aadhaar_status}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select</option>
                                    <option value="have_aadhaar">Yes</option>
                                    <option value="no_aadhaar">No</option>
                                </select>
                            </div>
                            {formData.aadhaar_status === 'have_aadhaar' && (
                                <div className="col-md-6">
                                    <label className="form-label">Aadhaar Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="aadhaar_number"
                                        value={formData.aadhaar_number}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}
                            <div className="col-md-6">
                                <label className="form-label">Do you have a PAN number?</label>
                                <select
                                    className="form-select"
                                    name="pan_status"
                                    value={formData.pan_status}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select</option>
                                    <option value="have_pan">Yes</option>
                                    <option value="no_pan">No</option>
                                </select>
                            </div>
                            {formData.pan_status === 'have_pan' && (
                                <div className="col-md-6">
                                    <label className="form-label">PAN Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="pan_number"
                                        value={formData.pan_number}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Stay Duration in India</h4>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Days in India (Current Year)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="days_in_india"
                                    value={formData.days_in_india}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="365"
                                    required
                                />
                                <small className="text-muted">From 1 April 2024 to 31 March 2025</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Days in India (Last 4 Years)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="days_in_india_4_years"
                                    value={formData.days_in_india_4_years}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="1460"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Income Sources</h4>
                        <div className="row g-3">
                            {[
                                'Salary', 'Rental', 'Share Trading', 'Interest',
                                'Dividend', 'Royalty', 'Profit from business',
                                'Professional Fees', 'Sale of Property',
                                'Sale of Bonds/Mutual Funds', 'Others'
                            ].map((source, index) => (
                                <div key={source} className="col-md-6">
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`source-${index}`}
                                            checked={formData.income_sources[index]?.enabled || false}
                                            onChange={(e) => handleIncomeSourceChange(index, 'enabled', e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor={`source-${index}`}>
                                            {source}
                                        </label>
                                    </div>
                                    {formData.income_sources[index]?.enabled && (
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Amount"
                                                value={formData.income_sources[index]?.amount || ''}
                                                onChange={(e) => handleIncomeSourceChange(index, 'amount', e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 7:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Deductions</h4>
                        <div className="row g-3">
                            {[
                                'Life Insurance Premium', 'Health Insurance', 'PPF',
                                'Interest on housing loan', 'Interest on education loan',
                                'Tax saving investments', 'Donations', 'Others'
                            ].map((deduction, index) => (
                                <div key={deduction} className="col-md-6">
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`deduction-${index}`}
                                            checked={formData.deductions[index]?.enabled || false}
                                            onChange={(e) => handleDeductionChange(index, 'enabled', e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor={`deduction-${index}`}>
                                            {deduction}
                                        </label>
                                    </div>
                                    {formData.deductions[index]?.enabled && (
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Amount"
                                                value={formData.deductions[index]?.amount || ''}
                                                onChange={(e) => handleDeductionChange(index, 'amount', e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 8:
                return (
                    <div className="step-content">
                        <h4 className="mb-4">Declaration</h4>
                        <div className="row g-3">
                            <div className="col-12">
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="declaration_accuracy"
                                        checked={formData.declaration_accuracy}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label className="form-check-label">
                                        I hereby declare that the details provided in this form are true and I will be solely responsible for any incorrect details provided.
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="declaration_authorization"
                                        checked={formData.declaration_authorization}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label className="form-check-label">
                                        I hereby authorize Angel Services Pte. Ltd. to use the information provided herein solely for the purpose of filing income tax return in India.
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Declaration Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="declaration_date"
                                    value={formData.declaration_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Declaration Place</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="declaration_place"
                                    value={formData.declaration_place}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Digital Signature</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="signature"
                                    value={formData.signature}
                                    onChange={handleInputChange}
                                    placeholder="Type your full name as signature"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="container mt-4">
            {isSuccess ? (
                <div className="card shadow-sm">
                    <div className="card-body text-center p-5">
                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                        <h3 className="mt-3">Form Submitted Successfully!</h3>
                        <p className="text-muted">Thank you for submitting your NRI tax return form. We will process your information and get back to you soon.</p>
                        <button 
                            type="button"
                            className="btn btn-primary mt-3"
                            onClick={() => router.push('/')}
                        >
                            Go to Homepage
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row justify-content-center g-4">
                    <div className="col-md-6">
                        {/* Step Progress Bar */}
                        <div className="tax-return-header p-3 mb-4 rounded">
                            <div className="progress" style={{ height: '4px' }}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                    aria-valuenow={(currentStep / totalSteps) * 100}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <div className="text-white">Step {currentStep} of {totalSteps}</div>
                                <div className="text-white small">Est. {estimatedTime[currentStep]}</div>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body p-4">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                {saveMessage && (
                                    <div className="alert alert-success" role="alert">
                                        {saveMessage}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                    {renderStepContent()}

                                    {/* Navigation Buttons */}
                                    <div className="d-flex justify-content-between mt-4">
                                        <div className="d-flex gap-2">
                                            {currentStep !== 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={handleBack}
                                                >
                                                    <i className="bi bi-arrow-left"></i> Previous
                                                </button>
                                            )}
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                                onClick={saveProgress}
                                            >
                                                <i className="bi bi-save"></i> Save Progress
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isSubmitting}
                                            >
                                                {currentStep === totalSteps ? 'Submit Form' : 'Next'}
                                                {currentStep !== totalSteps && <i className="bi bi-arrow-right ms-2"></i>}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {/* Exit and Clear Progress Buttons */}
                                <div className="d-flex gap-2 mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => router.push('/')}
                                    >
                                        <i className="bi bi-x-circle"></i> Exit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-warning"
                                        onClick={clearProgress}
                                    >
                                        <i className="bi bi-trash"></i> Clear Progress
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section (Right Side) */}
                    <div className="col-md-5">
                        <div className="card shadow-sm sticky-top" style={{ top: '1rem' }}>
                            <div className="card-body">
                                <h5 className="card-title mb-4">Form Progress</h5>
                                <div className="progress-steps">
                                    {[
                                        { step: 1, title: 'Residency Status', field: 'residency_status' },
                                        { step: 2, title: 'Personal Information', fields: ['name', 'email', 'phone'] },
                                        { step: 3, title: 'Address', fields: ['street_address', 'city', 'country'] },
                                        { step: 4, title: 'Identification', fields: ['passport_number', 'foreign_residence_id'] },
                                        { step: 5, title: 'Stay Duration', fields: ['days_in_india', 'days_in_india_4_years'] },
                                        { step: 6, title: 'Income Sources', field: 'income_sources' },
                                        { step: 7, title: 'Deductions', field: 'deductions' },
                                        { step: 8, title: 'Declaration', fields: ['declaration_accuracy', 'declaration_authorization'] }
                                    ].map(({ step, title, fields, field }) => (
                                        <div
                                            key={step}
                                            className={`progress-step ${currentStep >= step ? 'completed' : ''} ${currentStep === step ? 'current' : ''}`}
                                        >
                                            <div className="step-number">{step}</div>
                                            <div className="step-content">
                                                <h6 className="mb-1">{title}</h6>
                                                {currentStep > step && (
                                                    <div className="step-details small text-muted">
                                                        {field ? (
                                                            formData[field] ? 'Completed' : 'Not completed'
                                                        ) : (
                                                            fields.every(f => formData[f]) ? 'Completed' : 'Not completed'
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .tax-return-header {
                    background: linear-gradient(135deg, var(--primary-color), rgba(252,185,0,0.8));
                }

                .progress-bar {
                    background-color: white;
                }

                .progress-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .progress-step {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                }

                .progress-step.completed {
                    background-color: rgba(40, 167, 69, 0.1);
                }

                .progress-step.current {
                    background-color: rgba(0, 123, 255, 0.1);
                }

                .step-number {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background-color: #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                .progress-step.completed .step-number {
                    background-color: #28a745;
                    color: white;
                }

                .progress-step.current .step-number {
                    background-color: #007bff;
                    color: white;
                }

                .step-content {
                    flex: 1;
                }

                .step-details {
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .sticky-top {
                        position: relative !important;
                        top: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default NRITaxReturn;