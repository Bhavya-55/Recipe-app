import { useSetRecoilState,useRecoilValue } from "recoil"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { recipeTitle,recipeDescription,recipeImg,recipeIngred } from "../store/selector/recipe";
import { recipeState } from "../store/atoms/recipe";
import { Card,Typography,  Button} from "@mui/material";

interface RecipeProps{
    recipe?:{
        _id:Object,
        title: string;
        ingredients: string;
        imgLink: string;
     description: string;
      
    }}
export default function View(){
    let {recipeId}=useParams();
    const setState=useSetRecoilState(recipeState)
    useEffect(()=>{
        axios.get(`http://localhost:3001/user/recipe/${recipeId}`,{
            method:'GET',
            headers:{"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res)=>{
            setState({recipe:res.data.recipe,isLoading:false})
        }).catch((err)=>{
            setState((prevRecipeDetails)=>({
               ...prevRecipeDetails,
               recipe:{
                title: '',
                description: '',
                ingredients: '',
                imgLink: '',
                _id: '',
               },
               isLoading:false
            }))
        })
    },[])
return <div>
<RecipeCard/>
</div>
}
function RecipeCard(){
    //const recipeId = recipe?._id ?? 'defaultId'; // Using nullish coalescing
    //const navigate=useNavigate();
    const title = useRecoilValue(recipeTitle);
  const description = useRecoilValue(recipeDescription);
  const ingredients = useRecoilValue(recipeIngred);
  const imgLink = useRecoilValue(recipeImg);
  
   return  <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
    <Card variant='outlined' style={{ margin: 10,
    maxWidth: 750,
    minHeight: 200,
    borderRadius: 20,
    marginRight: 50,
    paddingBottom: 15,
    background:'beige',
    zIndex: 2}}>
<Typography style={{marginTop:'15px',fontFamily: 'Poppins',fontWeight:700}} textAlign={'center'} variant='h4'>{title}</Typography>
<Typography style={{marginTop:'10px',fontFamily: 'Poppins',fontWeight:500}} textAlign={'center'} variant='h6'>{ingredients}</Typography>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<img  src={imgLink} style={{marginTop:'15px',width:'300px',height:'300px'  }}></img></div>
{/* <Typography variant='h6' style={{ whiteSpace: 'pre-line' }}>{recipe.method}</Typography> */}
<Typography variant='h6' style={{ whiteSpace: 'pre-line' }}>
        {description}
      </Typography>
      {/* <Button variant='contained' size='large' onClick={()=>{
        navigate('/recipe/'+recipeId)
      }}>Edit</Button> */}
</Card>
</div>
}
    