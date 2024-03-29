import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { Route, BrowserRouter, withRouter } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/LoginContainer";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/app-reducer";
import { AppStateType } from "./redux/redux-store";
import NavbarContainer from "./components/Navbar/NavbarContainer";

type AddType = {
  initializeApp: () => void;
  initialized: boolean;
  store: AppStateType;
  pageTitle: string;
};

const App: React.FC<AddType> = ({ initializeApp, initialized }) => {
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <NavbarContainer />
        <div className="app-wrapper-content">
          <Route path="/dialogs" component={DialogsContainer} />
          <Route path="/profile/:userId?" component={ProfileContainer} />
          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/login" component={LoginPage} />
          <Route path="/settings" component={Settings} />
          <Route path="/users" component={UsersContainer} />
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
