import { Typography,Button,Grid } from "@mui/material";
import { useRecoilValue } from "recoil";

import { isLoadingS, userEmailS } from "../store/selector/user";

import { useNavigate } from "react-router-dom";
export default function Landing(){
   
    const userEmail=useRecoilValue(userEmailS)
    const isLoading=useRecoilValue(isLoadingS);
    const navigate=useNavigate();
    if(isLoading){
        <></>
    }
    if(userEmail !== ''){
      return  <Grid container>
<Grid item lg={5} md={12} xs={12}>
        <div style={{marginTop:'200px',paddingLeft:'40px'}}>
        <Typography style={{fontFamily:'Rowdies', fontWeight:300,marginLeft:'40px'}}  variant='h4'>
        WELCOME TO RECIPES !
        Here you can add ,view and share recipes !!
        </Typography>
         <Button style={{fontFamily:'Rowdies',color:'orange',border:'none',marginTop:'30px',marginLeft:'10px'}} size='large' variant ='outlined' onClick={()=>{navigate('/recipes')}}>Recipes</Button>
        <Button style={{fontFamily:'Rowdies',color:'orange',border:'none',marginTop:'30px',marginLeft:'10px'}}  size='large' variant ='outlined' onClick={()=>{navigate('/addrecipe')}}>Add recipe</Button> 
        </div>
    </Grid>
    <Grid item lg={7} md={12} xs={12}>
        <img style={{maxWidth:'800px',marginTop:'20px',marginRight:0}} src='https://cdn.dribbble.com/users/3849823/screenshots/17901886/media/ca4f2f1646545d75533eaef0feac4514.jpg?resize=1000x750&vertical=center' ></img>
    </Grid>
    
</Grid>
    }
return <div>
<Grid container>
<Grid item lg={5} md={12} xs={12}>
        <div style={{marginTop:'200px',paddingLeft:'40px'}}>
        <Typography style={{fontWeight:300,marginLeft:'20px'}} variant='h4'>
        “A recipe has no soul. You as the cook must bring soul to the recipe.”
        </Typography>
        <Button style={{marginTop:'30px',marginLeft:'30px'}} size='large' variant ='contained' onClick={()=>{navigate('/signup')}}>Signup</Button>
        <Button style={{marginTop:'30px',marginLeft:'10px'}}  size='large' variant ='contained' onClick={()=>{navigate('/signin')}}>Signin</Button>
        </div>
    </Grid>
    <Grid item lg={7} md={12} xs={12}>
        <img style={{maxWidth:'800px',marginTop:'20px'}} src='https://cdn.dribbble.com/users/3849823/screenshots/17901886/media/ca4f2f1646545d75533eaef0feac4514.jpg?resize=1000x750&vertical=center' ></img>
    </Grid>
    
</Grid>
</div>
}