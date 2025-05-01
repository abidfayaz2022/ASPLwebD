"use client";
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'bootstrap';

const TaxCalculator = () => {
    const [formData, setFormData] = useState({
        age: '',
        salary: '',
        rental_income: '',
        interest_nre: '',
        interest_fcnr: '',
        agricultural_income: '',
        interest_govt: '',
        interest_infra: '',
        capital_gains_short: '',
        capital_gains_long: '',
        standard_deduction: '75000',
        nps_employer: '',
        housing_loan_letout: '',
        tds_tcs: '',
        advance_tax: ''
    });

    const [result, setResult] = useState(null);

    useEffect(() => {
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl);
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const calculatedResult = calculateTax(formData);
        setResult(calculatedResult);
    };

    const calculateTax = (data) => {
        const grossIncome = Object.entries(data).reduce((sum, [key, value]) => {
            if (key !== 'standard_deduction' && key !== 'nps_employer' && key !== 'housing_loan_letout') {
                return sum + (parseFloat(value) || 0);
            }
            return sum;
        }, 0);

        const deductions = parseFloat(data.standard_deduction) +
            (parseFloat(data.nps_employer) || 0) +
            (parseFloat(data.housing_loan_letout) || 0);

        const taxableIncome = Math.max(0, grossIncome - deductions);
        const totalTax = calculateSlabTax(taxableIncome);
        const surcharge = calculateSurcharge(grossIncome, totalTax);
        const cess = (totalTax + surcharge) * 0.04;
        const finalTax = totalTax + surcharge + cess;
        const totalTaxPaid = (parseFloat(data.tds_tcs) || 0) + (parseFloat(data.advance_tax) || 0);
        const taxDueOrRefund = finalTax - totalTaxPaid;

        return {
            gross_income: grossIncome,
            taxable_income: taxableIncome,
            total_tax: totalTax,
            surcharge: surcharge,
            cess: cess,
            final_tax: finalTax,
            total_tax_paid: totalTaxPaid,
            tax_due_or_refund: taxDueOrRefund,
            needs_itr: grossIncome > 300000 || totalTaxPaid > 0
        };
    };

    const calculateSlabTax = (income) => {
        if (income <= 300000) return 0;
        if (income <= 600000) return (income - 300000) * 0.05;
        if (income <= 900000) return 15000 + (income - 600000) * 0.10;
        if (income <= 1200000) return 45000 + (income - 900000) * 0.15;
        if (income <= 1500000) return 90000 + (income - 1200000) * 0.20;
        return 150000 + (income - 1500000) * 0.30;
    };

    const calculateSurcharge = (income, tax) => {
        if (income > 50000000) return tax * 0.25;
        if (income > 20000000) return tax * 0.15;
        if (income > 10000000) return tax * 0.10;
        if (income > 5000000) return tax * 0.10;
        return 0;
    };

    const renderInputField = (label, name, tooltip, isReadOnly = false) => (
        <div className="row align-items-center form-row-spacing">
            <div className="col-7 col-label">
                <label className="form-label">
                    {label}
                    <i className="bi bi-question-circle help-icon"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={tooltip}></i>
                </label>
            </div>
            <div className="col-5 col-input">
                <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input
                        type="number"
                        name={name}
                        className="form-control number-input"
                        step="0.01"
                        min="0"
                        value={formData[name]}
                        onChange={handleInputChange}
                        readOnly={isReadOnly}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <section className="calculator-header py-4 bg-dark text-light">
                <div className="container">
                    <h1 className="text-center">NRI Tax Calculator</h1>
                    <p className="lead text-center mb-0">Calculate your estimated tax liability for FY 2024-25 (AY 2025-26)</p>
                </div>
            </section>

            <section className="calculator-form py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="calculator-form">
                                        {/* Basic Information */}
                                        <div className="row align-items-center mb-4">
                                            <div className="col-md-4 col-label">
                                                <label className="form-label">Age (Optional)</label>
                                            </div>
                                            <div className="col-md-8 col-input">
                                                <input
                                                    type="number"
                                                    name="age"
                                                    className="form-control age-input"
                                                    min="0"
                                                    max="120"
                                                    value={formData.age}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Regular Income */}
                                        <h5 className="border-bottom pb-2 form-section-header">
                                            <i className="bi bi-cash-stack me-2"></i>Regular Income Sources
                                            <small className="text-muted d-block mt-1">Income earned from employment and property in India</small>
                                        </h5>

                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Salary Income",
                                                    "salary",
                                                    "Income earned from employment in India, including basic salary, allowances, and perquisites."
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Rental Income",
                                                    "rental_income",
                                                    "Income from renting out property in India"
                                                )}
                                            </div>
                                        </div>

                                        {/* Exempt Income */}
                                        <h5 className="border-bottom pb-2 form-section-header mt-4">
                                            <i className="bi bi-shield-check me-2"></i>Exempt Income Sources
                                            <small className="text-muted d-block mt-1">Income that is exempt from taxation in India</small>
                                        </h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "NRE Interest",
                                                    "interest_nre",
                                                    "Interest earned on Non-Resident External (NRE) accounts is exempt from tax in India."
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "FCNR Interest",
                                                    "interest_fcnr",
                                                    "Interest earned on Foreign Currency Non-Resident (FCNR) accounts is exempt from tax in India."
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Agricultural Income",
                                                    "agricultural_income",
                                                    "Income from agricultural activities in India is exempt from tax."
                                                )}
                                            </div>
                                        </div>

                                        {/* Special Rate Income */}
                                        <h5 className="border-bottom pb-2 form-section-header mt-4">
                                            <i className="bi bi-graph-up-arrow me-2"></i>Special Rate Income
                                            <small className="text-muted d-block mt-1">Income taxed at special rates under specific sections</small>
                                        </h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Interest (Govt)",
                                                    "interest_govt",
                                                    "Interest from Government securities, taxed at special rates"
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Infrastructure Int.",
                                                    "interest_infra",
                                                    "Interest from Infrastructure Debt Fund, taxed at 5%"
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "STCG (u/s 111A)",
                                                    "capital_gains_short",
                                                    "Short-Term Capital Gains from equity shares/mutual funds. Taxed at 15% if Securities Transaction Tax (STT) is paid."
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "LTCG (u/s 112A)",
                                                    "capital_gains_long",
                                                    "Long-Term Capital Gains from equity shares/mutual funds. Taxed at 10% on gains exceeding ₹1 lakh if STT is paid."
                                                )}
                                            </div>
                                        </div>

                                        {/* Deductions */}
                                        <h5 className="border-bottom pb-2 form-section-header mt-4">
                                            <i className="bi bi-scissors me-2"></i>Deductions
                                            <small className="text-muted d-block mt-1">Eligible deductions that reduce your taxable income</small>
                                        </h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Standard Deduction",
                                                    "standard_deduction",
                                                    "Flat deduction of ₹75,000 automatically applied to salaried individuals under the new tax regime.",
                                                    true
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "NPS (Employer)",
                                                    "nps_employer",
                                                    "Employer's contribution to National Pension System, deductible up to 10% of salary."
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Home Loan Int. (Let-Out)",
                                                    "housing_loan_letout",
                                                    "Interest on housing loan for let-out property, maximum deduction ₹2,00,000."
                                                )}
                                            </div>
                                        </div>

                                        {/* Tax Payments */}
                                        <h5 className="border-bottom pb-2 form-section-header mt-4">
                                            <i className="bi bi-receipt me-2"></i>Tax Payments
                                            <small className="text-muted d-block mt-1">Tax already paid or deducted during the financial year</small>
                                        </h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "TDS/TCS Deducted",
                                                    "tds_tcs",
                                                    "Tax Deducted at Source/Tax Collected at Source from your income during the year."
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                {renderInputField(
                                                    "Advance Tax Paid",
                                                    "advance_tax",
                                                    "Tax paid in advance during the financial year in quarterly installments."
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-primary btn-lg">
                                                <i className="bi bi-calculator me-2"></i>Calculate Tax
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Results Section */}
                            {result && (
                                <div className="card shadow mt-4">
                                    <div className="card-body">
                                        <h5 className="card-title border-bottom pb-2 mb-3">
                                            <i className="bi bi-file-earmark-text me-2"></i>Tax Calculation Summary
                                        </h5>
                                        <div className="table-responsive">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th style={{ width: '60%' }}>
                                                            <i className="bi bi-cash me-2"></i>Total Gross Income
                                                        </th>
                                                        <td>₹{result.gross_income.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <i className="bi bi-calculator me-2"></i>Final Taxable Income
                                                        </th>
                                                        <td>₹{result.taxable_income.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <i className="bi bi-percent me-2"></i>Tax Before Surcharge
                                                        </th>
                                                        <td>₹{result.total_tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <i className="bi bi-plus-circle me-2"></i>Surcharge
                                                        </th>
                                                        <td>₹{result.surcharge.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <i className="bi bi-plus me-2"></i>Health & Education Cess
                                                        </th>
                                                        <td>₹{result.cess.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    <tr className="table-primary">
                                                        <th>
                                                            <i className="bi bi-receipt-cutoff me-2"></i>Final Tax Liability
                                                        </th>
                                                        <td>₹{result.final_tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <i className="bi bi-credit-card me-2"></i>Total Tax Paid
                                                        </th>
                                                        <td>₹{result.total_tax_paid.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    {result.tax_due_or_refund > 0 ? (
                                                        <tr className="table-danger">
                                                            <th>
                                                                <i className="bi bi-exclamation-triangle me-2"></i>Tax Due (Payable)
                                                            </th>
                                                            <td>₹{result.tax_due_or_refund.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                    ) : (
                                                        <tr className="table-success">
                                                            <th>
                                                                <i className="bi bi-check-circle me-2"></i>Refund Due
                                                            </th>
                                                            <td>₹{Math.abs(result.tax_due_or_refund).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={`alert alert-${result.needs_itr ? 'info' : 'info'} mt-3 mb-0`}>
                                            <i className="bi bi-info-circle me-2"></i>
                                            {result.needs_itr
                                                ? 'You may need to file an Income Tax Return (ITR) as your income exceeds the basic exemption limit or tax has been deducted/paid.'
                                                : 'You may not need to file an ITR if income is below ₹3,00,000 and no tax is deducted/paid.'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .calculator-form label {
          font-size: 0.9rem;
          margin-bottom: 0;
          line-height: 1.2;
        }

        .calculator-form .help-icon {
          font-size: 0.8rem;
          vertical-align: text-top;
        }

        .form-section-header {
          margin-bottom: 1.25rem;
        }

        .form-row-spacing {
          margin-bottom: 0.7rem;
        }

        .age-input {
          max-width: 80px;
        }

        .number-input {
          max-width: 120px;
        }

        @media (min-width: 768px) {
          .calculator-form .col-label {
            width: 54%;
          }
          .calculator-form .col-input {
            width: 46%;
          }
        }

        @media (max-width: 767px) {
          .calculator-form .row {
            margin-bottom: 1rem;
          }
          .calculator-form .col-label {
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
        </>
    );
};

export default TaxCalculator; 