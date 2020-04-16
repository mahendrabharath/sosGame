/* eslint-disable react/prop-types */
import React from 'react';
import {Card} from 'primereact/card';
import {connect} from 'react-redux';
import {selectGrpId} from '../../Actions';
import {withRouter} from 'react-router';

const mapDispatchToProps = dispatch => ({
  selectGrpId: payload => dispatch(selectGrpId(payload))
});

const GroupResultComp = props => {
  // let res = <div>
  //   <h3>No results</h3>
  // </div>;
  // if (props.searchResult.length > 0) {
  const res = props.searchResult.map((arg, i) => <div key={i} className='result-card'
    onClick={() => {
      props.history.push('/gallery');
      props.selectGrpId({grpId: arg.nsid});
    }}>
    <Card className='p-col-3' title={arg.name}>
      <div>
        <img className='grp-img' 
        src={`http://farm${arg.iconfarm}.staticflickr.com/${arg.iconserver}/buddyicons/${arg.nsid}.jpg`}
      onError={e => e.target.src = 'https://i.stack.imgur.com/34AD2.jpg'}
        />
        <div>
          <div className='count'>No. of Views {arg.pool_count}</div>
          <div className='no-of-members'>No. of Mombers {arg.members}</div>
        </div>
      </div>
    </Card>
  </div>);
  // }
  return <div className='p-grid search-result'>
    {res}
  </div>;
};

export const GroupResult = withRouter(connect(null, mapDispatchToProps)(GroupResultComp));
