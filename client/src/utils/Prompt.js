import React,{useState} from "react";
import styled from "styled-components";
import { useGlobalAppContext } from "../reducer/context";
import axios from "axios"


const Prompt = () => {
  const { dispatch, isPromptOpen,idOfDeleteTask,_id:userId } =useGlobalAppContext();
  const [disabled,setDisabled]=useState(false)
  const closePrompt = () => {
    dispatch({ type: "CLOSE__PROMPT" });
  };

  const deleteTask = async () => {
    setDisabled(true)
    try {
      const allTasks = await axios.delete(
        `http://localhost:8000/api/v1/task/${userId}`,
        { data: { taskId:idOfDeleteTask} }
      );
      dispatch({ type: "DELETE__TASKS", payload: allTasks.data });
    } catch (error) {
      dispatch({
        type: "OPEN_MODEL",
        payload: { errorMessage: error?.response.data, typeOfAlert: "danger" },
      });
      console.log(error.response.data);
    }finally{
      setDisabled(false)
    }
  };
  return (
    <PromptWrapper className={!isPromptOpen && `hide__wrapper`}>
      <PromptCard className={!isPromptOpen && `hide__component`}>
        <h2 className="prompt__text">
          You are about to <span>Delete</span> the task 
          .This action is irreverseable
        </h2>
        <div className="prompt__button__wrapper">
          <button className="btn btn--primary" onClick={deleteTask} disabled={disabled}>
            Delete
          </button>
          <button className="btn btn--secondary" onClick={closePrompt}>
            Cancel
          </button>
        </div>
      </PromptCard>
    </PromptWrapper>
  );
};

const PromptWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0 0 0/0.7);
  z-index: 3;
  transition: transform 300ms;
  display: grid;
  place-items: center;
`;

const PromptCard = styled.article`
  padding: 2em;
  border-radius: 0.5em;
  width: 80vw;
  max-width: 45ch;
  background-color: var(--clr-secondary-bg);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  transition: all 200ms ease;
  
  .prompt__button__wrapper {
    display: flex;
    margin-top: 1em;
  }
  .btn {
    margin: 0.5em 0;
    font-size: 0.9rem;
    padding: 0.3em 0.5em;
    border-radius: 0.2em;
    transition: all 300ms ease;
    &--primary {
      background-color: #ff9761;
      margin-right: 0.6em;
      &:hover {
        background-color: var(--clr-secondary);
      }
    }
    &--secondary {
      &:hover {
        background-color: var(--clr-primary-bg);
      }
    }
  }
  .prompt__text {
    font-size: 1.1rem;
    font-weight: 300;
    span {
      font-weight: 700;
      font-size: 0.8rem;
      color:#ff0f0f;
    }
  }
`;
export default Prompt;
export{PromptWrapper}