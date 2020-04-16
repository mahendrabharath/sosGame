/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Board from '../components/board/Board';


const mapStateToProps = state => ({ articles: state });
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={Board} />
        </Switch>
      </div >
    );
  }
}


export default withRouter(connect(mapStateToProps)(App));
