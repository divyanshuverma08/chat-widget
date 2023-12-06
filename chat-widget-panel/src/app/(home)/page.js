"use client";

import Navbar from "@/components/navbar/navbar";
import styles from "./page.module.css";
import Sidebar from "@/components/sidebar/sidebar";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { chat } from "@/lib/services/chat";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { environment } from "@/lib/environment";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.currentUser);

  const [data, setData] = useState(null); //state for chats in side bar
  const [value, setValue] = useState(""); //state for text input
  const [chats, setChats] = useState(null); //state for current chat messages
  const [chatInfo, setChatInfo] = useState(null); //state for current chat Info

  const [socket, setSocket] = useState(null); //state for socket connection

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    getAllChats();
    setSocket(io(environment.SERVER_URL)); //initialize socket connection
  }, []);

  // show selected user chat and fetch chat
  const showChat = async (data) => {
    if (chatInfo !== null) {
      //leaving previous chat room
      socket.emit("leave chat", chatInfo);
    }
    await getChat(data._id);
    //joining new chat room
    socket.emit("join chat", data.userId);
  };

  //creating new message
  const addMessage = () => {
    socket.emit("chat message", {
      message: value,
      userId: chatInfo._id,
      sentBy: "host",
    });
    setValue("");
  };

  //Disconnect host
  const disconnectHost = () => {
    socket.emit("host disconnect");
  };

  //Connect host
  useEffect(() => {
    socket?.emit("host connect");
  }, [socket]);

  useEffect(() => {
    //socket listener for any message received in current chat
    socket?.on("chat received", (data) => {
      updateChats(data);
    });

    //socket listener in case new chat is added
    socket?.on("chat added", () => {
      toast.success("New chat",{position: "top-center"});
      getAllChats();
    });
  }, [socket]);

  const updateChats = (data) => {
    setChats((prev) => {
      return [...prev, { content: data.message, createdBy: data.createdBy }];
    });
  };

  const getAllChats = async () => {
    try {
      const response = await chat.getAllChats({ auth: true });

      if (response) {
        setData(response.data);
      }
    } catch (error) {
      if (error.response?.data) {
        console.log(error.response.data);
      }
    }
  };

  async function getChat(id) {
    try {
      const response = await chat.getChat({
        id: id,
        auth: true,
      });

      if (response) {
        setChats(response.data.messages);
        setChatInfo(response.data.userId);
      }
    } catch (error) {
      if (error.response?.data) {
        console.log(error.response.data);
      }
    }
  }

  useEffect(()=>{
    if(chats){
      //scrolling to current chat
      const chatMessages = document.getElementById("chat-messages");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  },[chats])

  return (
    <main className={styles.main}>
      <Navbar disconnect={disconnectHost} />
      <div className={styles.container}>
        <Sidebar showChat={showChat} data={data} />
        {chatInfo ? (
          <div className={styles.chatBox}>
            <div className={styles.chatHeader}>Divyanshu</div>
            <div id="chat-messages" className={styles.chats}>
              <div className={styles.chatsContainer}>
                {chats?.map((item, i) => (
                  <div
                    key={i}
                    className={`${styles.chat} ${
                      item.createdBy === "host" && styles.other
                    }`}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Type Here"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={addMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className={styles.noChat}>
            <h1>Open A Chat</h1>
          </div>
        )}
      </div>
    </main>
  );
}
