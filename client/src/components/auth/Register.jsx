import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
function Register(){
    
    const [formData,setformData]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    })
    const {name,email,password,password2}=formData
    function change(e){
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const submit= async e=>{
        e.preventDefault()
        if(password2!==password){
            console.log("Password Not Match")
        }else{
            /*const newUser={name,email,password}
            try{
                const config={
                    headers:{
                        'content-Type':'application/json'
                    }
                }
                const body=JSON.stringify(newUser)
                const res=await axios.post('/api/users',body,config);
                console.log(res.data);
            }catch(err){
                console.error(err.response.data)
            }*/
            console.log(formData)
        }
    }
    
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <input type="text" onChange={change} placeholder="Name" name="name" value={name} required />
        </div>
        <div className="form-group">
          <input type="email" onChange={change} placeholder="Email Address" name="email" value={email} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input onChange={change}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
          />
        </div>
        <div className="form-group">
          <input onChange={change}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
        
    )
}

export default Register;