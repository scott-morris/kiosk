// Libraries.

import React, { useEffect, useState } from 'react';

// Dependencies.

import getClassNames from '../data/get-class-names';

// Styles.

import './Switcher.scss';

// Public.

const Switcher = ({ seconds, className, children }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const newIndex = index + 1 < React.Children.count(children) ? index + 1 : 0;
      setIndex(newIndex);
    }, seconds * 1000);
  }, [index, seconds, className, children]);

  return (
    <div className={getClassNames('switcher', className)}>
      {React.Children.map(children, (child, i) => {
        return i === index
          ? child
          : React.cloneElement(child, {
              className: 'switcher-hide',
            });
      })}
    </div>
  );
};

export default Switcher;
