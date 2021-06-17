import React from 'react';
import { pure } from 'recompose';

const SVGComponent = () => {
  const { children, ...rest } = props;
  return <svg {...rest}>{children}</svg>;
}

export default pure(SVGComponent);
