import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from '@/services/AuthContext';
import { AiOutlineMenu } from 'react-icons/ai'; // Import the menu icon

function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-4 border">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="font-extrabold">SHARONFELIX</h1>
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu}>
            <AiOutlineMenu size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`lg:flex space-x-8 items-center ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <Link href="/">
            <p>Home</p>
          </Link>
          {/* <p>About</p> */}
          <Link href="/realestate">
            <p>Real Estate</p>
          </Link>
          <Link href="/jobs">
            <p>Jobs</p>
          </Link>
          {user && (
            <>
              <Link href="/createJob">
                <p>Create Jobs</p>
              </Link>
              <Link href="/createEstate">
                <p>Create Property</p>
              </Link>
            </>
          )}
          {user ? (
            <div>
              <Button onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
