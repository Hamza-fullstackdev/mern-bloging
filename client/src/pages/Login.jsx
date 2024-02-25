import React, { useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({});
  const [showError,setShowError] = useState(false);
  const [error,setError]= useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res= await fetch('http://127.0.0.1:5000/api/user/login',{
      credentials:'include',
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    const data= await res.json();
    setLoading(false);
    if(data.statusCode===400){
      setShowError(true);
      setError(data.message);
    }
    if(data._id){
      navigate('/')
    }
};
  return (
    <div className='min-h-screen mt-20'>
      <div className='mx-auto max-w-md p-4'>
        {
          showError &&  <Alert color="failure" onDismiss={() => setShowError(!showError)}>
          <span className="font-medium">Error!</span> {error}
        </Alert>
        }
        <h2 className='text-2xl font-semibold text-center mb-2'>
          Login to your account
        </h2>
        <form className='mt-3 flex flex-col' onSubmit={handleFormData}>
          <div className='mt-1'>
            <Label value={"Your Email"} />
            <TextInput
              type='email'
              placeholder='youremail@gmail.com'
              rightIcon={AiOutlineMail}
              className='w-100'
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className='mt-1'>
            <Label value={"Your Password"} />
            <TextInput
              type='password'
              placeholder='********'
              rightIcon={RiLockPasswordLine}
              className='w-100'
              id="password"
              onChange={handleChange}
            />
          </div>
          <Button
          disabled={loading}
            type='submit'
            gradientDuoTone={"purpleToBlue"}
            className='mt-4'
          >
            Submit
          </Button>
          <span className='text-sm mt-1'>
            Dont have a account?{" "}
            <Link className='text-green-500' to={"/signup"}>
              Signup now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
