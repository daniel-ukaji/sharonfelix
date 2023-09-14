// pages/job/[jobId].js

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function JobDetails() {
  const router = useRouter();
  const { jobId } = router.query;
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (jobId) {
      // Fetch job details using jobId
      fetch(`https://sharon-felix-backend-app.onrender.com/api/job/${jobId}`)
        .then((response) => response.json())
        .then((data) => {
          setJob(data.data);
        })
        .catch((error) => {
          console.error('Error fetching job details:', error);
        });
    }
  }, [jobId]);

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mt-4 p-5 flex-grow">
        <div className='flex flex-col justify-center items-center mb-10'>
          <h1 className='text-xl'>{job.company} is hiring a</h1>
          <h1 className='text-5xl'>{job.title}</h1>
        </div>

        <div className='max-w-6xl mx-auto'>
          <h1 className='font-bold'>Job Title: {job.title}</h1>
          <p>Job Description: {job?.description}</p>
          <p>Salary: ₦{job?.salary}</p>
          <p>Company: {job?.company}</p>
          <p>Location: {job?.location}</p>
          <p>Job Type: {job?.jobType}</p>
         <Link target='_blank' href='https://form.jotform.com/232551581022548'>
            <Button className="mt-10">Apply Now</Button>
         </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default JobDetails;
