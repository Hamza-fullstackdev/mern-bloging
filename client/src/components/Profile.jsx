import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Profile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const fileRef = useRef();
  const { currentuser } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    // setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload (File size must be less than 2mb)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          
        });
      }
    );
  };
  return (
    <div className='max-w-lg mx-auto w-full mt-10'>
      <form className='flex flex-col p-4'>
        <h2 className='text-2xl font-semibold text-center mb-4'>My Profile</h2>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center rounded-full shadow-md cursor-pointer overflow-hidden'
          onClick={() => fileRef.current.click()}
        >
          {
            imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                  }
                }}
              />
            )
          }
          <img
            src={imageFileUrl || currentuser.avatar}
            alt='user'
          className={`rounded-full w-full h-full border-4 border-gray-300 object-cover ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'}`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        <div className='mt-5'>
          <TextInput
            type='text'
            defaultValue={currentuser.username}
            icon={FaUser}
          />
        </div>
        <div className='mt-2'>
          <TextInput
            type='email'
            defaultValue={currentuser.email}
            icon={MdEmail}
          />
        </div>
        <div className='mt-2'>
          <TextInput type='password' placeholder='********' icon={IoMdLock} />
        </div>
        <div className='mt-3 flex justify-between'>
          <Link>
            <Button color='red'>Delete Account</Button>
          </Link>
          <Link>
            <Button color='yellow'>Sign Out</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Profile;
