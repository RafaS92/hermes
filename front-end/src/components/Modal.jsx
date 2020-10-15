import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import db from "../firebase";

export default function FormDialog() {
  const [inputName, setInputName] = useState("");

  const createChat = () => {
    const roomName = inputName;
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }

    setInputName("");
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Create a room</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => createChat()} color="primary" type="submit">
          Register
        </Button>
      </DialogActions>
    </div>
  );
}
