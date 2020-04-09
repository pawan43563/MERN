// import React,{Fragment,useState} from 'react';
// import {Link} from 'react-router-dom';
// import {setAlert} from '../../actions/alert';
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import {register} from '../../actions/auth';

// const Register=({setAlert,register}) =>{
    
//     const [formData,setformData]=useState({
//         name:"",
//         email:"",
//         password:"",
//         password2:""
//     })
//     const {name,email,password,password2}=formData 
//     const change=(e)=>{
//         setformData({...formData,[e.target.name]:e.target.value})
//     }

//     const submit= async e=>{
//         e.preventDefault()
//         if(password2!==password){
//             setAlert("Password Not Match",'danger')
//         }else{
//             /*const newUser={name,email,password}
//             try{
//                 const config={
//                     headers:{
//                         'content-Type':'application/json'
//                     }
//                 }
//                 const body=JSON.stringify(newUser)
//                 const res=await axios.post('/api/users',body,config);
//                 console.log(res.data);
//             }catch(err){
//                 console.error(err.response.data)
//             }*/
//             register({name,email,password})
//         }
//     }
    
//     return (
//         <Fragment>
//             <h1 className="large text-primary">Sign Up</h1>
//       <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
//       <form className="form" onSubmit={submit}>
//         <div className="form-group">
//           <input type="text" onChange={change} placeholder="Name" name="name" value={name} required />
//         </div>
//         <div className="form-group">
//           <input type="email" onChange={change} placeholder="Email Address" name="email" value={email} required />
//           <small className="form-text">This site uses Gravatar so if you want a profile image, use a
//             Gravatar email</small>
//         </div>
//         <div className="form-group">
//           <input onChange={change}
//             type="password"
//             placeholder="Password"
//             name="password"
//             minLength="6"
//             value={password}
//           />
//         </div>
//         <div className="form-group">
//           <input onChange={change}
//             type="password"
//             placeholder="Confirm Password"
//             name="password2"
//             minLength="6"
//             value={password2}
//           />
//         </div>
//         <input type="submit" className="btn btn-primary" value="Register" />
//       </form>
//       <p className="my-1">
//         Already have an account? <Link to="/login">Sign In</Link>
//       </p>
//         </Fragment>
        
//     );
// };

// Register.propType = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired
// };


// export default connect(null,{setAlert,register})(Register);

// My code
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Register = ({ setAlert, register ,isAuthenticated}) => {
  const [formData, updateForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, password, email, password2 } = formData;

  const onChange = e =>
    updateForm({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not Match', 'danger', 5000);
    } else {
      register({ name, email, password });
    }
  };

  if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            // required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            // minLength='6'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            // minLength='6'
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propType = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
};

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})


export default connect(mapStateToProps, { setAlert, register })(Register);