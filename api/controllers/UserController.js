import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // check Username
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    // check Email
    const emailCheck = await User.findOne({ email });www
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const { password, ...user } = userData._doc;

    return res.status(200).json({ status: true });
  } catch (error) {
    return res.json({ status: false, msg: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const token = jwt.sign(
      {
        user: user._id,
      },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "10h" }
    );

    return res.json({ status: true, token });
  } catch (error) {
    return res.json({ msg: error.message, status: false });
  }
};
