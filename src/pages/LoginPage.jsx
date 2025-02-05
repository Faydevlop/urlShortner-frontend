import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux'; // Assuming you're dispatching an action
import { loginAuth } from '../redux/feature/userAuthSlice'; // Replace with your actual action
import { clearError } from '../redux/feature/userAuthSlice';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  // State for form data and validation errors
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const {user,error,loading,data} = useSelector((state)=>state.auth)



  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  useEffect(() => {
   
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Validate form data
  const validate = () => {
    const newErrors = { email: '', password: '' };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return !newErrors.email && !newErrors.password;
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validate()) {
      try {
        // Dispatch the form data if validation is successful
      const result = await dispatch(loginAuth(formData)).unwrap()
      console.log('Registration successful:', result);
      navigate('/home');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
     
      <div className="flex h-screen flex-col items-center justify-center bg-[#1a1b1e] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Welcome to URL Shortener</h1>
            <p className="mt-2 text-lg text-gray-400">Shorten your links and share them with the world.</p>
          </div>
          {error && <div className="error-message text-center text-red-500 ">{error}</div>}
          <div className="rounded-lg bg-[#2c2d31] p-8 shadow-lg">
          
         
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="h-10 border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-md border-gray-600 bg-[#2c2d31] text-white focus:border-[#00c853] focus:ring-[#00c853] mb-2"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  type="email"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="h-10 border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-md border-gray-600 bg-[#2c2d31] text-white focus:border-[#00c853] focus:ring-[#00c853] mb-2"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  type="password"
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>
              <button
                className="items-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 inline-flex w-full justify-center rounded-md bg-[#2ecc71] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#00a44b] focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:ring-offset-2"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
