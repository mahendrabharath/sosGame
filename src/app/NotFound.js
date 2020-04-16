import { connect } from 'react-redux';
import { withRouter } from "react-router";
import React, { Component, PropTypes } from 'react';
import {initState} from '../Actions'
const mapStateToProps = state => {
	return { articles: state };
};

const mapDispatchToProps = dispatch => {
    return {
        initState: article => dispatch(initState(article)),
    };
  }
 const MyNotFound = (props) =>{ 
console.log('Not found prop',props.articles.error)
var ImgNotFound =  <img className='error-img' src='../../assets/images/notFound.gif'/>
var ImgTimeOut = <img className='error-img' src='../../assets/images/timeOut.gif'/>
const {error,timeOut} = props.articles;

return <div>
    { timeOut ? ImgTimeOut : ImgNotFound  }
    <h1>{ error ? error.message : ''}</h1>
    <h1>{ timeOut ? 'Time out' : ''}</h1>
    <span onClick={e=>{props.initState();props.history.push('../')}}>Back</span>
</div>
}
var NotFound = withRouter(connect(mapStateToProps,mapDispatchToProps)(MyNotFound) )
export default NotFound