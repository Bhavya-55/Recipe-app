import {atom} from 'recoil';
export const recipeState=atom({
    key:'recipeState',
   default:{
    isLoading:true,
    recipe: {
        title: '',
        description: '',
        ingredients: '',
        imgLink: '',
        _id:''
    
      } 
   }

})