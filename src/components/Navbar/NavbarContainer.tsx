
import "./Navbar.module.css";
import { compose } from 'redux';
import { connect } from 'react-redux';
import Navbar from "./Navbar";
import { DialogsDataType } from "../../redux/type/type";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  friend: DialogsDataType[]
}

const NavbarContainer: React.FC<MapStatePropsType> = (props) => {
  return (
    <Navbar friend={props.friend} />
  )
}

let mapStateToProps = (state: AppStateType) => {
  return {
    friend: state.sidebar.friend
  }
}

export default compose(
  connect(mapStateToProps)
)(NavbarContainer);
