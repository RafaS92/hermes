import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from "../axios";
import { useParams } from "react-router-dom";
import db, { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import TelegramIcon from "@material-ui/icons/Telegram";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  let history = useHistory();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleTimeString()}
          </p>
        </div>

        <div className="headerRight">
          <a
            variant="outlined"
            className="auth_button"
            color="default"
            href="/login"
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => auth.signOut()}
            >
              Log out
            </Button>
          </a>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message, id) => (
          <p
            key={id}
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <p className="chat_name">{message.name}</p>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <div className="send-icon">
            <TelegramIcon
              color="primary"
              fontSize="medium"
              onClick={sendMessage}
              type="submit"
            >
              add_circle
            </TelegramIcon>
          </div>
          <button onClick={sendMessage} type="submit"></button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
