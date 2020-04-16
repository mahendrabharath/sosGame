import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import {connect} from 'react-redux';
import {getGrpImages} from '../../Actions'
import { API_KEY, reduceDesc } from "../../constants";
import {Card} from 'primereact/card';
import {withRouter} from 'react-router';
import GalleryCard from './ImageCard';
const mapStateToProps = state => ({group: state});

const mapDispatchToProps = dispatch => ({
  getGrpImages: payload => dispatch(getGrpImages(payload))
});

// const GalleryCardComp = props => {
//   console.log('Gallery Comp ',props)
// const {farm, server, id, secret, ownername, title, views, description, dateadded,
//   count_faves, count_comments} = props.photo; 
// const imgSrc = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
// const descStr = ` <p>${description ? reduceDesc(description._content) : description}</p>`;
// const dateAdded = new Date(dateadded * 1000).toLocaleDateString();

// return <Card className='p-col-3 img-card' >
//       <div onClick={() => props.history.push('/overview')} >
//         <img className='gallery-img' src={imgSrc}/>
//         <div>
//           <h3>{title}</h3>
//           <div className='count'>Owner {ownername}</div>
//           <div className='no-of-members'>No. Views {views}</div>
//           <div className='no-of-comments'>No. Comments {count_comments}</div>
//           <div className='no-of-favs'>No. Faves {count_faves}</div>
//           <div className='description' dangerouslySetInnerHTML={{__html: descStr}}></div>
//           <div className='date-added' >Date Added : {dateAdded}</div>
//         </div>
//       </div>
//     </Card>
// }


// const GalleryCard = withRouter(GalleryCardComp)

class InfiniteImages extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      Images: [],
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadImages,
        props: {
          error,
          fetching,
          hasMore,
        },
      } = this;
      console.log('Scrolled')
      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || fetching) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadImages();
      }
    };
  }

  componentWillMount() {
    // Loads some Images on initial load
    this.loadImages();
  }

  // componentDidUpdate(preProps) {
  //  const URL = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${API_KEY}&group_id=${this.props.group.selGrpId}&extras=count_comments%2Cdescription%2Cviews%2Ccount_faves&format=json&nojsoncallback=1`

  // }

  loadImages = () => {
    // const pgNo = this.props.group.galleryPgNo;
    
    const URL = 
    `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${API_KEY}&group_id=${this.props.group.selGrpId}&extras=count_comments%2Cviews%2Cdescription%2Ccount_faves&per_page=10&page=${this.props.group.galleryPgNo + 1 }&format=json&nojsoncallback=1`

    this.props.getGrpImages(URL);
  }

  render() {
    const {error, fetching, galleryData, galleryLoad} = this.props.group;
    let GalleryLoadStatus = <h3 className='status'></h3>
    if (galleryLoad === 'SUCCESS') {
      <h3 className='status'></h3>
    } else if (galleryLoad == 'ACCESS_DENIED') {
      <h3 className='status'> {galleryLoad}</h3>
    }
    console.log(galleryData)
    return (
      <div>
        <p>Scroll down to load more!!</p>
        {GalleryLoadStatus}
        <div className='p-grid gallery-container'>
        {galleryData.map((photo, i) => <GalleryCard photo={photo} key={i}/>)}
        </div>
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {fetching &&
          <div>Loading...</div>
        }
        {!galleryData.length &&
          <div>You did it! You reached the end!</div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteImages);