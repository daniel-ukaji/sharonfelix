// import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useEffect, useState } from 'react';
// import { getUserToken, logout } from '@/services/auth'
import { useAuth } from '@/services/AuthContext';
import { Button } from '@/components/ui/button'
import Banner from '@/components/Banner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MdHomeRepairService } from 'react-icons/md'
import { GrBusinessService } from 'react-icons/gr'
import BannerSecond from '@/components/BannerSecond';
import Footer from '@/components/Footer';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user, logout, getUserDetails } = useAuth();
  const [userData, setUserData] = useState(null);

  

  console.log(user)
  // console.log(user.firstName)


  // useEffect(() => {
  //   const userToken = getUserToken();
  //   console.log(userToken)
  // }, [])

  // useEffect(() => {
  //   // Fetch user details when the component mounts
  //   if (user) {
  //     getUserDetails()
  //       .then(data => {
  //         setUserData(data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user details:', error);
  //       });
  //   }
  // }, [user, getUserDetails]);

  return (
    <main>
      <Header />
      {/* <div>
      {user ? (
        <div>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <p></p>
      )}
    </div> */}
    <Banner />
    <div className='mt-10 max-w-5xl mx-auto mb-10'>
      <div className='flex justify-center mb-10'>
        <h1 className='font-bold text-3xl'>Our Services</h1>
      </div>
      <div className='flex space-x-7'>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle><MdHomeRepairService className='w-14 h-14' /></CardTitle>
            <h1 className='font-bold text-xl'>Real Estate Properties</h1>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>

        <Card className="w-[300px]">
          <CardHeader>
          <CardTitle><GrBusinessService className='w-14 h-14' /></CardTitle>
          <h1 className='font-bold text-xl'>View Job Offers</h1>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>

        <Card className="w-[300px]">
          <CardHeader>
          <CardTitle><MdHomeRepairService className='w-14 h-14' /></CardTitle>
          <h1 className='font-bold text-xl'>View Job Offers</h1>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    </div>
    <BannerSecond />
    <Footer />
    </main>
  )
}
