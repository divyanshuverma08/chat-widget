"use client"

import React, { useState } from "react";
import styles from "./sidebar.module.css";

export default function Sidebar({data,showChat}) {
  const [active,setActive] = useState(null);

  const displayChat = (item) =>{
    setActive(item.userId.email);
    showChat(item);
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>Chats</div>
      <div className={styles.customerList}>
        {data?.map((item,index)=><div key={index} className={`${styles.customer} ${item.userId.email === active && styles.active}`} onClick={()=>displayChat(item)}>
          {item.userId.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>)}
      </div>
    </div>
  );
}
