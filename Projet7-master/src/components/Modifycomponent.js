import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Modifycomponent = () => {
  const [tweet, setTweet] = useState("");
  const [ismodifydone, setIsmodifydone] = useState(false);
  const [descriptionvalue, setDescriptionvalue] = useState("");
  const [newdescri, setNewdescri] = useState("");
  const [newimage, setNewimage] = useState("");
  const [token] = useState(JSON.parse(localStorage.getItem("token"))?.token);
  const navigate = useNavigate();
  useEffect(() => {
    const tweetid = JSON.parse(localStorage.getItem("id"));

    fetch("http://localhost:3000/api/accueil/" + tweetid, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((tweet) => {
        console.log(tweet);
        if (tweet._id !== tweetid) {
          localStorage.removeItem("id");
          navigate("/accueil");
        }
        setTweet(tweet);
        setDescriptionvalue(tweet.description);
        setNewdescri(tweet.description);
      });
  }, [navigate, token]);
  console.log(tweet.usersLiked);
  const onChangedescri = (e) => {
    setNewdescri(e.target.value);
    setDescriptionvalue(e.target.value);
  };
  const onChangeimage = (e) => {
    setNewimage(e.target.files[0]);
  };

  const functionModify = (e) => {
    const filed = new FormData();
    filed.append("image", newimage);
    filed.append("description", newdescri);

    fetch("http://localhost:3000/api/accueil/" + tweet._id, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
      body: filed,
    }).then((rep) => {
      if (rep.ok === true) {
        setIsmodifydone(true);
      } else {
        setIsmodifydone(false);
        alert("Erreur, veuillez r??-essayer");
      }
    });
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
          onChange={onChangedescri}
          value={descriptionvalue}
        />
        <Button variant="contained" className="inputheight" component="label">
          Importer la nouvelle image
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            id="filecontent"
            onChange={onChangeimage}
          />
        </Button>

        <Button
          variant="contained"
          id="creertweet"
          className="inputheight"
          onClick={functionModify}
        >
          Modifier
        </Button>
        {ismodifydone
          ? (localStorage.removeItem("id"), (<Navigate to="/accueil" />))
          : ""}
      </div>
    </div>
  );
};

export default Modifycomponent;
