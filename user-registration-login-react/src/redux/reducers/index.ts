import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_ALL_COUNTRIES,
  LOG_OUT,
} from "../actionTypes";

let initialState: any;

const appState: any = JSON.parse(localStorage.getItem("appState")!);
if (appState !== null) {
  initialState = appState;
} else {
  initialState = {
    userInfo: {
      userName: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      country: "",
    },
    token: "",
    allCountries: [],
    signInSuccess: "",
    signInError: "",
    signUpSuccess: "",
    signUpError: "",
  };
}

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOGIN_SUCCESS: {
      const newState = {
        ...state,
        signInSuccess: action.payload,
        signInError: "",
      };

      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }
    case LOGIN_ERROR: {
      const newState = {
        ...state,
        signInSuccess: "",
        signInError: action.payload,
      };

      localStorage.removeItem("appState");
      return newState;
    }
    case SIGNUP_SUCCESS: {
      const newState = {
        ...state,
        signUpSuccess: action.payload,
        signUpError: "",
      };

      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }
    case SIGNUP_ERROR: {
      const newState = {
        ...state,
        signUpSuccess: "",
        signUpError: action.payload,
      };

      localStorage.removeItem("appState");
      return newState;
    }
    case SIGNUP: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ALL_COUNTRIES: {
      return {
        ...state,
        allCountries: action.payload,
      };
    }
    case LOG_OUT: {
      localStorage.removeItem("appState");
      return {
        ...state,
        userInfo: {
          userName: "",
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          gender: "",
          country: "",
        },
        token: "",
        signInSuccess: "",
        signInError: "",
        signUpSuccess: "",
        signUpError: "",
      };
    }
    default:
      return state;
  }
}
