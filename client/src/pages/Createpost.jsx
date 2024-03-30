import React from "react";
import {Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Createpost = () => {
  return <div className="max-w-3xl min-h-screen p-3 mx-auto">
    <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput placeholder="Title" type="text" required id="title" className="flex-1"/>
        <Select>
          <option value="uncategorized">Select a category</option>
          <option value="javascript">Javascript</option>
          <option value="reactjs">React js</option>
          <option value="nodejs">Node Js</option>
        </Select>
      </div>
      <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput accept="image/*" type="file"/>
          <Button gradientDuoTone={"purpleToBlue"} type="button" size={'sm'} outline>Upload Image</Button>
      </div>
      <ReactQuill theme="snow" placeholder="My first post" required className="h-72 mb-12"/>
      <Button gradientDuoTone={'purpleToPink'} type="submit">Publish</Button>
    </form>
  </div>;
};

export default Createpost;
