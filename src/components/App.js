import React from 'react';
import Header from './Header';

// eslint-disable-next-line
export default ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
};
