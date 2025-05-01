import React from 'react'
import '../App.css'
import { useNavigate } from "react-router-dom"
import DuoOutlinedIcon from '@mui/icons-material/DuoOutlined';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';


export default function LandingPage() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/auth?mode=login");
  const goToRegister = () => navigate("/auth?mode=signup");
  const goToHome = () => navigate("/home");


  let checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    console.log("Token:", token);
    console.log("Username:", username);
    if(token) {
      console.log("Token found");
      return true;
    }
    return false;
  } 

  let handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  }

  return (
    <>
      <div className="landingPageContainer">
        <nav className="navbar">
          <div className="navLeftPart">
            <DuoOutlinedIcon style={{fontSize: "2rem", color: "orange"}}/>
            <h2>EchoMeet</h2>
          </div>

          
          {
          checkLoggedIn() ?

          <div className="navRightPart">
            <div style={{display: "flex", alignItems: "center"}}>
              <SpaceDashboardIcon style = {{fontSize: "1.5rem", color: "#00ccff"}}/>
              <p className='navRightPart-element btn-dashboard' onClick={goToHome}>Dashboard</p>
            </div>

            <button className='navRightPart-element btn' onClick={handleLogout}
            style={{display: "flex", alignItems: "center", gap: "5px"}}>Logout
               <ExitToAppOutlinedIcon style={{fontSize: "1.5rem", padding: "0"}}/>
            </button>
          </div> 
          
          :
          
          <div className="navRightPart">
            <div style={{display: "flex", alignItems: "center"}}>
              <GroupsOutlinedIcon style={{fontSize: "1.5rem", color: "#00ccff"}}/>
              <p className='navRightPart-element' onClick={goToHome}>Join as guest</p>
            </div>

            <div style={{display: "flex", alignItems: "center"}}>
              <PersonAddOutlinedIcon style={{fontSize: "1.5rem", color: "#ff8f00"}}/>
              <p className='navRightPart-element' onClick={goToRegister}>Register</p>
            </div>

            <button className='navRightPart-element btn' onClick={goToLogin}
            style={{display: "flex", alignItems: "center", gap: "5px"}}>
              Login
              <LoginOutlinedIcon style={{fontSize: "1.5rem", padding: "0"}}/>
            </button>
          </div>
        }
          
        </nav>

        <div className="mainPage">
          <div className="leftMainPage">
            <h2 className='leftMainPage-heading'><span style={{color: "orange"}}>Connect</span> with your Loved Ones</h2>
            <p className='leftMainPage-subHeading'>Cover a distance by EchoMeet</p>

            {
            checkLoggedIn() ? (<p className='user-welcome'>Welcome, 
            <span>{localStorage.getItem("username")}</span> 
          </p>) : <></>
          }
            

          </div>
          <div className="rightMainPage">
            <img src="src\assets\Main-page-video-call.png" alt="image loading.." />
          </div>
        </div>
      </div>
    </>
  )
}
