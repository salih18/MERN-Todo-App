import React from 'react';
import { Button as ButtonB } from 'react-bootstrap';
import Icon from './Icon';

export default function Button({
  id,
  text,
  disabled = false,
  onClick = undefined,
  type = 'button',
  className,
  variant,
  color,
  icon,
  size
}) {
  return (
    <ButtonB
      id={id}
      disabled={disabled}
      onClick={onClick}
      type={type}
      variant={variant}
      size={size}
      color={color}
      className={className}
    >
      {icon && <Icon icon={icon} />}
      <span>{text}</span> 
    </ButtonB>
  );
}
