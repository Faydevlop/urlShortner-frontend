import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/feature/userAuthSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispath = useDispatch()



  // Determine the button text and behavior based on the current URL
  let buttonText = '';
  let buttonAction = () => {};

  if (location.pathname === '/login') {
    buttonText = 'Signup';
    buttonAction = () => navigate('/signup');
  } else if (location.pathname === '/signup') {
    buttonText = 'Login';
    buttonAction = () => navigate('/login');
  } else if (location.pathname === '/home') {
    buttonText = 'Logout';
    buttonAction = () => {
      // Add your logout logic here
      console.log('Logged out');
      // persistor.purge()
    dispath(logout())
    navigate('/login')
      
      
    };
  }

  return (
    <div>
      <header className="bg-[#1a1b1e] py-4 px-6 flex items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[#2ecc71]"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
            <span className="text-white font-bold text-lg">URL Shortener</span>
          </div>
        </a>
        <button
          onClick={buttonAction}
          className="inline-flex items-center justify-center rounded-md bg-[#2ecc71] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </header>
    </div>
  );
};

export default Header;
