"use client";

import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { logout } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Navbar({disconnect}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [mounted,setMounted] = useState(false);

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(()=>{
    setMounted(true);
  },[]);

  return (
    <nav className={styles.navbar}>
      <h1>Chat bot</h1>
      <div className={styles.adminDetails}>
        {mounted && <h2>{user?.email}</h2>}
        <button
          onClick={() => {
            disconnect();
            dispatch(logout());
            localStorage.setItem("user", null);
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
