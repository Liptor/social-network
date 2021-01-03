import SiteBar from "./SiteBar";
import { connect } from "react-redux";

let mapStateToProps = (state: any) => {
  return {
    sidebar: state.sidebar
  }
};

const SiteBarContainer = connect(mapStateToProps)(SiteBar);

export default SiteBarContainer;
