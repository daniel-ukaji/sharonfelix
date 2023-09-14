import React, { useEffect, useState } from 'react';
import { useAuth } from '@/services/AuthContext';
import Header from '@/components/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link from Next.js
import Footer from '@/components/Footer';

function JobList() {
  const { getJobs } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs when the component mounts
    getJobs()
      .then((jobData) => {
        setJobs(jobData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, [getJobs]);

  return (
    <main>
      <Header />
      <div className="mt-4 p-5">
        <div className='flex justify-center'>
            <h1 className='text-3xl font-extrabold mb-14'>Jobs List</h1>
        </div>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {jobs.map((job) => (
              <Card className="w-[300px]" key={job._id}>
                <CardHeader>
                  <CardTitle className="font-bold">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{job.location}</p>
                </CardContent>
                <CardFooter className="">
                  <p>₦{job.salary}</p>
                </CardFooter>
                {/* Use Link to navigate to the job details page */}
                <Link href={`/job/${job._id}`}>
                    <Button className="ml-6 mb-5">View</Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default JobList;
