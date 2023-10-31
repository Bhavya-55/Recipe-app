import  mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  export const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: String,
    imgLink: String,
    description: String,
    published: Boolean,
  });
  export const User = mongoose.model("User", userSchema);
  export const Recipe = mongoose.model("Recipe", recipeSchema);
