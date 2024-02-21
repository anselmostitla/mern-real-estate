import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

// In this part for the form I followed this tutorial: https://youtu.be/LobZv3i6BXk?si=ALuudRPRbKZjmEn5
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import OAuth from "../components/OAuth";

const validationSchema = yup
  .object({
    username: yup.string().required("missing username"),
    email: yup.string().required("missing email").email("Invalid email format"),
    password: yup.string().required("missing password"),
  })
  .required();

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [progresspercent, setProgresspercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log("formData: ", formData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target?.files[0];
    console.log("file:::: ", file);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " % done");
        setProgresspercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => handleFileUpload(e)}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.restUserInfo.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error image upload(image must be less than 2mb)
            </span>
          ) : progresspercent > 0 && progresspercent < 100 ? (
            <span className="text-green-700">{`Uploading ${progresspercent}%`}</span>
          ) : progresspercent === 100 ? (
            <span className="text-green-700">{`Image successfully uploaded!`}</span>
          ) : (
            ""
          )}
        </p>
        <input
          className="border p-3 rounded-lg"
          placeholder="username"
          {...register("username")}
        />
        <input
          className="border p-3 rounded-lg"
          placeholder="email"
          type="email"
          {...register("email")}
        />
        <input
          className="border p-3 rounded-lg"
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
          UPDATE
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign-out</span>
      </div>
    </div>
  );
}
