import { TextField,Button,Card,Typography} from "@mui/material"
import { useState } from "react"
import { userState } from "../store/atoms/user";
import {useSetRecoilState} from 'recoil';
//import { userEmailS } from "../store/selector/user";
// import { isLoadingS, userEmailS } from "../store/selector/user";
//import axios from 'axios';
export default function Signup(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const setUser=useSetRecoilState(userState)
    //const userEmail=useRecoilValue(userEmailS);
     return   <div>
         <Typography variant={'h5'} style={{textAlign:'center',marginBottom:'20px'}}>
          WELCOME TO RECIPES! SIGN UP BELOW
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{width:400,padding:'20px'}} variant='outlined'>
        <TextField style={{marginBottom:'20px'}} fullWidth id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{
            setEmail(e.target.value)
        }} />
        <TextField style={{marginBottom:'20px'}} fullWidth id="outlined-basic" type='password' label="Password" variant="outlined" onChange={(e)=>{
            setPassword(e.target.value)
        }} />
        <Button variant='contained' onClick={
            () => {
                fetch('http://localhost:3001/user/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: email,
                    password: password,
                  }),
                })
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Network response was not ok');
                  }
                })
                .then(data => {
                  localStorage.setItem('token',data.token);
                  // setUser((prevUserdetails)=>({
                  //   ...prevUserdetails,
                  //   userEmail:email,
                  //   isLoading:false
                  //    }))
                  alert('Signup successful!');
                  setUser({userEmail:email,isLoading:false})
                  //window.location.assign('/');
                 
                })
                // .catch(error => {
                //   console.error('An error occurred:', error);
                //   alert('Signup failed. Please try again.');
                // });
              }
              
        }>Signup</Button>
        </Card>
        </div>
        </div>   
}