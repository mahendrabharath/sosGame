import React, { Component } from "react";
import {connect} from 'react-redux';
import {getGrpImages} from '../../Actions'
import { reduceDesc } from "../../constants";
import {Card} from 'primereact/card';
import {withRouter} from 'react-router';

const mapStateToProps = state => ({group: state});

const mapDispatchToProps = dispatch => ({
  getGrpImages: payload => dispatch(getGrpImages(payload))
});

class GalleryCard extends Component {
    constructor(props) {
        super(props);
        this.state ={
          showLoader: true,
        }
    }

    render () {
  console.log('Gallery Comp ',this.props)
const {farm, server, id, secret, ownername, title, views, description, dateadded,
  count_faves, count_comments} = this.props.photo; 
const imgSrc = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
const descStr = ` <p>${description ? reduceDesc(description._content) : description}</p>`;
const dateAdded = new Date(dateadded * 1000).toLocaleDateString();
const {showLoader} = this.state;
const loader = showLoader ? <div class="lds-hourglass"></div> : '';
return <Card className='p-col-3 img-card' >
      <div onClick={() => this.props.history.push('/overview')} >
        <img className='gallery-img' src={imgSrc} onLoad={e => {
          console.log('imaged',e);
        this.setState({showLoader: false})
    }}/>
        {loader}
        <div>
          <h3>{title}</h3>
          <div className='count'>Owner {ownername}</div>
          <div className='no-of-members'>No. Views {views}</div>
          <div className='no-of-comments'>No. Comments {count_comments}</div>
          <div className='no-of-favs'>No. Faves {count_faves}</div>
          <div className='description' dangerouslySetInnerHTML={{__html: descStr}}></div>
          <div className='date-added' >Date Added : {dateAdded}</div>
        </div>
      </div>
    </Card>
}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (GalleryCard))
