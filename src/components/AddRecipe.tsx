import { Card,Button,Typography,TextField } from '@mui/material';
import axios from 'axios';
import {useState} from 'react';
import { TextareaAutosize } from '@mui/base';
import { useNavigate } from 'react-router-dom';
export default function AddRecipe(){
    const navigate=useNavigate();
    const [title,setTitle]=useState('');
    const [ingred,setIngred]=useState('');
    const [image,setImage]=useState('');
    const [description,setDes]=useState('');
    const [recipeId, setRecipeId] = useState(null);
    return<div style={{display:'flex',justifyContent:'center',alignItems:'center',maxWidth:'100vw',minHeight:'100vh'}}>
        <div>
            <Typography variant={'h4'} style={{textAlign:'center',marginBottom:'30px',marginTop:'20px'}}>
                ADD RECIPE BELOW !
            </Typography>
            <div style={{display:'flex',justifyContent:'center'}}>
<Card style={{ width:'800px',padding:'20px'}}>
<TextField style={{marginBottom:'20px'}} fullWidth id="outlined-basic" label="Recipe Name" onChange={(e)=>{setTitle(e.target.value)}} variant="outlined"></TextField>
<TextField  style={{marginBottom:'20px'}} fullWidth id="outlined-basic" label="Ingredients" onChange={(e)=>{setIngred(e.target.value)}} variant="outlined"></TextField>
<TextField  style={{marginBottom:'20px'}} fullWidth id="outlined-basic" label="Image Link" onChange={(e)=>{setImage(e.target.value)}} variant="outlined"></TextField>
 {/* <TextField  style={{marginBottom:'20px'}} fullWidth id="outlined-basic" label="Method" onChange={(e)=>{setDes(e.target.value)}} variant="outlined"> 
</TextField>  */}

<TextareaAutosize style={{maxWidth:'790px'}} aria-label="minimum height"  minRows={22} onChange={(e)=>{setDes(e.target.value)}} placeholder="Add recipe here"/>
<Button variant='contained' onClick={async()=>{
    const response=await axios.post('http://localhost:3001/user/recipe',{
        title:title,
        ingredients:ingred,
        imgLink:image,
        description:description,
     published:true
    },{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
        }
    })
    let data=response.data;
    setRecipeId(data.recipeId);
    alert('recipe added succesfully !')
    navigate('/recipes');
}}>Add recipe</Button>
</Card>

</div>
</div>
    </div>
}