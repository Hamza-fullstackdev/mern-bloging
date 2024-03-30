import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  signoutSuccess,
  signoutFailure
} from "../redux/user/userSlice";

const Profile = () => {
  const [imageFile, setImageFile] = useState(null); // use state for image files
  const [showError, setShowError] = useState(false); // use state to check when to show error
  const [showSuccess, setShowSuccess] = useState(false); // use state to check when to show success
  const [showSuccessMessage, setShowSuccessMessage] = useState(null); // use state to check when to show success Messsage
  const [imageFileUrl, setImageFileUrl] = useState(null); // use state to set new image url
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null); // use state to set new image upload progress
  const [imageFileUploadError, setImageFileUploadError] = useState(null); // use state to set new image upload error
  const [showDeleteModal, setShowDeleteModal] = useState(false); // use state to show delete modal
  const [formData, setFormData] = useState({}); //usestate to get form details
  const fileRef = useRef();
  const { currentuser, error } = useSelector((state) => state.user); // Getting data from redux user slice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Image Uploading Functionality Starts Here
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
          setFormData({
            ...formData,
            avatar: downloadURL,
          });
        });
      }
    );
  };
  // Image Uploading functionality ends here

  //  Update User Api Hits Here
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    const res = await fetch(`/api/user/update/${currentuser._id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data._id) {
      dispatch(updateSuccess(data));
      setShowSuccess(true);
      setShowSuccessMessage("Profile Updated Successfully!");
      console.log(data);
    }
    if (data.statusCode === 400) {
      setShowError(true);
      dispatch(updateFailure(data.message));
    }
  };
  //  Update User Api Hits Ends Here

  // Delete User Acount Api Hits Here
  const handleDelete = async (e) => {
    dispatch(deleteUserStart());
    e.preventDefault();
    const res = await fetch(`/api/user/delete/${currentuser._id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data) {
      setShowDeleteModal(false);
      dispatch(deleteUserSuccess(data));
      navigate("/login");
    }
    if (data.statusCode === 401) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  // Delete User Acount Api Hits Ends Here

  // Signout User APi Hits Here

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/signout", {
        credentials: "include",
        method: "POSt",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/login");
      }
    } catch (error) {
      dispatch(signoutFailure(error));
    }
  };
  return (
    <div className='max-w-lg mx-auto w-full mt-10'>
      <form className='flex flex-col p-4' onSubmit={handleFormData}>
        <h2 className='text-2xl font-semibold text-center mb-4'>My Profile</h2>
        {/* Errors to show success and error messages */}
        {showError ? <Alert color={"failure"}>{error}</Alert> : ""}
        {showSuccess ? (
          <Alert color={"success"}>{showSuccessMessage}</Alert>
        ) : (
          ""
        )}
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
          {imageFileUploadProgress && (
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
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentuser.avatar}
            alt='user'
            className={`rounded-full w-full h-full border-4 border-gray-300 object-cover ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {/* Error To Show Image Upload Errors */}
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        {/* Show Delete Modal */}
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          popup
          size={"md"}
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 mx-auto text-gray-400 dark:text-gray-200 mb-4' />
              <h3 className='mb-5 text-lg text-gray-600 dark:text-gray-400'>
                Are you sure you want to delete your account?
              </h3>
              <div className='flex flex-row justify-center gap-4'>
                <Button onClick={handleDelete} color='failure'>
                  Confirm
                </Button>
                <Button color='gray' onClick={() => setShowDeleteModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div className='mt-5'>
          <TextInput
            type='text'
            defaultValue={currentuser.username}
            icon={FaUser}
            id='username'
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <TextInput
            type='email'
            defaultValue={currentuser.email}
            icon={MdEmail}
            id='email'
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <TextInput
            type='password'
            placeholder='********'
            icon={IoMdLock}
            id='password'
            onChange={handleChange}
          />
        </div>
        <Button
          type='submit'
          gradientDuoTone={"greenToBlue"}
          className='w-100 mt-4 mb-2'
        >
          Submit
        </Button>
        <div className='mt-3 flex justify-between'>
          <Link>
            <Button color='red' onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </Button>
          </Link>
          <Link>
            <Button color='yellow' onClick={handleSignout}>
              Sign Out
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Profile;
