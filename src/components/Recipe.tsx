import { useRecoilState, useRecoilValue,useSetRecoilState } from "recoil";
import { recipeTitle,recipeDetails,recipeDescription,recipeImg,recipeIngred } from "../store/selector/recipe";
import { recipeState } from "../store/atoms/recipe";
import { Card,Grid,Button,Typography, TextField,TextareaAutosize } from "@mui/material";
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

    
export default function Recipe(){
    let {recipeId}=useParams();
  const setState=useSetRecoilState(recipeState)
    //const title=useRecoilValue(recipeTitle)
    useEffect(()=>{
        axios.get(`http://localhost:3001/user/recipe/${recipeId}`,{
            method:'GET',
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res)=>{
            setState({recipe:res.data.recipe,isLoading:false})
        }).catch((err) => {
            setState((prevRecipeDetails) => ({
              ...prevRecipeDetails,
              recipe: {
                title: '',
                description: '',
                ingredients: '',
                imgLink: '',
                _id: '',
              },
              isLoading: false,
            }));
          });
          
          },[])
    return <div>
        <GrayTopper/>
        <Grid container>
  <Grid item lg={8} md={12} xs={12}>
    <UpdateCard/>
   </Grid>
   <Grid item lg={4} md={12} xs={12}>
    <RecipeCard />
    </Grid>
        </Grid>
    </div>
}
const GrayTopper=()=>{
    const title=useRecoilValue(recipeTitle);
  return  <div style={{height:250,backgroundColor:'#212121',top:0,width:'100vw',zIndex:0,marginBottom:-250}}>
<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
    <div>
    <Typography  style={{color: "white", fontWeight: 600}} variant='h4' textAlign={'center'}>{title}</Typography></div>
</div>
    </div>
}
function UpdateCard(){

 const recipeDetails=useRecoilValue(recipeState)
   const [rd,setState]=useRecoilState(recipeState)
     const [titlee,setTitle]=useState(recipeDetails.recipe.title)
     const[des,Setdes]=useState(recipeDetails.recipe.description)
     const [img,setImg]=useState(recipeDetails.recipe.imgLink)
     const [ingre,setIngred]=useState(recipeDetails.recipe.ingredients)
     useEffect(() => {
      setTitle(recipeDetails.recipe.title);
      Setdes(recipeDetails.recipe.description);
      setIngred(recipeDetails.recipe.ingredients);
      setImg(recipeDetails.recipe.imgLink);
    }, [recipeDetails]);
    return<div style={{display:'flex',justifyContent:'center'}}>
      
         <Typography style={{marginBottom: 10}}>Update course details</Typography>
        <Card style={{maxWidth:'600px',marginTop:200}} variant="outlined">
            <TextField  style={{marginBottom: 10}} fullWidth value={titlee} id='outlined' onChange={(e)=>{setTitle(e.target.value)}}></TextField>
            <TextField  style={{marginBottom: 10}} fullWidth value={ingre} id='outlined'  onChange={(e)=>{setIngred(e.target.value)}}></TextField>
            <TextField  style={{marginBottom: 10}} fullWidth value={img} id='outlined' onChange={(e)=>{setImg(e.target.value)}}></TextField>
            <TextareaAutosize style={{minWidth:'500px'}} aria-label="minimum height" value={des}  minRows={22} onChange={(e)=>{Setdes(e.target.value)}} placeholder="Add recipe here"/>
            <Button variant='contained' onClick={async()=>{
           
                const response = await axios.put('http://localhost:3001/user/recipe/' + recipeDetails.recipe._id,{
                    title:titlee,
                    ingredients:ingre,
                    imgLink:img,
                    description:des
                },{headers:{
                    'Content-Type':'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
                }})
                let updatedRecipe={
                    _id:recipeDetails.recipe._id,
                    title:titlee || '',
                    ingredients:ingre || '',
                    imgLink:img || '',
                    description:des || ''
 }  
setState((prevRecipeDetails) => ({
    ...prevRecipeDetails,
    recipe: {
      ...prevRecipeDetails.recipe,
      ...updatedRecipe
    },
    isLoading: false,
  }));
  alert('updated recipe')
  }}>Update Recipe</Button>
        </Card>
    </div>
    
}
 function RecipeCard(){
    const title = useRecoilValue(recipeTitle);
  const description = useRecoilValue(recipeDescription);
  const ingredients = useRecoilValue(recipeIngred);
  const imgLink = useRecoilValue(recipeImg);
  
   return  <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
    <Card variant='outlined' style={{ margin: 10,
    minWidth: 350,
    minHeight: 200,
    borderRadius: 20,
    marginRight: 50,
    paddingBottom: 15,
    zIndex: 2}}>
<Typography textAlign={'center'} variant='h4'>{title}</Typography>
<Typography textAlign={'center'} variant='h6'>{ingredients}</Typography>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<img src={imgLink} style={{width:'300px',height:'200px'  }}></img></div>
{/* <Typography variant='h6' style={{ whiteSpace: 'pre-line' }}>{recipe.method}</Typography> */}
<Typography variant='h6' style={{ whiteSpace: 'pre-line' }}>
        {description}
      </Typography>
</Card>
</div>
}
    