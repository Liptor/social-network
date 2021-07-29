import { actions } from "../../redux/dialogs-reducer"
import { connect } from "react-redux"
import { withAuthRedirect } from "../hoc/withAuthRedirect"
import { compose } from "redux"
import Dialogs from "./Dialogs"
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsData: state.messagesPage.dialogsData,
    messages: state.messagesPage.messages
  }
}

export default compose(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs) as React.ComponentType
