import React from 'react';
import { Form } from 'react-bootstrap';

const Dropdown = ({
  className,
  onChange = undefined,
  disabled = false,
  options = [],
  fieldName,
  id
}) => {
  return (
    <Form.Group>
      <Form.Control
        id={id}
        as="select"
        className={className}
        onChange={onChange}
        disabled={disabled}
      >
        <option>Please Select {fieldName}</option>
        {options.map((item) => (
          <option>{item}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default Dropdown;
