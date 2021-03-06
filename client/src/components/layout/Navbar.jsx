import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import  {logout}  from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const  Navbar=({auth:{isAuthenticated,loading},logout})=>{

    const authlinks=(
      <ul>
        <li> 
           <Link to="/posts">Posts</Link></li>
        <li></li>
        <li> 
           <Link to="/profiles">Developers</Link></li>
        <li></li>
         <li> <i className="fas fa-user" />{' '}
           <Link to="/dashboard"><span className="hide-sm">Dashboard</span></Link></li>
        <li><a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
          </a>
          </li>

      </ul>
    );
    const guestlinks=(
      <ul>
        <li> 
           <Link to="/profiles">Developers</Link></li>
        <li></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> Social.Net</Link>
      </h1>
    {!loading && (<Fragment>{isAuthenticated ? authlinks:guestlinks}</Fragment>)}
    </nav>
    )
}


Navbar.propType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps=state=>({
  auth:state.auth
})


export default connect(mapStateToProps,{logout})(Navbar);