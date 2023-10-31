import { Recipe } from "../db/db";
import { authenticateJwt,secret } from "../middleware/midd";
import { Request,Response } from "express";
import express from 'express';
const router=express.Router();
router.post("/user/recipe", authenticateJwt, async (req:Request, res:Response) => {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json({ message: "Recipe created Successfully ", recipeId: recipe.id });
  });
  //me,put,getP,getAll recipe pub
  
  router.put("/user/recipe/:recipeId", authenticateJwt, async (req:Request, res:Response) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
      new: true,
    });
    if (recipe) {
      res.json({ message: "Recipe updated successfully" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  });
  router.get("/user/recipe/:recipeId", authenticateJwt, async (req:Request, res:Response) => {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ recipe });
  });
  router.get("/user/recipes", authenticateJwt, async (req:Request, res:Response) => {
    const recipes = await Recipe.find({ published: true });
    res.json({ recipes });
  });
  export default router;