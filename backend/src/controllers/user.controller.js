import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import User from "../models/user.model.js";
import Meeting from "../models/meeting.model.js";
import crypto from "crypto";

const register = async (req, res) => {
  let { name, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      password: hashedPassword,
      username,
    });

    await newUser.save();
    res
      .status(httpStatus.CREATED)
      .json({ message: "New user created successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Something went wrong! ${err}` });
  }
};

const login = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `Please provide username and password` });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `No user exists!` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password!" });
    }
    
    let token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();
    res.status(200).json({ message: "Login successful", token, name: user.name });
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong${e}` });
  }
};

const getUserHistory = async(req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch meetings for this user from the Meeting model
    const meetings = await Meeting.find({ userid: user.username }).sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const addToHistory = async (req, res) => {
  const {token, meeting_code} = req.body;
  try {
    const user = await User.findOne({token: token});
    const newMeeting = new Meeting({
      userid: user.username,
      meetingCode: meeting_code,
      date: new Date()
    })

    await newMeeting.save();
    res.status(httpStatus.CREATED).json({message: "Added code to history"})
  } catch (error) {
    res.json({message: `Something went wrong ${error}`})
  }
}

export { login, register, getUserHistory, addToHistory };
