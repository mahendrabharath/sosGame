/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Board from '../components/board/Board';
import GetUserDetails from '../components/getUserDetails/GetUserDetails';
import GsapModal from '../components/Modal/Modal';


const mapStateToProps = state => ({ gameData: state });
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.gameData.name)
      this.props.history.push('/setup');
  }

  render() {
    return (
      <div>
        <GsapModal />
        {/* <Switch>
          <Route path='/' exact component={Board} />
          <Route path='/setup' exact component={GetUserDetails} />
        </Switch> */}
      </div >
    );
  }
}


export default withRouter(connect(mapStateToProps)(App));
