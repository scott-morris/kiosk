// Public.

const getClassNames = (...classNames) =>
  classNames.filter((className = className !== '')).join(' ');

export default getClassNames;
