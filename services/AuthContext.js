// authContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';


// Create a context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user; // Check if the user is logged in
  const router = useRouter();



  useEffect(() => {
    // Check if the user is already authenticated (e.g., token in localStorage)
    const token = localStorage.getItem('userToken');
    if (token) {
      // You can also make an API call to validate the token here
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Make an API request to authenticate the user
      const response = await fetch('https://sharon-felix-backend-app.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { userToken, firstName, lastName } = data.data;
        localStorage.setItem('userToken', userToken);
        setUser({ token: userToken, firstName, lastName }); // Include firstName and lastName in the user object
        return data;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  

  const getUserDetails = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      console.log(userToken)

      if (!userToken) {
        throw new Error('User token not found.');
      }

      const response = await fetch('https://sharon-felix-backend-app.onrender.com/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': userToken,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData)
        return userData;
      } else {
        throw new Error('Failed to fetch user details.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };

  const logout = () => {
    // Remove the token from localStorage and reset the user state
    localStorage.removeItem('userToken');
    setUser(null);
  
    // Redirect to the home page
    router.push('/');
  };

  const getJobs = async () => {
    try {
      const response = await fetch('https://sharon-felix-backend-app.onrender.com/api/job', {
        method: 'GET',
        headers: {
          // You can include any necessary headers, such as authorization, here if required
        },
      });

      if (response.ok) {
        const jobData = await response.json();
        return jobData.data; // Return the array of job data
      } else {
        throw new Error('Failed to fetch jobs.');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  };

  const getEstate = async () => {
    try {
      const response = await fetch('https://sharon-felix-backend-app.onrender.com/api/real-estate', {
        method: 'GET',
        headers: {
          // You can include any necessary headers, such as authorization, here if required
        },
      });

      if (response.ok) {
        const jobEstate = await response.json();
        return jobEstate.data; // Return the array of job data
      } else {
        throw new Error('Failed to fetch estate.');
      }
    } catch (error) {
      console.error('Error fetching estates:', error);
      throw error;
    }
  };

  

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, getUserDetails, getJobs, getEstate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
