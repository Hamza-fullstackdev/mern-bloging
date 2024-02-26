import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleRequest = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/user/google", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data._id) {
        dispatch(loginSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        className='w-full'
        gradientDuoTone={"pinkToOrange"}
        type='button'
        onClick={handleGoogleRequest}
      >
        <AiFillGoogleCircle className='w-5 h-5 mr-1' />
        Continue with Google
      </Button>
    </div>
  );
};

export default Oauth;
