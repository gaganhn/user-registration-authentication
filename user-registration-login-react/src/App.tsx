// @flow
import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import { getAllCountriesAsync } from "./redux/actions";
import { connect } from "react-redux";
import "./App.scss";

const App: React.FC<any> = ({ getAllCountries }) => {
  useEffect(() => {
    getAllCountries();
  }, []);

  return <AppRouter />;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllCountries: () => dispatch(getAllCountriesAsync(dispatch)),
  };
};
export default connect(null, mapDispatchToProps)(App);
