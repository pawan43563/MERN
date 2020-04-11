import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import {addLikes,removeLikes} from '../../actions/post'

const PostItem=({auth,addLikes,removeLikes,post:{_id,text,name,avatar,user,likes,comments,date}})=>{
    
    return <div class="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          class="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class="my-1">
        {text}
      </p>
       <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button type="button" onClick={e=>addLikes(_id)} class="btn btn-light">
        <i class="fas fa-thumbs-up"></i>{' '}
        <span>{likes.length>0 &&
        <span>{likes.length}</span>}</span>
      </button>
      <button type="button" onClick={e=>removeLikes(_id)} class="btn btn-light">
        <i class="fas fa-thumbs-down"></i>
      </button>
      <Link to={`/post/${_id}`} class="btn btn-primary">
        Discussion {' '}{comments.length>0 &&
        <span class='comment-count'>{comments.length}</span>}
      </Link>
      {!auth.loading && user===auth.user._id && (
          <button      
          type="button"
          class="btn btn-danger"
        >
          <i class="fas fa-times"></i>
        </button>
      )}
      
    </div>
  </div>

}

PostItem.propTypes={
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired

}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{addLikes,removeLikes})(PostItem)