import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import {connect} from 'react-redux';
import {getGrpAllImages} from '../../Actions'
import { API_KEY } from "../../constants";
import {Card} from 'primereact/card';
import {Chart} from 'primereact/chart';

const mapStateToProps = state => ({group: state});

const mapDispatchToProps = dispatch => ({
  getGrpAllImages: payload => dispatch(getGrpAllImages(payload))
});



class InfiniteUsers extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
    };
  }
  
  componentDidMount() {
    const URL = 
    `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${API_KEY}&group_id=${this.props.group.selGrpId}&extras=count_comments%2Ccount_faves&per_page=1000&page=1&format=json&nojsoncallback=1`

    this.props.getGrpAllImages(URL);
  }

  render() {
    const {likes, cmts, likesGraph, cmtsGraph} = this.props.group.overViewData;

    return (
      <div>
        <div className='overview-charts'>
          <div className='likes-chart'>
          <h3 class='likes-chart-label'> Group's top 10 likes</h3>
            <Chart type="pie" data={likesGraph}  width='50%' height='100vh' />
          </div>
          <div className='comments-chart'>
          <h3 class='comments-chart-label'> Group's top 10 comments</h3>
            <Chart type="pie" data={cmtsGraph} options={{legend: {
            position: 'bottom'
        }}} width='50%' height='100vh' />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteUsers);