import React from "react";
import styled from "styled-components";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import Message from "../utils/Message";
const ChatPanel = () => {
  return (
    <ChatPanelWrapper className="panel">
      <div className="chat__header">
        <div className="chat__header__details">
          <h2 className="chat__header__name">DSA one</h2>
          <div className="chat__header__ID">
            <input type="text" value="610e8b01b8353e2568228a30" readOnly />
            <MdContentCopy className="icon" />
          </div>
        </div>
        <div className="chat__header__icons">
          <AiOutlineUserAdd className="icon" />
          <MdCreate className="icon" />
        </div>
      </div>

      <div className="chat__body">
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
      </div>


      <div className="chat__input">
        <input type="text" placeholder="Type here" />
        <button className="btn btn--send">
          <IoIosSend />
        </button>
      </div>
    </ChatPanelWrapper>
  );
};

const ChatPanelWrapper = styled.aside`
  grid-area: chatPanel;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  .chat__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    &__details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    &__ID {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      input {
        border: none;
        outline: none;
        max-width: 20ch;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &__icons {
      display: flex;
      .icon {
        margin: 0 0.1em;
      }
    }
    &__name {
      font-size: 1.4rem;
      position: relative;
      padding-bottom: 0.1em;
      margin-bottom: 0.2em;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50%;
        height: 0.2rem;
        background-color: var(--clr-secondary);
      }
    }
  }

  .chat__body {
    flex: 1;
    padding:1.5em 0.5em;
    max-height:60vh;
    overflow-y: auto;
  }
  .icon {
    color: var(--clr-secondary);
    font-size: 1.1rem;
    cursor: pointer;
  }
  .chat__input {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:var(--clr-primary-bg);
    overflow: hidden;
    border-radius:10em;
   
    input {
      background-color:var(--clr-primary-bg);
      border: none;
      outline: none;
      flex: 1;
      padding:0.8em 1em;
      font-size:0.9rem;
     
    }
    .btn{
        padding:0.3em;
        font-size: 1.4rem;
        transform: rotateZ(37deg);
    }
  }
`;
export default ChatPanel;
