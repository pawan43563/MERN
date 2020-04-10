import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'
import {addEducation} from '../../actions/profile'
import {Link,withRouter} from 'react-router-dom'

const AddEducation=()=>{
    return(
        <Fragment>
            
        </Fragment>
    )
}


AddEducation.propTypes={
    addEducation:Proptypes.func.isRequired
}

const mapStateToProps={

}

export default connect(null,{addEducation})(AddEducation)