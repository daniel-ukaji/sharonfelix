import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/services/AuthContext'; // Import the useAuth hook


export default function CreateJob() {
    const { user } = useAuth(); // Get the user from the AuthContext
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('')
    const [jobType, setJobType] = useState('')
    const router = useRouter();

    console.log(user?.token)
  
    const handleCreateJob = async () => {
        try {
          setIsLoading(true);
          
          // Define the job data to be sent to the API
          const jobData = {
            title,
            description,
            salary,
            company,
            location,
            jobType,
          };

          

        //   console.log(user.token)

      
          // Send a POST request to create the job
          const response = await fetch('https://sharon-felix-backend-app.onrender.com/api/job', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.token}`, // Add "Bearer" prefix to the token
                    'Content-Type': 'application/json', // Include other headers as needed
                },
                body: JSON.stringify(jobData),
            });

      
          if (response.ok) {
            const data = await response.json();
            setIsLoading(false);
            // Redirect to the job details page for the newly created job
            router.push(`/job/${data.data._id}`);
          } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Job creation failed');
          }
        } catch (error) {
          setIsLoading(false);
          console.error('Error creating job:', error); // Log the error message and details
        //   toast.error(error.message || 'Job creation failed');
        }
      };
      


  return (
    <div className='relative'>
      <Header />
      <div className="flex flex-col justify-center items-center space-y-6 mt-14 max-w-md mx-auto">
        
      <div className="flex flex-col justify-center items-center space-y-6">
      <h1 className='font-extrabold text-2xl'>Create A Job</h1>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Job title"
          />
          <Textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Job description"
          />
          <div className="flex flex-col xl:flex-row space-y-6 xl:space-y-0 space-x-0 xl:space-x-4 items-center justify-between">
            <input
              type="text"
              name="salary"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[13.375rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="salary"
            />
            <input
              type="text"
              name="company"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[13.375rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="Name of the Company"
            />
          </div>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Location"
          />
          <input
            type="text"
            name="jobType"
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Remote"
          />
        <Button
            className="w-full"
            disabled={isLoading}
            onClick={handleCreateJob} // Call the create job function on button click
          >
            {isLoading ? "Creating..." : "Create Job"}
          </Button>
          

          

          
        </div>
      
          {/* <h1 className='font-extrabold text-2xl'>Register</h1>
            
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="touch-auto rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="Email address"
            />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="touch-auto	rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="Enter password"
            />
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogInIcon className='h-4 w-4 mr-2' />}Login</Button> */}
            
            

          </div>

    </div>
    
  );
}