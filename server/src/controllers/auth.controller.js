import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generate.token.js";

const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords Not Matching!" });
    }

    const existsUser = await User.findOne({ username });

    if (existsUser) {
      return res.status(409).json({ error: "Username Already Exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profile: gender === "male" ? boyProfilePic : girlProfilePic
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);  // Generate JWT

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profile: newUser.profile,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data!" });
    }
  } catch (error) {
    console.log("Signup Error: ", error.message);
    res.status(500).json({ error: "User Signup Error!" });
  }
}

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existsUser = await User.findOne({ username });
    const checkPassword = await bcrypt.compare(password, existsUser?.password || "");

    if (!existsUser || !checkPassword) {
      return res.status(409).json({ error: "Invalid Username or Password!" });
    }

    generateToken(existsUser._id, res);

    res.status(200).json({
      _id: existsUser._id,
      fullName: existsUser.fullname,
      username: existsUser.username,
      profile: existsUser.profile,
    });
  } catch (error) {
    console.log("Signin Error: ", error.message);
    res.status(500).json({ error: "User Signin Error!" });
  }
}

const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Signout Successfully!" });
  } catch (error) {
    console.log("Signout Error: ", error.message);
    res.status(500).json({ error: "User Signout Error!" });
  }
}

export { signup, signin, signout };