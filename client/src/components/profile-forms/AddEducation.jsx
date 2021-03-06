import React, { Fragment ,useState} from 'react'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'
import {addEducation} from '../../actions/profile'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
const AddEducation=({addEducation,history})=>{

    const [formData,setformdata]=useState({
        school:'',
        degree:'',
        from:'',
        to:'',
        current:false,
        description:'',
        fieldofstudy:''
    })

    const [todatedisable,toggledisaable]=useState(false)

    const {fieldofstudy,school,from,to,description,current,degree}=formData
    

    function onChange(e){
        return setformdata({...formData,[e.target.name]:e.target.value})
    }

    return(
        <Fragment>
            <h1 className="large text-primary">
       Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>{
          e.preventDefault()
          addEducation(formData,history)
      }}>
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree"  value={degree} onChange={e=>onChange(e)} name="degree" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of Study"  value={fieldofstudy} onChange={e=>onChange(e)} name="fieldofstudy" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e=>onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" checked={current} name="current" value={current} onChange={e=>{
              setformdata({...formData,current:!current});
              toggledisaable(!todatedisable)
          }} />{' '} Current School</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"  value={to} onChange={e=>onChange(e)} disabled={todatedisable?'disabled':''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}


addEducation.propTypes={
    addEducation:Proptypes.func.isRequired
}



export default connect(null,{addEducation})(withRouter(AddEducation))