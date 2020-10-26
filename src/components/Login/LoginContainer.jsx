import React from "react";
import { reduxForm, Field } from "redux-form";
import { Input } from "../common/FormsControl";
import { requiredFiled } from "../../Utils/Validators/validator";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import style from "../common/FormsControl.module.css";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <Field
          placeholder={"Login"}
          name={"email"}
          component={Input}
          validate={[requiredFiled]}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          type={"password"}
          validate={[requiredFiled]}
          className="form-control"
        />
      </div>
      <div className="form-chekbox">
        <Field
          component={Input}
          name={"rememberMe"}
          type={"checkbox"}
          validate={[requiredFiled]}
          className="form-check-input"
        />
        <label class="form-check-label" for="defaultCheck1">
          remember me
        </label>
      </div>
      {props.error && (
        <div className={style.formSummuryError}>{props.error}</div>
      )}
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>Login
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
