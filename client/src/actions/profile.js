import axios from 'axios';
import {setAlert} from './alert';
import {GET_PROFILE,PROFILE_ERROR} from './types';

export const getCurrentProfile=()=> async dispatch =>{
    console.log("2yes")
    try{
        console.log("before req")
        const res=await axios.get('/api/profile/me');
        console.log(res)
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