import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// In this part for the form I followed this tutorial: https://youtu.be/LobZv3i6BXk?si=ALuudRPRbKZjmEn5
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup
  .object({
    username: yup.string().required("missing username"),
    email: yup.string().required("missing email").email("Invalid email format"),
    password: yup.string().required("missing password"),
  })
  .required();

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        data
      );
      if(res){
        reset()
        navigate('/sign-in')
      } 
      
    } catch (err) {
      const message = err?.response?.data?.message;

      if(message?.username?.length){
        setError("username", { type: "server", message:message.username});
      }
      if(message?.email?.length){
        setError("email", { type: "server", message:message.email});
      }
      if(message?.password?.length){
        setError("password", { type: "server", message:message.password});
      }
    }


    setLoading(false);
    
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          className="border p-3 rounded-lg"
          placeholder="username"
          {...register("username")}
        />
        {errors.username && (
          <span className="text-red-500 font-semibold text-xs">
            {errors.username.message}
          </span>
        )}
        <input
          className="border p-3 rounded-lg"
          placeholder="email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 font-semibold text-xs">
            {errors.email.message}
          </span>
        )}
        <input
          className="border p-3 rounded-lg"
          placeholder="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500 font-semibold text-xs">
            {errors.password.message}
          </span>
        )}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
