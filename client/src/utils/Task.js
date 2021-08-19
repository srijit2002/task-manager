import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useGlobalAppContext } from "../reducer/context";
import axios from "axios";
import { GrCompliance } from "react-icons/gr";
import { Link } from "react-router-dom";

const Task = ({ _id, details, dueDate, isCompleted, roomCode, title }) => {
  const [taskDueDate, setTaskDueDate] = useState();
  const { _id: userId, dispatch } = useGlobalAppContext();
  useEffect(() => {
    const getDateLeft = () => {
      var Difference_In_Time = parseInt(dueDate) - new Date().getTime();
      var Difference_In_Days = Math.floor(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      setTaskDueDate(
        isNaN(Difference_In_Days) ? dueDate :(Difference_In_Days<0)?`Due date was ${Math.abs(Difference_In_Days)} day before`:`${Difference_In_Days} days left`
      );
    };
    getDateLeft();
  }, [dueDate]);

  const deleteTask = async (_id) => {
    dispatch({ type: "OPEN__PROMPT", payload: _id });
  };

  const toggleComplete=async()=>{
     const oldTask={_id, details, dueDate, isCompleted:!isCompleted, roomCode, title};
    try {
      const newTasks=await axios.patch(`http://localhost:8000/api/v1/task/${userId}`,oldTask)
      dispatch({type:"EDIT__TASKS",payload:newTasks.data})
    } catch (error) {
      console.log(error.response);
      dispatch({type:"OPEN_MODEL",payload:{errorMessage:error?.response?.data?.message||"Some error occured",typeOfAlert:"danger"}})
    }
  }

  return (
    <TaskWrapper className={(isCompleted)&&`completed`} style={{order:(isCompleted)?4:-1}}>
      <div className="task__details">
        <h2 className="task__heading">
          {title}
          <GrCompliance className={(isCompleted)?`completed icon__complete`:`icon__complete`} />
        </h2>
        <p className="task__para">{details}</p>
        <div className="button__container" onClick={toggleComplete}>
          <button className="btn">
            {isCompleted ? `Mark as uncompleted` : `Mark as completed`}
          </button>
          <button className="btn btn--secondary">View progress</button>
        </div>
      </div>

      <div className="icon__container">
        <Link to={`/task/${_id}`}>
          <AiOutlineEdit className="icon icon--edit" />
        </Link>
        <button onClick={() => deleteTask(_id)}>
          <AiOutlineDelete className="icon icon--delete" />
        </button>
      </div>
      <h5 className="task__due">{taskDueDate}</h5>
    </TaskWrapper>
  );
};
const TaskWrapper = styled.article`
  background-color: var(--clr-secondary-bg);
  min-width: 35ch;
  padding: 1.5em;
  position: relative;
  border-radius: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  height: fit-content;
  box-shadow:0 0 10px 3px #d7d7d7;
  .icon__container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 10%;
    right: 7%;
    button {
      margin: 0 0.2em;
    }
    .icon {
      font-size: 1.2rem;

      &--edit {
        color: #2cf72c;
      }
      &--delete {
        color: #f57070;
      }
    }
  }
  .task__heading {
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .task__para {
    font-size: 0.8rem;
    font-weight: 300;
    color: #a0a3b0;
    margin: 0.5em 0;
    line-height: 1.3;
  }
  .btn {
    background-color: #ffe1d194;
    padding: 0.4em;
    margin: 0;
    border-radius: 0.2em;
    color: var(--clr-secondary);
    transition: background-color 200ms;

    &:hover {
      background-color: #ffddca;
    }
    &--secondary {
      background-color: var(--clr-btn-secondary);
      color: #3cbfe0;
      margin-left: 0.5em;
      &:hover {
        background-color: #ceffe8;
      }
    }
  }
  .task__due {
    font-size: 0.68rem;
    font-weight: 300;
    color: #a0a3b0;
    margin-top: 1em;
  }
  .button__container {
    display: flex;
    justify-content: flex-start;
  }
  .icon__complete {
    margin-left: 0.5em;
  }

`;
export default Task;
// #2cf72c
