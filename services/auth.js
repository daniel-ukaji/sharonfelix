// auth.js

import Cookies from 'universal-cookie';

export const login = async (email, password) => {
  const response = await fetch('https://sharon-felix-backend-app.onrender.com/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    const cookies = new Cookies();
    const userToken = data.userToken;
    const storedResponses = getStoredResponses() || [];
    storedResponses.push(data);
    setStoredResponses(storedResponses); // Update stored responses
    cookies.set('storedResponses', storedResponses, { path: '/' });
    cookies.set('userToken', userToken, { path: '/' });
    return data;
  } else {
    // throw new Error('Login failed');
    const errorMessage = await response.text();
    console.error(`Login failed with status ${response.status}. Error: ${errorMessage}`);
    throw new Error(errorMessage);
    
  }
};

export const signup = async (firstName, lastName, email, password, phoneNumber, userType) => {
  const response = await fetch('https://content-platform-backend.onrender.com/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, userType }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorMessage = await response.text();
    console.error(`Login failed with status ${response.status}. Error: ${errorMessage}`);
    throw new Error(errorMessage);
  }

  
};

export const logout = () => {
  const cookies = new Cookies();
  cookies.remove('userToken', { path: '/' });
  cookies.remove('storedResponses', { path: '/' }); // Clear stored responses
};

export const getUserToken = () => {
    const cookies = new Cookies();
    const userToken = cookies.get('userToken');
    console.log('User Token:', userToken);
    return userToken;
  };
  

export const getStoredResponses = () => {
  const cookies = new Cookies();
  return cookies.get('storedResponses') || [];
};

export const setStoredResponses = (responses) => {
  const cookies = new Cookies();
  cookies.set('storedResponses', responses, { path: '/' });
};

export const updateDescription = async (description) => {
  const userToken = getUserToken();
  if (!userToken) {
    throw new Error('User not authenticated');
  }

  const response = await fetch('https://content-platform-backend.onrender.com/api/user/profile/description', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
    body: JSON.stringify(description),
  });

  if (response.ok) {
    const data = await response.json();
    // Update the stored response with the updated description
    const storedResponses = getStoredResponses();
    const updatedResponses = storedResponses.map((storedResponse) =>
      storedResponse.id === data.id ? { ...storedResponse, bio: data.bio, videoUrl: data.videoUrl } : storedResponse
    );
    setStoredResponses(updatedResponses);
    return data;
  } else {
    throw new Error('Failed to update description');
  }
};

export const getUserProfile = async () => {
  const userToken = getUserToken();
  if (!userToken) {
    throw new Error('User not authenticated');
  }

  const response = await fetch('https://content-platform-backend.onrender.com/api/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to fetch user profile');
  }
};

export const createPost = async (post) => {
  const userToken = getUserToken();
  if (!userToken) {
    throw new Error('User not authenticated');
  }

  const response = await fetch('https://content-platform-backend.onrender.com/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to create post');
  }
};