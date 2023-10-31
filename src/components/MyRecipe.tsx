import {  useSetRecoilState,useRecoilValue } from "recoil"
import { recipeState } from "../store/atoms/recipe"
import { useEffect} from "react"
import axios from "axios"
import { recipeTitle,recipeDescription,recipeImg,recipeIngred } from "../store/selector/recipe";
import { Card,Typography,Button  } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface RecipeProps{
    recipe?:{
        _id:Object,
         title: string;
         ingredients: string;
         imgLink: string;
      description: string;
      
    }}
export default function MyRecipe({recipe}:RecipeProps){
    
    const setState=useSetRecoilState(recipeState)
    //const[recipes,setRecipe]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/user/recipes/me',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            setState({recipe:res.data.recipe,isLoading:false})
            //setRecipe(res.data.recipes)
        })
            
            .catch((err)=>{
                console.log('err',err)
                console.log('err',err.res.data)
                setState((prevRecipe)=>({
                    ...prevRecipe,
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
        {/* {recipes.map((recipe)=>(
            <RecipeCard recipe={recipe}/>
        ))} */}
 <RecipeCard recipe={recipe}/> 
</div>
}

   function RecipeCard({recipe}:RecipeProps){
    const recipeId = recipe?._id ?? 'defaultId'; // Using nullish coalescing

    const title = useRecoilValue(recipeTitle);
  const description = useRecoilValue(recipeDescription);
  const ingredients = useRecoilValue(recipeIngred);
  const imgLink = useRecoilValue(recipeImg);
  const navigate=useNavigate();

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
      <Button variant='contained' size='large' onClick={()=>{
        navigate('/recipe/'+recipeId)
      }}>Edit</Button>
</Card>

</div>
}