import React from 'react';
import PropTypes from 'prop-types';
import { RouteWithSubRoutes } from '../../routes';

const IndexPage = ({ routes }) => (
  <>
    {routes.map(route => (
      <RouteWithSubRoutes key={route.key} {...route} />
    ))}
  </>
);

IndexPage.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default IndexPage;
