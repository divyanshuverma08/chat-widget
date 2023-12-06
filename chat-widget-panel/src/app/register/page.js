"use client";

import React, { useState, useEffect } from "react";
import styles from "../login/login.module.css";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordReEnter: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, passwordReEnter, name } = values;

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!password || !passwordReEnter) {
      toast.error("Password is required");
      return;
    }

    if (!name) {
      toast.error("Name is required");
      return;
    }

    const emailRegex = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    const passwordRegex = new RegExp(
      "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$"
    );

    if (!passwordRegex.test(password)) {
      toast.error("Enter a valid password");
      return;
    }

    if (password.localeCompare(passwordReEnter) !== 0) {
      toast.error("Passwords fields should be same");
      return;
    }

    const toastId = toast.loading("Loading...", { position: "top-center" });

    try {
      const data = await auth.register({
        data: {
          name,
          email,
          password,
        },
        auth: false,
      });
      toast.dismiss(toastId);

      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(login(data.user));

      toast.success("Account has been created", { duration: 2000 });
      router.push("/");
    } catch (error) {
      toast.dismiss(toastId);
      const err = error.response?.data?.message || "Something went wrong...";
      toast.error(err);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.formInput}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={values.name}
          />
        </div>
        <div className={styles.formInput}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            value={values.email}
          />
        </div>
        <div className={styles.formInput}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        <div className={styles.formInput}>
          <label>Re-enter Password</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={values.passwordReEnter}
          />
        </div>
        <button type="submit">Submit</button>
        <div className={styles.link}>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
