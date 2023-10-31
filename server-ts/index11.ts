import express from 'express';
import {signupInput} from '../common/src'
const app=  express();
const port =3001;
import mongoose from'mongoose';
import cors from 'cors';
app.use(cors())
app.use(express.json());
//app.use("/auth", authRoutes);
//app.use("/route", router);

 const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
   const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: String,
    imgLink: String,
   description: String,
    published: Boolean,
  });
   const User = mongoose.model("User", userSchema);
   const Recipe = mongoose.model("Recipe", recipeSchema);


   import  jwt from "jsonwebtoken";
   import { Request,Response,NextFunction } from "express";
   export const secret = "euhgh";
   
   export const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
       const authHeader = req.headers.authorization;
       if (authHeader) {
         const token = authHeader.split(" ")[1];
         jwt.verify(token, secret, (err, payload) => {
           if (err) {
             return res.sendStatus(403);
           }
           if (!payload) {
             return res.sendStatus(403);
           }
           if (typeof payload === "string") {
             return res.sendStatus(403);
           }
           req.headers['userId'] = payload.id;
           next();
         });
       } else {
         res.sendStatus(401);
       }
     };

mongoose.connect(
    "mongodb+srv://bhavya601474:bhavyaMongoDb@cluster0.selravw.mongodb.net/",{dbName: "recipes"});
    app.post("/user/signup",async (req:Request, res:Response) => {
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
        app.post("/user/signup",async (req:Request, res:Response) => {
          //console.log("Accessed /user/signup route"); // Add this line
          const parsedInput=signupInput.safeParse(req.body);
          if (!parsedInput.success) {
            return res.status(403).json({
              msg: "error:min 5 and max 10 for both"
            });
          }
          const username=parsedInput.data.username;
          const password=parsedInput.data.password;
            //const { username, password } = req.body;
            const user = await User.findOne({ username:parsedInput.data.username });
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
       app.post("/user/login",async (req:Request, res:Response) => {
          const { username, password } = req.body;
          const user = await User.findOne({ username, password });
          if (user) {
            res.json({ message: "Logged in Succesfully" });
          } else {
            res.sendStatus(403);
          }
        });
        
        //me,put,getP,getAll recipe pub
      app.get("/user/me",authenticateJwt,async (req:Request, res:Response) => {
          const userId=req.headers['userId'];
          const user = await User.findOne({ userId });
          if (!user) {
            res.status(403).json({ msg: "User doesnt exist" });
            return;
          }
          res.json({ username: user.username });
        });
       app.post("/user/recipe", authenticateJwt, async (req:Request, res:Response) => {
            const recipe = new Recipe(req.body);
            await recipe.save();
            res.json({ message: "Recipe created Successfully ", recipeId: recipe.id });
          });
          //me,put,getP,getAll recipe pub
          
          app.put("/user/recipe/:recipeId", authenticateJwt, async (req:Request, res:Response) => {
            const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
              new: true,
            });
            if (recipe) {
              res.json({ message: "Recipe updated successfully" });
            } else {
              res.status(404).json({ message: "Recipe not found" });
            }
          });
          app.get("/user/recipe/:recipeId", authenticateJwt, async (req:Request, res:Response) => {
            const recipeId = req.params.recipeId;
            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
              return res.status(404).json({ error: "Recipe not found" });
            }
            res.json({ recipe });
          });
          app.get("/user/recipes/me",authenticateJwt,async(req:Request,res:Response)=>{
            const recipes= await Recipe.find({})
            res.json({recipes})
          })
          app.get("/user/recipes", authenticateJwt, async (req:Request, res:Response) => {
            const recipes = await Recipe.find({ published: true });
            res.json({ recipes });
          });
          
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)})
