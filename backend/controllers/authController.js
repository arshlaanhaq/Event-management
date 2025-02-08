import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
export const guestLogin = async (req, res) => {
  try {
    const guestUser = new User({
      name: `Guest_${Math.random().toString(36).substring(7)}`,
      email: `guest${Date.now()}@guest.com`,
      password: "guest123",
      isGuest: true,
    });

    await guestUser.save();

    res.json({
      _id: guestUser.id,
      name: guestUser.name,
      email: guestUser.email,
      token: generateToken(guestUser.id),
      isGuest: true,
    })

  } catch (error) {
    res.status(500).json({ message: "Error creating guest user", error });
  }
};




export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
