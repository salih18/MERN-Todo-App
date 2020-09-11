import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../redux/hooks";

const Landing = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large m-2">Todo App</h1>
          <p className="lead m-2">
            Create todos and manage them easily.
          </p>
          <div className="buttons m-4">
            <Link to="/register" className="btn btn-primary m-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light m-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
