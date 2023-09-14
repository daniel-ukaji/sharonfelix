// pages/job/[jobId].js

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function EstateDetails() {
    const router = useRouter();
    const { estateId } = router.query;
    const [job, setJob] = useState(null);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
  
    useEffect(() => {
      if (estateId) {
        // Fetch job details using jobId
        fetch(`https://sharon-felix-backend-app.onrender.com/api/real-estate/${estateId}`)
          .then((response) => response.json())
          .then((data) => {
            setJob(data.data);
          })
          .catch((error) => {
            console.error('Error fetching job details:', error);
          });
      }
    }, [estateId]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
      
        try {
          // Send a POST request to indicate interest in the property
          const response = await fetch(`https://sharon-felix-backend-app.onrender.com/api/real-estate/${estateId}/request`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            // Request successful, you can display a success message or redirect the user
            // You might also want to clear the form fields here.
            setFormData({
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
            });
            setSubmissionError(null);
      
            // Log the JSON response data
            const responseData = await response.json();
            console.log('API Response Data:', responseData);
          } else {
            // Request failed, display an error message
            const errorResponse = await response.json();
            setSubmissionError(errorResponse.message || 'Failed to submit interest.');
          }
      
          // Log the full response for debugging
          console.log('Full API Response:', response);
        } catch (error) {
          console.error('Error submitting interest:', error);
          setSubmissionError('An error occurred while submitting interest.');
        } finally {
          setIsSubmitting(false);
        }
      };
      
      
  
    if (!job) {
      return <p>Loading Estate details...</p>;
    }

    const formatter = new Intl.NumberFormat("en-US", {
      currency: "USD",
    });

  return (
    <div>
      <Header />
      <div className="mt-4 p-5">
        <div className='flex flex-col justify-center items-center mb-10'>
          <h1 className='text-5xl'>{job.title}</h1>
        </div>

        <div className='max-w-6xl mx-auto'>
          {/* Map through the images array and create Image components */}
          <div className="grid grid-cols-2">
  {job.images.map((image, index) => (
    <div key={index} className="">
      <Image src={image} width={300} height={300} objectFit='cover' alt={`Image ${index}`} />
    </div>
  ))}
</div>

          <h1 className='font-bold'>Property Title: {job?.title}</h1>
          <p>Job Description: {job?.description}</p>
          <p>Price: ₦{formatter.format(job?.price)}</p>
          <p>Location: {job?.location}</p>
          <p>Job Type: {job?.realEstateType}</p>
          
        </div>

        <div className='max-w-6xl mx-auto'>
          <Link target='_blank' href="https://form.jotform.com/232566465074562" className={buttonVariants({
                className: 'mt-4 mb-6'
              })}>Indicate Interest</Link>
        </div>
        {/* Property interest form */}
        <form onSubmit={handleSubmit} className='max-w-6xl mx-auto hidden'>
          <h2 className="text-2xl font-semibold mt-4">Indicate Interest</h2>
          {submissionError && <p className="text-red-500">{submissionError}</p>}
          <div className="flex flex-col space-y-5 mt-5">
            <div>
              {/* <label htmlFor="firstName">First Name</label> */}
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder='First Name'
                className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
                />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder='Last Name'
                className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"

              />
            </div>
            <div>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
                placeholder='Phone Number'
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
                placeholder='Email'
              />
            </div>
          </div>
          <Button type="submit" className="mt-5" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EstateDetails;
