import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Validation from "../validation/validation.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = Validation.User.ValidateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({
    email: req.body.email.toLowerCase()
  });
  if (emailExists)
    return res.status(400).send("User with provided email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email.toLowerCase(),
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    return res.status(201).send({ user: savedUser._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = Validation.User.ValidateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
      return res.header("auth-token", token).send();
    }
  }

  return res.status(401).send("The email address or password is incorrect");
});

export default router;
