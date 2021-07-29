import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Textarea from "../common/FormsControl";
import {
    maxLengthCreator,
    requiredFiled,
} from "../../Utils/Validators/validator";
import {NewMessageFormType} from "./Dialogs";
import {Formik} from "formik";

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesType = Extract<keyof NewMessageFormType, string>
type PropsType = {}

const MessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType>> = (props) => {
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
    )
}

const MessageFormFormik = () => {
    return (
        <div>
            <Formik
                initialValues={{messageText: ''}}
                validate={values => {
                    const errors = {}
                    if (!values.messageText) {
                        errors.messageText = 'Required'
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.massageText)
                    ) {
                        errors.messageText = 'Invalid email address'
                    }
                    return errors
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                    })
                }}
            >

            </Formik>

        </div>
    )
}

let MessageReduxForm = reduxForm<>({form: "message"})(MessageForm)

const newMessageForm = ({sendMessage}) => {
    const addNewMessage = (values) => {
        sendMessage(values.messageText)
    }

    return (
        <div>
            <MessageReduxForm onSubmit={addNewMessage}/>
        </div>
    )
}

export default newMessageForm;
