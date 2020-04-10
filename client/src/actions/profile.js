import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE} from './types';

export const getCurrentProfile=()=> async dispatch =>{
    try{
        const res=await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

    }catch(err){
        console.log("s")
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }
}


//createprofile
export const createProfile=(formData,history,edit=false) =>async dispatch =>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.post('/api/profile',formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        console.log(res)
        dispatch(setAlert(edit?'Profile Updated':'Profile Created','success'));
        if(!edit){
            history.push('/dashboard')
        }
    }catch(error){
        const err = error.response.data.errors;
  
      if (err)
        err.forEach(error => {
          dispatch(setAlert(error.msg, "danger", 5000));
        });
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
        
    }
}


//add experience

export const addExperience=(formData,history)=>async dispatch=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        console.log("ohkk")
        const res=await axios.post('/api/profile/experience',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        console.log(res)
        dispatch(setAlert('Experience Added','success'));
            history.push('/dashboard')
    }catch(error){
        const err = error.response.data.errors;
  
      if (err)
        err.forEach(error => {
          dispatch(setAlert(error.msg, "danger", 5000));
        });
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response.statusText,status:error.response.status
            }
        })
        
    }
}

//add education
export const addEducation=(formData,history)=>async dispatch=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.post('/api/profile/education',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        console.log(res)
        dispatch(setAlert('Education Added','success'));
            history.push('/dashboard')
    }catch(error){
        const err = error.response.data.errors;
  
      if (err)
        err.forEach(error => {
          dispatch(setAlert(error.msg, "danger", 5000));
        });
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
        
    }
}