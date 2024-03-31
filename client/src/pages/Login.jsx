import React, { useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [showError, setShowError] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };
  const handleFormData = async (e) => {
    dispatch(loginStart());
    e.preventDefault();
    const res = await fetch("/api/user/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      setShowError(true);
      dispatch(loginFailure(data.message));
    }
    if (res.ok) {
      dispatch(loginSuccess(data));
      navigate("/");
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='mx-auto max-w-md p-4'>
        {showError && (
          <Alert color='failure' onDismiss={() => setShowError(!showError)}>
            <span className='font-medium'>Error!</span> {error}
          </Alert>
        )}
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
              id='email'
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
              id='password'
              onChange={handleChange}
            />
          </div>
          <Button
            disabled={loading}
            type='submit'
            gradientDuoTone={"greenToBlue"}
            className='mt-4 mb-2'
          >
            Submit
          </Button>
          <Oauth />
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
