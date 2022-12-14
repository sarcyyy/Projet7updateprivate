import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { createfetch } from "../script/Allfetch";

const Tweet = ({ forceUpdate, reducerValue }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const resetfile = (e) => {
    e.target.value = null;
  };
  const recupmessage = (e) => {
    setMessage(e.target.value);
    console.log("img", image);
  };
  const recupfile = (e) => {
    setImage(e.target.files[0]);
    console.log("file", e.target?.files[0]);
  };
  const createtweet = (e) => {
    let name = JSON.parse(localStorage.getItem("token"))?.name;
    const file = new FormData();

    file.append("image", image);
    file.append("description", message);
    file.append("name", name);
    file.append("userId", "userid");
    createfetch(file, forceUpdate);
    setMessage("");
    setImage("");
  };
  return (
    <div className="tweetblock">
      <div className="message">
        <TextField
          multiline
          maxRows={5}
          className="widthfield"
          type="text"
          label="Ecrivez votre tweet"
          id="textcontent"
          value={message}
          onChange={recupmessage}
        />
        <Button
          variant="contained"
          className="inputheight"
          component="label"
          onChange={recupfile}
        >
          Importer image
          <input
            hidden
            onClick={resetfile}
            accept="image/*"
            multiple
            type="file"
            id="filecontent"
          />
        </Button>

        <Button
          variant="contained"
          id="creertweet"
          className="inputheight"
          onClick={createtweet}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default Tweet;
