import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";


export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        console.log("Fetched history:", history); 
        if (history && history.length > 0) {
          setMeetings(history);
        } else {
          console.log("No meeting history found");
        }
      } catch (error) {
        console.error("Failed to fetch meeting history:", error);
      }
    };
  
    fetchHistory();
  }, []);

  let formatDate = (dateString) => {

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear();

    return `${day}/${month}/${year}`

}

return (
  <div>
    <IconButton
      onClick={() => {
        routeTo("/home");
      }}
    >
      <HomeIcon />
    </IconButton>

    {meetings.length > 0 ? (
      meetings.map((e) => (
        <Card key={e.id} sx={{ minWidth: 275, mb: 2 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Code: {e.meetingCode}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Date: {formatDate(e.date)}
            </Typography>
          </CardContent>
        </Card>
      ))
    ) : (
      <Typography sx={{ mt: 2, textAlign: "center" }}>
        No meeting history found.
      </Typography>
    )}
  </div>
);
}
