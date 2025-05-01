import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import "../styles/home.css";


function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  let checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    console.log("Token:", token);
    console.log("Username:", username);
    if (token) {
      console.log("Token found");
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="home-navBar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/home")}>
          <SpaceDashboardIcon></SpaceDashboardIcon>
          <h2>Dashboard</h2>
        </div>

        {checkLoggedIn() ? (
          <div className="home-navBar-right">
            <div
              className="home-nav-button history-button"
              onClick={() => {
                navigate("/history");
              }}
            >
              <IconButton style = {{padding: "px"}}>
                <RestoreIcon />
              </IconButton>
              <p>History</p>
            </div>

            <div className="home-nav-button" onClick={() => {navigate("/")}}>
              <HomeOutlinedIcon />
              <p>Home</p>
            </div>

            <p className="home-logout-button"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </p>
          </div>
        ) : (
          <Button
            className="home-login-button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Login
          </Button>
        )}
      </div>

      <div className="home-meetContainer">
        <div className="home-leftPanel">
          <h1>EchoMeet</h1>
          <h2>Providing Quality Video Call Just Like Quality Education</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              onChange={(e) => setMeetingCode(e.target.value)}
              id="outlined-basic"
              label="Meeting Code"
              variant="outlined"
              className="home-meeting-input"
            />

            <Button
              className="home-meetingCodeJoinButton"
              onClick={handleJoinVideoCall}
              variant="contained"
            >
              Join
            </Button>
          </div>

          {checkLoggedIn() ? (
            <div className="home-user-info">
              User -
              <span>{localStorage.getItem("username")}</span>
            </div>
          ) : (
            <p className="home-guest-message">
              You are currently joined as a guest. Login to enhance your
              experience.
            </p>
          )}
        </div>
        <div className="home-rightPanel">
          <img src="src/assets/img-for-home.webp" alt="Video call illustration" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
