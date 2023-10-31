import './index.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import AddRecipe from './components/AddRecipe';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe.tsx';
import { RecoilRoot } from 'recoil';
import {useSetRecoilState} from 'recoil'
import { userState } from "./store/atoms/user.ts"; 
import {useEffect} from 'react'
import axios from 'axios';

import Appbar from './components/Appbar.tsx';
import { userEmailS } from './store/selector/user.ts';
import Landing from './components/Landing.tsx';
import View from './components/View.tsx';
import MyRecipe from './components/MyRecipe.tsx';
function App() {


  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#eeeeee'
    }}>
      <RecoilRoot>
      <Router>
        <Appbar/>
      <InitUser/>
        <Routes>
         
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/addrecipe'element={<AddRecipe/>}/>
          <Route path='/recipes' element={<Recipes/>}/>
            <Route path='/' element={<Landing/>}/>  
          <Route path='/recipe/:recipeId' element={<Recipe/>}/>
          <Route path='/viewrecipe/:recipeId' element={<View/>}/>
           {/* <Route path='/myrecipe' element={<MyRecipe/>}/>  */}

        </Routes>
      </Router>
      </RecoilRoot>
    </div>
  )
}
function InitUser(){
  const setUser=useSetRecoilState(userState);
  const init = async() => {
  const response=await axios.get('http://localhost:3001/user/me',{headers:{
    'Authorization':'Bearer '+localStorage.getItem('token')
  }})
  try{
    if(response.data.username){
      // setUser((prevUser) => ({
      //   ...prevUser,
      //   isLoading: false,
      //   userEmail: response.data.username
      // }));
     setUser({
       isLoading:false,
       userEmail:response.data.username
     })
  }else{
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   isLoading: false,
    //   userEmail: ''
    // }));
      setUser(
        { 
        isLoading:false,
        userEmail:''})
   }}
  catch(e){
    setUser(
      { 
      isLoading:false,
      userEmail:''})
  }
}
 useEffect(()=>{init()},[]);
 console.log('app',{userEmailS})
 return <></>
}
export default App
