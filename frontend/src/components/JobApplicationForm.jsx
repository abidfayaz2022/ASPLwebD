import { useState } from 'react';

const JobApplicationForm = ({ jobTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null
  });
  const [agreedToDeclaration, setAgreedToDeclaration] = useState(false);
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

    if (!agreedToDeclaration) {
      alert("You must agree to the declaration before submitting.");
      return;
    }

    try {
      let resumeUrl = null;

      if (formData.cv) {
        const s3Res = await fetch('/api/s3-upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: formData.cv.name,
            fileType: formData.cv.type,
          }),
        });

        const { uploadUrl, fileUrl } = await s3Res.json();

        await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': formData.cv.type,
          },
          body: formData.cv,
        });

        resumeUrl = fileUrl;
      }

      const emailRes = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          coverLetter: formData.coverLetter,
          jobTitle,
          resumeUrl,
        }),
      });

      const result = await emailRes.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('Failed to send application.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

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

                {/* ✅ Declaration Block */}
                <div className="mb-4 p-3 bg-light border rounded">
                  <p className="fw-semibold mb-2">By submitting this application form and uploading your resume, you hereby declare and agree as follows:</p>
                  <ul className="small">
                    <li><strong>Accuracy of Information:</strong> I confirm that all information provided is true and complete. Misrepresentation may disqualify me or lead to termination.</li>
                    <li><strong>Consent to Use of Personal Data:</strong> I consent to Angel Services collecting, using, and disclosing my personal data for job consideration.</li>
                    <li><strong>Data Storage & Cross-Border Use:</strong> I understand my data may be stored in Singapore, India, UAE, and handled securely.</li>
                    <li><strong>Data Retention:</strong> My data may be retained unless I request deletion in writing.</li>
                    <li><strong>Withdrawal of Consent:</strong> I can withdraw consent by contacting <a href="mailto:info@theangelservices.com">info@theangelservices.com</a>.</li>
                  </ul>

                  <div className="form-check mt-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="declaration"
                      checked={agreedToDeclaration}
                      onChange={(e) => setAgreedToDeclaration(e.target.checked)}
                      required
                    />
                    <label htmlFor="declaration" className="form-check-label">
                      ✅ I have read and understood the above declaration and consent to the collection and use of my personal data as described.
                    </label>
                  </div>
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
