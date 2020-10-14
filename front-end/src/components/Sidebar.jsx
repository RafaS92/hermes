import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import { useStateValue } from "../StateProvider";

function Sidebar({ id, name }) {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsusbscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsusbscribe();
    };
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter a name for chat");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  const searchTerm = (e) => {
    setSearch(e.target.value);
  };

  let filteredRooms = rooms.filter((room) => room.data.name.startsWith(search));

  return (
    <div className="sideBar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />

        <IconButton>
          <ChatIcon onClick={createChat} />
        </IconButton>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search a chat"
            type="text"
            onChange={(e) => searchTerm(e)}
          />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {filteredRooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
