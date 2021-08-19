import React from "react";
import styled from "styled-components";
const Message = () => {
  const options = {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <MessageWrapper>
      <h3 className="message__sender">Srijit Mondal</h3>
      <p className="message__desc">
        This is just a mThis is just a message for testing. This is just a
        message for tessage for testing
      </p>
      <h4 className="message__time">
        {new Intl.DateTimeFormat("en-US", options).format(new Date())}
      </h4>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.article`
  max-width:70%;
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
  .message__sender {
    font-size: 0.7rem;
    font-weight: 400;
  }
  .message__desc {
    background-color: #ffe1d194;
    padding: 0.8em;
    border-radius: 0.7em;
    border-top-left-radius: 0;
    font-size: 0.8rem;
  }
  .message__time {
    font-size: 0.7rem;
    font-weight: 500;
    align-self: flex-end;
  }
`;
export default Message;
