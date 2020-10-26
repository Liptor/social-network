import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  requiredFiled,
  maxLengthCreator,
} from "../../../Utils/Validators/validator";
import Textarea from "../../common/FormsControl";

const maxLength10 = maxLengthCreator(10);

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          className="form-control col-md-10"
          type="text"
          component={Textarea}
          placeholder="Enter your post"
          name="newPostText"
          validate={[requiredFiled, maxLength10]}
        />
      </div>
      <button className="btn btn-light">Add post</button>
    </form>
  );
};

let PostReduxForm = reduxForm({ form: "post" })(PostForm);

const newPostForm = (props) => {
  const onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div>
      <PostReduxForm onSubmit={onAddPost} />
    </div>
  );
};

export default newPostForm;
