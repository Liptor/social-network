import React from "react";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import MessageForm from "./DialogsForm";

const Dialogs = ({ dialogsData, messages, sendMessage }) => {
  //  props = messagesPage = { messages: '', dialogsData: '', newMessText: ''};
  let dialogsElements = dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ));

  let messagesElements = messages.map((mess) => (
    <Message message={mess.message} key={mess.id} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <MessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
