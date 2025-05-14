import { useState } from 'react';

const JobApplicationForm = ({ jobTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };



  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     // Create FormData object to handle file upload
  //     const submitData = new FormData();
  //     submitData.append('fullName', formData.fullName);
  //     submitData.append('email', formData.email);
  //     submitData.append('phone', formData.phone);
  //     submitData.append('coverLetter', formData.coverLetter);
  //     submitData.append('jobTitle', jobTitle);

  //     // Append CV file if it exists
  //     if (formData.cv) {
  //       submitData.append('cv', formData.cv);
  //     }

  //     // Make API call to submit the application
  //     const response = await fetch('/api/careers/apply', {
  //       method: 'POST',
  //       body: submitData,
  //       // Don't set Content-Type header - browser will set it automatically with boundary for FormData
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit application. Please try again.');
  //     }

  //     const data = await response.json();

  //     // Handle successful submission
  //     setIsSubmitted(true);
  //     console.log('Application submitted successfully:', data);

  //   } catch (err) {
  //     // Handle submission errors
  //     setError(err.message || 'An error occurred while submitting your application. Please try again.');
  //     console.error('Error submitting application:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Show loading state
  // if (isLoading) {
  //   return (
  //     <div className="container py-5">
  //       <div className="row justify-content-center">
  //         <div className="col-md-8">
  //           <div className="card shadow-lg border-0 rounded-4">
  //             <div className="card-body p-5 text-center">
  //               <div className="spinner-border text-warning mb-4" role="status" style={{ width: '3rem', height: '3rem' }}>
  //                 <span className="visually-hidden">Loading...</span>
  //               </div>
  //               <h2 className="mb-3">Submitting Application...</h2>
  //               <p className="lead text-muted">Please wait while we process your application.</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // // Show success message
  // if (isSubmitted) {
  //   return (
  //     <div className="container py-5">
  //       <div className="row justify-content-center">
  //         <div className="col-md-8">
  //           <div className="card shadow-lg border-0 rounded-4">
  //             <div className="card-body p-5 text-center">
  //               <div className="mb-4">
  //                 <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
  //               </div>
  //               <h2 className="mb-3">Application Submitted!</h2>
  //               <p className="lead text-muted mb-4">
  //                 Thank you for applying for the {jobTitle} position. We will review your application and get back to you soon.
  //               </p>
  //               <a href="/career" className="btn btn-lg px-5 py-3 fw-semibold" style={{ backgroundColor: '#fcb900', color: '#000' }}>
  //                 Back to Careers
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // // Show error message if there's an error
  // if (error) {
  //   return (
  //     <div className="container py-5">
  //       <div className="row justify-content-center">
  //         <div className="col-md-8">
  //           <div className="card shadow-lg border-0 rounded-4">
  //             <div className="card-body p-5 text-center">
  //               <div className="mb-4">
  //                 <i className="bi bi-exclamation-circle-fill text-danger" style={{ fontSize: '4rem' }}></i>
  //               </div>
  //               <h2 className="mb-3">Submission Error</h2>
  //               <p className="lead text-muted mb-4">{error}</p>
  //               <button
  //                 onClick={() => setError(null)}
  //                 className="btn btn-lg px-5 py-3 fw-semibold"
  //                 style={{ backgroundColor: '#fcb900', color: '#000' }}
  //               >
  //                 Try Again
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (isSubmitted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                </div>
                <h2 className="mb-3">Application Submitted!</h2>
                <p className="lead text-muted mb-4">
                  Thank you for applying for the {jobTitle} position. We will review your application and get back to you soon.
                </p>
                <a href="/career" className="btn btn-lg px-5 py-3 fw-semibold" style={{ backgroundColor: '#fcb900', color: '#000' }}>
                  Back to Careers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Apply for {jobTitle}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cv" className="form-label fw-semibold">Upload CV (PDF/DOC)</label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    id="cv"
                    name="cv"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="coverLetter" className="form-label fw-semibold">Cover Letter</label>
                  <textarea
                    className="form-control form-control-lg"
                    id="coverLetter"
                    name="coverLetter"
                    rows="5"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-lg w-100 py-3 fw-semibold"
                  style={{ backgroundColor: '#fcb900', color: '#000' }}
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;