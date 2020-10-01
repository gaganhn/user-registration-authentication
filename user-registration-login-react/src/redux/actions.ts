import {
  LOGIN,
  SIGNUP,
  GET_ALL_COUNTRIES,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOG_OUT,
} from "./actionTypes";
import axios from "axios";

export const login = (content: any) => ({
  type: LOGIN,
  payload: content,
});

export const loginError = (content: any) => ({
  type: LOGIN_ERROR,
  payload: content,
});

export const loginSuccess = (content: any) => ({
  type: LOGIN_SUCCESS,
  payload: content,
});

export const loginAsync = (dispatch: any, body: any) => {
  dispatch(loginSuccess("Logging"));
  axios
    .post(process.env.REACT_APP_BASE_URL + "signin", body)
    .then((res: any) => {
      dispatch(login(res.data));
      dispatch(loginSuccess("Success"));
    })
    .catch((error: any) => {
      dispatch(loginError(error));
      console.log("loginAsync -> err", error);
    });
  return {
    type: "LOGIN_ASYNC",
    payload: null,
  };
};

export const signUp = (content: any) => ({
  type: SIGNUP,
  payload: content,
});

export const signUpSuccess = (content: any) => ({
  type: SIGNUP_SUCCESS,
  payload: content,
});

export const signUpError = (content: any) => ({
  type: SIGNUP_ERROR,
  payload: content,
});

export const signUpAsync = (dispatch: any, body: any) => {
  dispatch(signUpSuccess("Signing up"));
  axios.post(process.env.REACT_APP_BASE_URL + "signup", body).then(
    (res: any) => {
      dispatch(signUp(res.data));
      dispatch(signUpSuccess("Success"));
    },
    (err: any) => {
      console.log("signUpAsync -> err", err.response.data.msg);
      dispatch(signUpError(err.response.data.msg));
    }
  );
  return {
    type: "SIGNUP_ASYNC",
    payload: null,
  };
};

export const getAllCountries = (countries: any) => ({
  type: GET_ALL_COUNTRIES,
  payload: countries,
});

export const getAllCountriesAsync = (dispatch: any) => {
  axios
    .get(
      "https://restcountries.eu/rest/v2/all?fields=name;capital;region;subregion;"
    )
    .then(({ data }: any) => {
      dispatch(getAllCountries(data));
    })
    .catch((err: any) => {
      console.log("getAllCountries -> err", err);
    });
  return {
    type: "GET_ALL_COUNTRIES_SYNC",
    payload: null,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: null,
  };
};
