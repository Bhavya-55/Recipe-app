import { Button, Typography,Tooltip } from "@mui/material";
import { userEmailS,isLoadingS } from "../store/selector/user";
import { userState } from "../store/atoms/user"
import {useSetRecoilState,useRecoilValue} from 'recoil';
import { useNavigate } from "react-router-dom";
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
export default function Appbar(){
    const navigate=useNavigate();
    const setUser=useSetRecoilState(userState);
    const userEmail=useRecoilValue(userEmailS);
    const isLoading=useRecoilValue(isLoadingS);
    if(isLoading){
        <>Loading....</>
    }
    console.log('useremail:',userEmail)
if(userEmail !== ''){
    return <div style={{display:'flex',justifyContent:'space-between',paddingTop:'10px'}}>
        <Typography style={{fontFamily:'Rowdies',paddingLeft:'20px'}}  variant='h4'>RECIPES</Typography>
        <div style={{marginRight:'10px'}}>
            <Tooltip style={{marginRight:'10px'}} title={userEmail}>
                <AccessibilityNewRoundedIcon/>
            </Tooltip>
<Button style={{fontFamily:'Rowdies',color:'orange',border:'none',marginRight:'10px'}} variant="outlined" onClick={()=>{navigate('/addrecipe')}}>Add Recipe</Button>
<Button style={{fontFamily:'Rowdies',color:'orange',border:'none',marginRight:'10px'}} variant="outlined" onClick={()=>{navigate('/recipes')}}>Recipes</Button>
<Button style={{marginRight:'10px'}} onClick={()=>{
        localStorage.removeItem('token');
    setUser({
        isLoading:false,
        userEmail:''
    })
    alert('logout')
    navigate('/')
    //window.location.assign('/')
  
}} variant="contained">Logout</Button>
</div>
</div>

}
    return <div style={{display:'flex',justifyContent:'space-between',paddingTop:'10px'}}>
        
        <Typography  style={{fontFamily:'Rowdies',paddingLeft:'30px'}}  variant='h4'>RECIPES</Typography>
        <div style={{marginRight:'10px'}}>
<Button style={{marginRight:'10px'}}variant="contained" size='large' onClick={()=>{navigate('/signup')}}>Signup</Button>
<Button style={{marginRight:'10px'}}variant="contained" size='large' onClick={()=>{navigate('/signin')}}>Signin</Button>
</div>
</div>

}


