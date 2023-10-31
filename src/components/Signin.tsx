

import { Typography, Button, TextField, Card } from '@mui/material';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export default function Signin() {
  //const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  //const setUser=useSetRecoilState(userState)

  // const handleSignup = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/admin/signup', {
  //       username: email,
  //       password: psw,
  //     });
  
  //     let data = response.data;
  //     localStorage.setItem('token', data.token);
  //     alert('Signup successful');
  //    // window.location='/';
  //    setUserEmail(email);
  //    navigate("/courses");
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error('Error signing up:', error);
  //   }
  // };
  
  return (
    <div>
      {/* <div
        style={{
          paddingTop: '200px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      > */}
        <Typography style={{textAlign:'center',marginBottom:'20px'}} variant={'h5'}>
          WELCOME BACK ! SIGNIN BELOW
        </Typography>
      {/* </div> */}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          variant="outlined"
          style={{
            width: '400px',
            padding: '20px',
          }}
        >
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />

          <TextField
            onChange={(e) => {
              setPsw(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />
          <Button size={'large'} variant="contained" onClick={async() => {
                        const response = await axios.post("http://localhost:3001/user/signin", {
                            username: email,
                            password: psw
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                         window.location.assign('/')
                       // setUser({userEmail: email, isLoading: false})
                        //navigate("/courses")
                    }}>
            Sign up
          </Button>
        </Card>
      </div> 
     </div>
  );
}


