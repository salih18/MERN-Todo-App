import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function Input({
  id,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
  onChange = undefined,
  onClick = undefined,
  onBlur = undefined,
  onKeyDown = undefined,
  plaintext = false,
  readOnly = false,
  className,
  pClassName,
  value,
  disabled = false,
  as,
  label,
  size,
  controlId,
  children,
  error,
  inputTextLeft,
  inputTextRight,
  inputTextRightOnClick,
  minLength
}) {
  return (
    <Form.Group className={pClassName} controlId={controlId}>
      <Form.Label>
        {label}
        {error}
      </Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          {inputTextLeft && (
            <InputGroup.Text className="py-0">{inputTextLeft}</InputGroup.Text>
          )}
        </InputGroup.Prepend>
        <Form.Control
          as={as}
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className={className}
          disabled={disabled}
          size={size}
          value={value}
          readOnly={readOnly}
          plaintext={plaintext}
          autoComplete={autoComplete}
          minLength={minLength}
        >
          {children}
        </Form.Control>
        <InputGroup.Prepend onClick={inputTextRightOnClick}>
          {inputTextRight && (
            <InputGroup.Text className="py-0">{inputTextRight}</InputGroup.Text>
          )}
        </InputGroup.Prepend>
      </InputGroup>
    </Form.Group>
  );
}
