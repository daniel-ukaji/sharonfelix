import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/services/AuthContext'; // Import the useAuth hook
import ImageUpload from './uploadImage';


export default function CreateEstate() {
  const { user } = useAuth(); // Get the user from the AuthContext
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState('');
  const [location, setLocation] = useState('');
  const [realEstateType, setRealEstateType] = useState('');
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(''); // State to store the image URL
  const [imageUrls, setImageUrls] = useState([]);


  console.log(user?.token);

  const handleImageUploaded = (imageUrl) => {
    setImageUrls([...imageUrls, imageUrl]);
  };

  const handleCreateJob = async () => {
    try {
      setIsLoading(true);

      // Define the job data to be sent to the API
      const jobData = {
        title,
        description,
        price,
        images: imageUrls, // Use the image URL here
        location,
        realEstateType,
      };

      // Send a POST request to create the job
      const response = await fetch('https://sharon-felix-backend-app.onrender.com/api/real-estate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        // Redirect to the job details page for the newly created job
        router.push(`/realestate/${data.data._id}`);
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Real Estate creation failed');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating job:', error);
    }
  };

  

      
      


  return (
    <div className='relative'>
      <Header />
      <div className="flex flex-col justify-center items-center space-y-6 mt-14 max-w-md mx-auto">
        
      <div className="flex flex-col justify-center items-center space-y-6">
      <h1 className='font-extrabold text-2xl'>Create A Property</h1>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Property Name"
          />
          <Textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Property description"
          />
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="Price"
            />

            {/* <input
              type="text"
              name="images"
              id="images"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[13.375rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="Images"
            /> */}
      <ImageUpload onImageUploaded={handleImageUploaded} />
      <ImageUpload onImageUploaded={handleImageUploaded} />
      <ImageUpload onImageUploaded={handleImageUploaded} />
      <ImageUpload onImageUploaded={handleImageUploaded} />
      <ImageUpload onImageUploaded={handleImageUploaded} />



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
            name="realEstateType"
            id="realEstateType"
            value={realEstateType}
            onChange={(e) => setRealEstateType(e.target.value)}
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