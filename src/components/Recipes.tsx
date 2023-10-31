import {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';


import { Button, Card, Typography } from '@mui/material';
interface RecipeProps{
    recipe:{
        _id:Object,
        title: string;
        ingredients: string;
        imgLink: string;
     description: string;
      
    }
}
export default function Recipes(){
  
    const [recipes,setRecipes]=useState([])
const init=async()=>{
    const response=await axios.get('http://localhost:3001/user/recipes',{
        headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
        }
    })
    let data=response.data;
    setRecipes(data.recipes)
}
useEffect(()=>{
    init();
},[])
    return <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
{recipes.map((recipe)=>(
<Recipe recipe={recipe}/>
))}</div>
}
function Recipe({recipe}:RecipeProps){
    // Split the recipe.method into an array of lines
  //const methodLines = recipe.method.split('\n');

//   const methodLines=recipe.description && typeof recipe.description === 'string' ? recipe.description.split('\n') : [];

    const navigate=useNavigate();
    return(
    <Card variant='outlined' style={{width:'400px',margin:'10px',minHeight:'300px'}}>
<Typography textAlign={'center'} variant='h4'>{recipe.title}</Typography>
 <Typography textAlign={'center'} variant='h6'>{recipe.ingredients}</Typography> 
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<img src={recipe.imgLink} style={{width:'300px',height:'200px'  }}></img></div>
{/* <Typography variant='h6' style={{ whiteSpace: 'pre-line' }}>{recipe.method}</Typography> */}
{/* <Typography variant='h6' style={{ whiteSpace: 'pre-line' }}>
        {methodLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </Typography> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<div style={{display:'flex',justifyContent:'space-between',marginTop:'10px',marginBottom:'10px'}}>
 <Button style={{marginRight:'20px'}} size='large' variant='contained' onClick={()=>{
navigate('/viewrecipe/'+recipe._id)
 }}>View</Button>
 <Button style={{marginRight:'20px'}} variant='contained' size='large' onClick={()=>{
        navigate('/recipe/'+recipe._id)
      }}>Edit</Button>
</div>
</div>
    </Card>
    )
}