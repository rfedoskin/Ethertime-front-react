import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes, RouteWithSubRoutes } from '../../routes';
import Header from '../Header';
import ProgressBar from '../../components/ProgressBar';

import styles from './app.module.scss';
import HeaderPadding from '../Header/HeaderPadding';
import LoadingText from '../../components/LoadingText';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'APP_LOAD' });
  }

  render() {
    const { isAppLoaded } = this.props;

    return (
      <>
        {isAppLoaded ? (
          <Router>
            <Header />
            <HeaderPadding />
            {routes.map(route => (
              <RouteWithSubRoutes key={route.key} {...route} />
            ))}
          </Router>
        ) : (
          <div className={styles.appLoader}>
            <LoadingText />
            <ProgressBar spinner width="60" height="60" />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ appReducer }) => {
  return {
    isAppLoaded: appReducer.isAppLoaded,
  };
};

export default connect(mapStateToProps)(App);
