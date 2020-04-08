import axios from 'axios';
import {REGISTER_SUCCESS,REGISTER_FAIL} from './types';
import {setAlert} from './alert';

//Regiter User
// export const register=({name,email,password})=>async dispatch=>{

//                 const config={
//                     headers:{
//                         'Content-Type':'application/json'
//                     }
//                 }
//                 const body=JSON.stringify({name,email,password})
//         try{
//             const res=await axios.post('/api/users',body,config);
//             dispatch({
//                 type:REGISTER_SUCCESS,
//                 payload:res.data
//             });
//         }catch(err){
//             const errors=err.response.data.errors;
//             if(errors){
//                 errors.forEach(error=>{
//                     dispatch(
//                         setAlert(error.msg,'danger')
//                     )
//                 })
//             }
//             dispatch({
//                 type:REGISTER_FAIL
//             })
//         }   
                

// }

// My Register
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    const body = JSON.stringify({
      name,
      email,
      password
    });
  
    try {
        console.log("Before Req")
      const res = await axios.post("/api/users", body, config);
      console.log("After Req",res)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert("Registration Successful", "success", 5000));
    } catch (error) {
        console.log(error.response)
      const err = error.response.data.errors;
  
      if (err)
        err.forEach(error => {
          dispatch(setAlert(error.msg, "danger", 5000));
        });
  
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };