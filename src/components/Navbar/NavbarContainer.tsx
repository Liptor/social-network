import "./Navbar.module.css";
import { compose } from "redux";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
  return {
    friend: state.sidebar.friend
  }
}

export default compose(connect(mapStateToProps, {}))(Navbar)
