import React from 'react';
import { Spinner as SpinnerB } from 'react-bootstrap';

const Spinner = ({ animation, variant, size, role, className }) => {
  return <SpinnerB animation={animation} variant={variant} size={size} role={role} className={className} />;
};

export default Spinner;
