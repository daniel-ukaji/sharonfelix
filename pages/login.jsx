import { useState, useEffect } from 'react';
// import { login, getStoredResponses } from '@/services/auth';
import { useRouter } from 'next/router';
import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, LogInIcon } from 'lucide-react';
import { useAuth } from '@/services/AuthContext';

import Link from 'next/link';

export default function LoginPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storedResponses, setStoredResponses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();


  
  const router = useRouter();

//   useEffect(() => {
//     const responses = getStoredResponses();
//     setStoredResponses(responses);
//   }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true before making the login request
    try {
      const response = await login(email, password);
      console.log('Login response:', response); // Log the response
      router.push('/');
    } catch (error) {
      // Set the error message from the API response
     
      console.error('Login failed', error);
      toast({
        title: 'There was a problem.',
        description: 'There was an error logging in to your Patreon Account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false); // Set isLoading back to false after the login attempt is complete
    }
  };
  
  

  return (
    <div className='relative'>
      <div className='absolute top-7 left-10'>
        <Link href="/">
          <Button variant="ghost" className="flex justify-center items-center border">
            <ChevronLeft className='w-4 h-4 mr-1' />
            <p>Home</p>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center space-y-6 h-screen max-w-md mx-auto">
        
      
          <h1 className='font-extrabold text-2xl'>Login</h1>
            
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
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogInIcon className='h-4 w-4 mr-2' />}Login</Button>
            
            

          </div>

    </div>
    
  );
}
