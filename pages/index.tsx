import React from 'react';
import { withApollo } from 'src/hooks/withApollo';

export const HomePage = () => {
  return <h1>Index page</h1>;
};

export default withApollo(HomePage);
