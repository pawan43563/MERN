import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,ACCOUNT_DELETED,CLEAR_PROFILE,GET_REPOS,GET_PROFILES} from './types';

export const getCurrentProfile=()=> async dispatch =>{
    try{
        const res=await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }
}
//get profiles
export const getProfiles=()=> async dispatch =>{
    dispatch({type:CLEAR_PROFILE})
    try{
        const res=await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })

    }catch(error){
        console.log(error.response)
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response.statusText,status:error.response.status
            }
        })
    }
}

//getprofiles by id
export const getProfileById=(userId)=> async dispatch =>{
    try{
        const res=await axios.get(`/api/profile/${userId}`);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }
}

//github repos
export const getGithubRepos=(username)=> async dispatch =>{
    try{
        const res=await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })

    }catch(err){
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

        const res=await axios.put('/api/profile/experience',formData,config)
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
        const res=await axios.put('/api/profile/education',formData,config)
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
                msg:error.response.statusText,status:error.response.status
            }
        })
        
    }
}

//delete experience
export const deleteExperience =id=>async dispatch =>{
    try{
        const res=await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Removed','success'));

    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }   
}

//delete education
export const deleteEducation =id=>async dispatch =>{
    try{
        const res=await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Removed','success'));

    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }   
}

//delete account & profile
export const deleteAccount =()=>async dispatch =>{
    if(window.confirm('Are you sure?This cannot be undone!')){
        try{
            const res=await axios.delete('/api/profile')
            dispatch({
                type:CLEAR_PROFILE,
                
            })
            dispatch({type:ACCOUNT_DELETED})
            dispatch(setAlert('Your Account has been permanantly deleted'));
    
        }catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{
                    msg:err.response.statusText,status:err.response.status
                }
            })
        }   
    }
    
}