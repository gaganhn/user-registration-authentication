// @flow
import React from "react";
import Router from "./Router";

import "./Home.scss";

const App: React.FC<any> = () => (
  <div className="container-fluid">
    <div className="row no-gutter">
      <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
      <div className="col-md-8 col-lg-6">
        <div className="login d-flex align-items-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-9 col-lg-8 mx-auto">
                <Router />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
