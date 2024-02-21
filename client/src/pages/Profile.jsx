import React from "react";
import { useSelector } from "react-redux";

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.restUserInfo.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
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
