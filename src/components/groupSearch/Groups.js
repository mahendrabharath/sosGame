/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {AutoComplete} from 'primereact/autocomplete';
import {groupSearch, groupSearchResults, changeGrpSearchPgNo} from '../../Actions';
import {API_KEY} from '../../constants';
import {GroupResult} from './GroupResult';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Chart} from 'primereact/chart';

const mapStateToProps = state => ({articles: state});

const mapDispatchToProps = dispatch => ({
  groupSearch: article => dispatch(groupSearch(article)),
  changeGrpSearchPgNo: article => dispatch(changeGrpSearchPgNo(article)),
  groupSearchResults: article => dispatch(groupSearchResults(article))
});

const getGrpSearchAPI = (query, pgNo) => `https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=${API_KEY}&text=${query}&per_page=10&page=${pgNo}&format=json&nojsoncallback=1`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupVal: ''
    };
  }

  componentDidMount() {
  }

  render() {
    const {grpSearchResult, grpChartData, grpResPageNo} = this.props.articles;
    const msg = this.state.groupVal.length === 0 ? <div className='search-label'>*Enter something to search</div> : ''
    return (
      <div>
        <div className='search-bar'>
        <div className='autocomplete-container'>
          <AutoComplete className='auto-complete' value={this.state.groupVal} onChange={e => this.setState({groupVal: e.value})}
            suggestions={this.props.articles.grpSuggestions} field="name" 
            completeMethod={e => {
              const URL = getGrpSearchAPI(e.query, 1);
              this.props.groupSearch(URL);
            }}
            onSelect = {e => {
              const URL = getGrpSearchAPI(e.value.name, 1);
              this.props.groupSearch(URL);
            }}
            onKeyUp={e => {
              if (e.key === 'Enter' && e.target.value.length > 0) {
                const URL = getGrpSearchAPI(e.target.value, 1);
                this.props.groupSearchResults(URL);
              }
            }} minLength={0}
          />
          </div>
          <div className='search-label'>*Hit Enter to see search result</div>
          {msg}
        </div>
        <div className='right-part'>
          <GroupResult searchResult={grpSearchResult}/>
        </div>
        <div className={grpSearchResult.length === 0 ? 'hide-pagination' : 'show-pagination'}>
        <div className='pagination-container'>
          <Button 
            icon='pi pi-angle-left'
            disabled={this.state.groupVal.length === 0 ? true : false} className="p-button-info" onClick={() => {
            const URL = `https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=${API_KEY}&text=${this.state.groupVal}&per_page=10&page=${grpResPageNo + 1}&format=json&nojsoncallback=1`;
            this.props.changeGrpSearchPgNo(URL);
          }}/>
          <InputText value={grpResPageNo}  onChange={e => {
            const URL = `https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=${API_KEY}&text=${this.state.groupVal}&per_page=10&page=${e.target.value}&format=json&nojsoncallback=1`;
            this.props.changeGrpSearchPgNo(URL);
          }}
          disabled={this.state.groupVal.length === 0 ? true : false} />
          <Button icon='pi pi-angle-right' className="p-button-info" onClick={() => {
            const URL = `https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=${API_KEY}&text=${this.state.groupVal}&per_page=10&page=${grpResPageNo - 1}&format=json&nojsoncallback=1`;
            this.props.changeGrpSearchPgNo(URL);
          }} 
          disabled={this.state.groupVal.length === 0 ? true : false}/>
          </div>
        </div>
        <div className='left-part'>
          {/* <div className='grp-count-chart'> */}
            <Chart type="polarArea" style={{marginTop:'10%'}} width='100%' height='100vh' data={grpChartData} />
          {/* </div> */}
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
