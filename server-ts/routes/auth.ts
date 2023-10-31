
import express from 'express';
import { Request,Response } from 'express';
import { secret ,authenticateJwt } from '../middleware/midd';
import jwt from 'jsonwebtoken';
import { User } from "../db/db";
const router=express.Router();
router.post("/user/signup",async (req:Request, res:Response) => {
  console.log("Accessed /user/signup route"); // Add this line
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: "Username alredy exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, secret, {
      expiresIn: "1hr",
    });
    res.json({ message: "Username created Successfully", token });
  });
  router.post("/user/login",async (req:Request, res:Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: "Logged in Succesfully" });
    } else {
      res.sendStatus(403);
    }
  });
  
  //me,put,getP,getAll recipe pub
router.get("/user/me",authenticateJwt,async (req:Request, res:Response) => {
    const userId=req.headers['userId'];
    const user = await User.findOne({ userId });
    if (!user) {
      res.status(403).json({ msg: "User doesnt exist" });
      return;
    }
    res.json({ username: user.username });
  });