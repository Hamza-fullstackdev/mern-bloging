import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Createpost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageFileUploadError("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadError(null);
            setImageFileUploadProgress(null);
            setFormData({
              ...formData,
              imageUrl: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image upload error");
      setImageFileUploadProgress(null);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      }
      if (res.ok) {
        setError("");
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };
  return (
    <div className='max-w-3xl min-h-screen p-3 mx-auto'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      {error && (
        <Alert color={"failure"} className='mb-3'>
          {error}
        </Alert>
      )}
      <form className='flex flex-col gap-4' onSubmit={submitForm}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            placeholder='Title'
            type='text'
            required
            id='title'
            className='flex-1'
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>Javascript</option>
            <option value='reactjs'>React js</option>
            <option value='nodejs'>Node Js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            accept='image/*'
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            gradientDuoTone={"purpleToBlue"}
            type='button'
            size={"sm"}
            outline
            onClick={handleImageUpload}
            disabled={imageFileUploadProgress}
          >
            {imageFileUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        {formData.imageUrl && (
          <img src={formData.imageUrl} className='w-full h-72 object-cover' />
        )}
        <ReactQuill
          theme='snow'
          placeholder='My first post'
          required
          className='h-72 mb-12'
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button gradientDuoTone={"purpleToPink"} type='submit'>
          Publish
        </Button>
      </form>
    </div>
  );
};

export default Createpost;
