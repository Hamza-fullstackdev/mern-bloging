import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Alert } from "flowbite-react";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate= useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/api/user/signup", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.statusCode === 400) {
      setShowError(true);
      setError(data.message);
    }
    if(data.statusCode === 201) {
      navigate('/');
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='p-4 flex mx-auto max-w-4xl flex-col md:flex-row gap-4 md:item-center'>
        <div className='flex-1 my-auto'>
          <Link to={"/"} className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white rounded'>
              Bloging
            </span>
            Application
          </Link>
          <p className='text-sm mt-3'>
            This is the Mern stack bloging application. In which you can find
            all of your blog posts and their associated information. This
            website also have a Dashboard that only admin have permisions to
            access.
          </p>
        </div>
        <div className='sm:mt-0 flex-1'>
          {showError && (
             <Alert color="failure" onDismiss={() => setShowError(!showError)}>
             <span className="font-medium">Error!</span> {error}
           </Alert>
          )}
          <h2 className='text-xl font-semibold md:text-center'>
            Register Your Account
          </h2>
          <form className='flex flex-col gap-2 mt-2' onSubmit={handleFormData}>
            <div>
              <Label value='Your Username' />
              <TextInput
                type='text'
                placeholder='Username'
                className='w-full'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput
                type='email'
                placeholder='Email'
                className='w-full'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                type='text'
                placeholder='Password'
                className='w-full'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone={"purpleToBlue"} type='submit'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
