import { actions } from "../../redux/dialogs-reducer"
import { connect } from "react-redux"
import { withAuthRedirect } from "../hoc/withAuthRedirect"
import { compose } from "redux"
import Dialogs from "./Dialogs"


let mapStateToProps = (state) => {
  return {
    dialogsData: state.messagesPage.dialogsData,
    messages: state.messagesPage.messages
  }
}

const sendMessage = actions.sendMessage

export default compose(
  connect(mapStateToProps, { sendMessage }),
  withAuthRedirect
)(Dialogs)
