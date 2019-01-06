import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/home/home.jsx';
import { Results } from './containers/results/index.js';

/**
 * COMPONENT
 */
class Routes extends Component {

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* <Route path="/xyz" component={something} /> */}
        {/* Displays our something component as a fallback */}
        <Route path='/results' component={Results} />
        <Route path='/' component={Home} />
        <Route component={() => <h1> Hi!!!! </h1>} />
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
