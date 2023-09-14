import React, { useState, useEffect } from 'react';

function JobDetails({ jobId }) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details when the component mounts
    async function fetchJobDetails() {
      try {
        const response = await fetch(`https://sharon-felix-backend-app.onrender.com/api/job/${jobId}`, {
          method: 'GET',
          headers: {
            // You can include any necessary headers, such as authorization, here if required
          },
        });

        if (response.ok) {
          const jobData = await response.json();
          setJob(jobData.data);
        } else {
          throw new Error('Failed to fetch job details.');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    }

    fetchJobDetails();
  }, [jobId]);

  return (
    <div>
      {job ? (
        <div>
          <h2>{job.title}</h2>
          <p>Description: {job.description}</p>
          <p>Salary: ₦{job.salary}</p>
          <p>Company: {job.company}</p>
          <p>Location: {job.location}</p>
          <p>Job Type: {job.jobType}</p>
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
}

export default JobDetails;
