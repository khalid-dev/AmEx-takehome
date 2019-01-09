import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/home/home.jsx';
import { Results } from './containers/results/index.js';
import Book from './containers/book/book.jsx';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path='/results/book=:bookId' component={Book} />
        <Route path='/results' component={Results} />
        <Route path='/' component={Home} />
      </Switch>
    );
  };
};

/**
 * CONTAINER
 */
const mapState = state => {
    return {

    };
};

const mapDispatch = dispatch => {
    return {
    };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
