import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";

// In this part for the form I followed this tutorial: https://youtu.be/LobZv3i6BXk?si=ALuudRPRbKZjmEn5
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup
  .object({
    email: yup.string().required("missing email").email("Invalid email format"),
    password: yup.string().required("missing password"),
  })
  .required();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  // const {loading, error} = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    setLoading(true);
    // dispatch(signInStart())
    try {
      const res = await axios.post(
        // "http://localhost:3000/api/v1/auth/signup" was put as a proxi vite.config.js
        "/api/v1/auth/signin",
        data
      );
      console.log("RES: ", res)
      if(res){
        reset()
        navigate('/')
      } 
      dispatch(signInSuccess(res.data))
    } catch (err) {
      console.log("ERROR: ", err)
      const message = err?.response?.data?.message;
      if(message) setError("signin", {type: "server", message})

      if(message?.username?.length){
        setError("username", { type: "server", message:message.username});
      }
      if(message?.email?.length){
        setError("email", { type: "server", message:message.email});
      }
      if(message?.password?.length){
        setError("password", { type: "server", message:message.password});
      }
      // dispatch(signInFailure(message))
      
      dispatch(signInFailure())
    }


    setLoading(false);
    
    
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        {errors.signin && (
          <span className="text-red-500 font-semibold text-xs">
            {errors.signin.message}
          </span>
        )}
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Do not have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
