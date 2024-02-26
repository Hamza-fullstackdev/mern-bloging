import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

const Oauth = () => {
  return (
    <div>
      <Button className='w-full' gradientDuoTone={"pinkToOrange"} type='button'>
        <AiFillGoogleCircle className="w-5 h-5 mr-1" />
        Continue with Google
      </Button>
    </div>
  );
};

export default Oauth;
