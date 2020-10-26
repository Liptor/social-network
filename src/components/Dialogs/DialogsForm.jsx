import React from "react";
import { Field, reduxForm } from "redux-form";
import Textarea from "../common/FormsControl";
import {
  maxLengthCreator,
  requiredFiled,
} from "../../Utils/Validators/validator";

const maxLength50 = maxLengthCreator(50);

const MessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="messageText"
          validate={[requiredFiled, maxLength50]}
          className="form-control col-md-10"
        />
      </div>
      <button className="btn btn-light">Send</button>
    </form>
  );
};

let MessageReduxForm = reduxForm({ form: "message" })(MessageForm);

const newMessageForm = ({ sendMessage }) => {
  const addNewMessage = (values) => {
    sendMessage(values.messageText);
  };

  return (
    <div>
      <MessageReduxForm onSubmit={addNewMessage} />
    </div>
  );
};

export default newMessageForm;
