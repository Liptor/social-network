import SiteBar from "./SiteBar";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar
  }
};

let mapDispatchToProps = () => {
  return {

  }
}

const SiteBarContainer = connect(mapStateToProps, mapDispatchToProps)(SiteBar);

export default SiteBarContainer;
