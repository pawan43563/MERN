import axios from 'axios'
import {setAlert} from './alert'
import {GET_POSTS,POST_ERROR,UPDATE_LIKES} from './types'

//get posts
export const getPosts=()=>async dispatch=>{
    try{
        const res=await axios.get('/api/posts')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }
}

//addlike
export const addLikes=(id)=>async dispatch=>{
    try{
        const res=await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    }catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }
}

//remove likes
export const removeLikes=(id)=>async dispatch=>{
    try{
        console.log(id)
        const res=await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    }catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{
                msg:err.response.statusText,status:err.response.status
            }
        })
    }
}