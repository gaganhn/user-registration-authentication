// @flow
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { loginAsync } from "../../../redux/actions";
const Yup = require("yup");

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Please enter a password!"),
  userName: Yup.string().required("Please enter a username!"),
});

const Login: React.FC<any> = ({
  login,
  history,
  signInSuccess,
  signInError,
}) => {
  if (signInSuccess === "Success") {
    setTimeout(() => {
      history.push("/dashboard");
    }, 0);
  }

  useEffect(() => {
    if (signInSuccess === "Success") {
      history.push("/dashboard");
    }
  }, []);

  const onSubmit = async (obj: any, actions: any) => {
    login(obj);
  };
  return (
    <>
      <h3 className="login-heading mb-4 text-primary text-uppercase">
        Welcome back!
      </h3>
      <Formik
        initialValues={{
          password: "",
          userName: "",
          remember: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, handleSubmit, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-label-group text-primary">
              <Field
                className="form-control"
                id="inputUserName"
                name="userName"
                type="text"
                placeholder="Username"
              />
              <label htmlFor="inputUserName">Username</label>
              {errors.userName && touched.userName ? (
                <div className="error-info">{errors.userName}</div>
              ) : null}
            </div>
            <div className="form-label-group text-primary">
              <Field
                name="password"
                className="form-control"
                id="inputPassword"
                type="password"
                placeholder="Password"
              />
              <label htmlFor="inputPassword">Password</label>
              {errors.password && touched.password ? (
                <div className="error-info">{errors.password}</div>
              ) : null}
            </div>
            <div className="custom-control custom-checkbox mb-3 text-secondary">
              <Field
                name="remember"
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember password
              </label>
            </div>
            {signInError && (
              <div className="error-info">username/password doesn't match</div>
            )}
            <button
              className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 align-middle"
              type="submit"
              disabled={signInSuccess === "Logging" ? true : false}
            >
              <span>Sign in</span>
              {signInSuccess === "Logging" ? (
                <div className="spinner-border text-light float-right spinner-hw"></div>
              ) : null}
            </button>
            <div className="text-center">
              <Link className="small" to="/home/sign-up">
                Create Account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    signInSuccess: state.signInSuccess,
    signInError: state.signInError,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (body: any) => {
      dispatch(loginAsync(dispatch, body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
