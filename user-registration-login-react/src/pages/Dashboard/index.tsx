// @flow
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions";

const Dashboard: React.FC<any> = ({
  userInfo,
  logOut,
  history,
  signInSuccess,
}) => {
  useEffect(() => {
    if (signInSuccess !== "Success") {
      history.push("/home/login");
    }
  }, []);

  const logOuthandler = () => {
    logOut();
    setTimeout(() => {
      history.push("/home/login");
    }, 100);
  };

  return (
    <>
      <div className="container-xl">
        <nav className="navbar navbar-light bg-primary text-light">
          <a className="navbar-brand display-4 text-light font-weight-bolder">
            Dashboard
          </a>
          <button
            onClick={logOuthandler}
            className="btn btn-danger float-right"
          >
            Logout
          </button>
        </nav>
      </div>
      <br />
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title text-uppercase text-primary">
              <strong>User</strong>
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col mb-3">
                <div className="card h-100">
                  <div className="card-body row">
                    <div className="col text-uppercase text-left font-weight-bolder text-primary">
                      First Name:
                    </div>
                    <div className="col float-left">{userInfo?.firstName}</div>
                  </div>
                </div>
              </div>
              <div className="col mb-3">
                <div className="card h-100">
                  <div className="card-body row">
                    <div className="col text-uppercase text-left font-weight-bolder text-primary">
                      Last Name:
                    </div>
                    <div className="col float-left">{userInfo?.lastName}</div>
                  </div>
                </div>
              </div>
              <div className="col mb-3">
                <div className="card h-100">
                  <div className="card-body row">
                    <div className="col text-uppercase text-left font-weight-bolder text-primary">
                      Gender:
                    </div>
                    <div className="col float-left">{userInfo?.gender}</div>
                  </div>
                </div>
              </div>
              <div className="col mb-3">
                <div className="card h-100">
                  <div className="card-body row">
                    <div className="col text-uppercase text-left font-weight-bolder text-primary">
                      Country:
                    </div>
                    <div className="col float-left">{userInfo?.country}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <div className="card h-100">
                  <div className="card-body row">
                    <div className="col text-uppercase text-left font-weight-bolder text-primary">
                      User Name:
                    </div>
                    <div className="col float-left">{userInfo?.userName}</div>
                  </div>
                </div>
              </div>
              <div className="col mb-3">
                <div className="card h-100">
                  <div className="card-body row">
                    <div className="col text-uppercase text-left font-weight-bolder text-primary">
                      Email:
                    </div>
                    <div className="col float-left">{userInfo?.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userInfo: state.userInfo,
    signInSuccess: state.signInSuccess,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
