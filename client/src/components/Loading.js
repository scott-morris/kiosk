// Libraries.

import React from 'react';
import Loader from 'react-loaders';

// Public.

const Loading = ({ error, isLoading = false, children }) => {
  if (error) {
    return <div>Error {error.message}</div>;
  } else if (isLoading) {
    return <Loader type="ball-grid-pulse" />;
  } else {
    return children;
  }
};

export default Loading;
