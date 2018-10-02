import { Types, heroku, local } from "../Types";
import { get } from "http";

export const sendMessage = messageItem => dispatch => {
  console.log("message item", messageItem);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: messageItem.text,
      touserid: messageItem.toOwnerId,
      fromuserid: messageItem.fromUserId
    })
  };
  console.log("request options", requestOptions);

  fetch(heroku + "/message", requestOptions)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: Types.NEW_MESSAGE,
        message: messageItem
      });
      dispatch(getAllMessages());
    });
};

export const getAllMessages = () => dispatch => {
  fetch(heroku + "/message")
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: Types.GET_MESSAGES,
        payload: data
      });
    });
};
