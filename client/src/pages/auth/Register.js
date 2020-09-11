import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './../../redux/hooks';

import Input from './../../atoms/Input';
import Button from './../../atoms/Button';
import { Form } from 'react-bootstrap';

const Register = () => {
  const { registerUser, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      registerUser({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <Form>
        <Input
          label="Name"
          id="register-name"
          type="text"
          value={name}
          name="name"
          onChange={(e) => onChange(e)}
          placeholder="Name"
          autoComplete="off"
        />
        <Input
          label="Email"
          id="register-email"
          type="email"
          value={email}
          name="email"
          onChange={(e) => onChange(e)}
          placeholder="Email Address"
          required
          autoComplete="off"
        />

        <Input
          label="Password"
          id="register-password"
          type="password"
          value={password}
          name="password"
          onChange={(e) => onChange(e)}
          placeholder="Create a password"
          autoComplete="off"
          minLength="6"
        />
        <Input
          label="Password"
          id="register-password-2"
          type="password"
          value={password2}
          name="password2"
          onChange={(e) => onChange(e)}
          placeholder="Confirm Password"
          autoComplete="off"
          minLength="6"
        />

        <Button
          variant="primary"
          text="Register"
          onClick={(e) => onSubmit(e)}
          color="white"
          type="submit"
          className={`float-right`}
          id="user-register-button"
        />
      </Form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
