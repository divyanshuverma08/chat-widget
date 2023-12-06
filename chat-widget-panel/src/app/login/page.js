"use client";

import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const [values,setValues] = useState({
    email: "",
    password: ""
  }) ;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    const toastId = toast.loading("Loading...", { position: "top-center" });

    try {
      const data = await auth.login({
        data: {
          email,
          password,
        },
        auth: false,
      });
      toast.dismiss(toastId);

      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(login(data.user));

      router.push("/");
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
      const err = error.response?.data?.message || "Something went wrong...";
      toast.error(err);
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if (user) {
      router.push("/");
    }
  },[])

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.formInput}>
          <label>Email</label>
          <input type="email" name="email" onChange={onChange}  value={values.email}/>
        </div>
        <div className={styles.formInput}>
          <label>Password</label>
          <input type="password" name="password" onChange={onChange}  value={values.password}/>
        </div>
        <button type="submit"  >Submit</button>
        <div className={styles.link}><Link href="/register">Register</Link></div>
      </form>
    </div>
  );
}
