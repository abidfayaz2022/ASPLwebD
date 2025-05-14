'use client';

import { useSearchParams } from 'next/navigation';
import JobApplicationForm from '../components/JobApplicationForm';

const ApplyPage = () => {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('job') || 'Position';

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Job Application</h1>
          <p className="lead text-muted">Please fill out the form below to apply for the position</p>
        </div>
        <JobApplicationForm jobTitle={jobTitle} />
      </div>
    </div>
  );
};

export default ApplyPage; 