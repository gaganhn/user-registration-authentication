// @flow
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { signUpAsync } from "../../../redux/actions";
const Yup = require("yup");

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter a Firstname!"),
  lastName: Yup.string().required("Please enter a Lastname!"),
  userName: Yup.string().required("Please enter a Username!"),
  password: Yup.string()
    .min(4)
    .max(20)
    .required("Please enter a password between 4 to 20 characters!"),
  email: Yup.string().email().required("Please enter a valid Email!"),
  gender: Yup.string().required("Please select Gender!"),
  country: Yup.string().required("Please select Country!"),
});

const SignUp: React.FC<any> = ({
  history,
  allCountries,
  signUp,
  signUpSuccess,
  signUpError,
}) => {
  const signUpSuccessFunc = () => {
    if (signUpSuccess === "Success") {
      setTimeout(() => {
        history.push("/home/login");
      }, 100);
    }
  };

  signUpSuccessFunc();

  const submithandler = async (obj: any, actions: any) => {
    signUp(obj);
  };

  useEffect(() => {
    signUpSuccessFunc();
  });

  return (
    <>
      <h3 className="login-heading mb-4">Sign Up</h3>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          email: "",
          gender: "",
          country: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={submithandler}
      >
        {({ errors, handleSubmit, touched, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-label-group">
              <Field
                name="firstName"
                type="text"
                id="inputFirstName"
                className="form-control"
                placeholder="First Name"
                required
              />
              <label htmlFor="inputFirstName">First Name</label>
              {errors.firstName && touched.firstName ? (
                <div className="error-info">{errors.firstName}</div>
              ) : null}
            </div>
            <div className="form-label-group">
              <Field
                name="lastName"
                type="text"
                id="inputLastName"
                className="form-control"
                placeholder="Last Name"
                required
              />
              <label htmlFor="inputLastName">Last Name</label>
              {errors.lastName && touched.lastName ? (
                <div className="error-info">{errors.lastName}</div>
              ) : null}
            </div>
            <div className="form-label-group">
              <Field
                name="userName"
                type="text"
                id="inputUserName"
                className="form-control"
                placeholder="User Name"
                required
              />
              <label htmlFor="inputUserName">User Name</label>
              {errors.userName && touched.userName ? (
                <div className="error-info">{errors.userName}</div>
              ) : null}
            </div>
            <div className="form-label-group">
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
            <div className="form-label-group">
              <Field
                className="form-control"
                id="inputEmail"
                name="email"
                type="text"
                placeholder="Email"
              />
              <label htmlFor="inputEmail">Email</label>
              {errors.email && touched.email ? (
                <div className="error-info">{errors.email}</div>
              ) : null}
            </div>
            <div className="form-label-group mt-2 text-center">
              <label>Gender</label>
              <div className="row">
                <div className="col">
                  <label className="form-check-label">
                    <Field
                      className="form-control"
                      type="radio"
                      name="gender"
                      value="Male"
                    />
                    Male
                  </label>
                </div>
                <div className="col">
                  <label className="form-check-label">
                    <Field
                      className="form-control"
                      type="radio"
                      name="gender"
                      value="Female"
                    />
                    Female
                  </label>
                </div>
              </div>
              {errors.gender && touched.gender ? (
                <div className="error-info">{errors.gender}</div>
              ) : null}
            </div>
            <div className="form-label-group">
              <Field
                as="select"
                name="country"
                className="form-control"
                style={{
                  borderRadius: "1.4rem",
                  height: "calc(2.5em + 0.75rem + 2px)",
                }}
              >
                {allCountries.map((country: any, index: any) => {
                  return (
                    <option
                      key={`${country.capital}${index}`}
                      value={country.name}
                    >
                      {country.name}
                    </option>
                  );
                })}
              </Field>
              {errors.email && touched.email ? (
                <div className="error-info">{errors.email}</div>
              ) : null}
            </div>
            {signUpError && <div className="error-info">{signUpError}</div>}
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
              disabled={signUpSuccess === "Signing up" ? true : false}
            >
              <span>Sign Up</span>
              {signUpSuccess === "Signing up" ? (
                <div className="spinner-border text-light float-right spinner-hw"></div>
              ) : null}
            </button>
            <div className="text-center">
              <Link className="small" to="/home/login">
                Already have an account? Log in!
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
    allCountries: state.allCountries,
    signUpSuccess: state.signUpSuccess,
    signUpError: state.signUpError,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signUp: (body: any) => {
      dispatch(signUpAsync(dispatch, body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
