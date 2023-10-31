import { selector } from "recoil";
import { recipeState } from "../atoms/recipe";
export const recipeDetails=selector({
    key:'recipeDetails',
    get:({get})=>{
const state=get(recipeState);
return state.recipe;
    }
   
})

export const recipeTitle=selector({
    key:'recipeTitle',
    get:({get})=>{
        const state = get(recipeState) as { recipe: { title: string } |null };;
        if (state.recipe && state.recipe.title) {
            return state.recipe.title
    }
}})
export const recipeDescription=selector({
    key:'recipeDescription',
    get:({get})=>{
        const state = get(recipeState) as { recipe: {description: string } | null };;
        if (state.recipe && state.recipe.description) {
            return state.recipe.description
    }
}})
export const recipeIngred=selector({
    key:'recipeIngred',
    get:({get})=>{
        const state = get(recipeState) as { recipe: {ingredients: string } | null };;
        if (state.recipe && state.recipe.ingredients) {
            return state.recipe.ingredients
    }
}})
export const recipeImg=selector({
    key:'recipeImg',
    get:({get})=>{
        const state = get(recipeState) as { recipe: {imgLink: string } | null };;
        if (state.recipe && state.recipe.imgLink) {
            return state.recipe.imgLink
    }
}})