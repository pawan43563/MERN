import React,{Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Login=({login,isAuthenticated})=>{
    
    const [formData,setformData]=useState({
        email:"",
        password:""

    })
    const {email,password}=formData
    function change(e){
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const submit= async e=>{
        e.preventDefault()
        login(email,password)
    }
    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={submit}>
        
        <div className="form-group">
          <input type="email" onChange={change} placeholder="Email Address" name="email" value={email} required />
          
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
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
        </Fragment>
        
    )
}

Login.propType = {
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);