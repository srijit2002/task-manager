import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalAppContext } from "../reducer/context";
import { PageWrapper } from "./Register";
import { Form, Button } from "./Register";
import instance from "../axios";

const SingleTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskdetails, setTaskDetails] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const { tasks, _id: userId, dispatch } = useGlobalAppContext();
  const { taskId } = useParams();
  const history = useHistory();
  const redirectToHomePage = (e) => {
    e.preventDefault();
    history.push("/");
  };
  useEffect(() => {
    const [{ title, details, dueDate }] = tasks.filter(
      (task) => task._id === taskId
    );
    const newDate = new Date(parseInt(dueDate));
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const date = newDate.getDate();
    const formattedNewDate = `${year}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
    setTaskTitle(title);
    setTaskDetails(details);
    setTaskDueDate(formattedNewDate);
  }, [taskId, tasks]);

  const saveEditedTask = async (e) => {
    e.preventDefault();
    const [{ roomCode, _id, isCompleted }] = tasks.filter(
      (task) => task._id === taskId
    );
    const year = taskDueDate.slice(0, 4);
    const month = taskDueDate.slice(5, 7);
    const day = taskDueDate.slice(8, 11);
    const configuredDate = new Date(`${month}/${day}/${year}`).getTime();
    const newTaskModel = {
      _id,
      details: taskdetails,
      dueDate: configuredDate,
      isCompleted,
      roomCode,
      title: taskTitle,
    };
    try {
      const newTasks = await instance.patch(
        `/api/v1/task/${userId}`,
        newTaskModel
      );
      history.push("/");
      if (newTasks) dispatch({ type: "EDIT__TASKS", payload: newTasks.data });
    } catch (error) {
      dispatch({
        type: "OPEN_MODEL",
        payload: {
          errorMessage: error?.response?.data?.message || "Some error occured",
          typeOfAlert: "danger",
        },
      });
    }
  };

  return (
    <PageWrapper>
      <TaskCard>
        <Form className="form" onSubmit={saveEditedTask}>
          <div className="form__inputs">
            <label htmlFor="title">Title of the task</label>
            <input
              required
              type="text"
              id="title"
              className="task__title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="form__inputs">
            <label htmlFor="due-date">Due date of the task</label>
            <input
              type="date"
              id="due-date"
              className="task__due-date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />
          </div>
          <div className="form__inputs">
            <label htmlFor="details">Description of the task</label>
            <textarea
              id="details"
              className="task__details"
              value={taskdetails}
              onChange={(e) => setTaskDetails(e.target.value)}
            />
          </div>
          <div className="button__wrapper">
            <Button className="btn btn--primary" type="submit">
              Save
            </Button>
            <Button className="btn btn--secondary" onClick={redirectToHomePage}>
              Cancel
            </Button>
          </div>
        </Form>
      </TaskCard>
    </PageWrapper>
  );
};

const TaskCard = styled.article`
  width: 80vw;
  max-width: 600px;
  background-color: var(--clr-secondary-bg);
  padding: 3em;
  min-height: 80vh;
  box-shadow: 0 0 10px 3px #d7d7d7;
  border-radius: 0.2em;
  label {
    font-size: 0.8rem;
    @media (max-width: 694px) {
      font-size:0.6rem;
    }
  }
  .form {
    input,textarea {
    @media (max-width: 694px) {
      font-size:0.8rem;
    }
  }
    &__inputs:nth-child(even) {
      margin: 0.7em 0;
    }
  }

  .button__wrapper {
    display: flex;
    .btn {
      font-size: 1rem;
      padding: 0.3em 0.75em;
      min-width: 8ch;
      transition: all 350ms;
      &--primary {
        margin-right: 1em;
        &:hover {
          filter: saturate(90%);
        }
      }
      &--secondary {
        color: var(--clr-secondary);
        background-color: transparent;
        background-color: var(--clr-primary-bg);
        &:hover {
          filter: brightness(102%);
        }
      }
    }
  }
  .task__details {
    height: 20vw;
    min-height: 200px;
    resize: none;
  }

  @media (max-width: 694px) {
    padding: 1.5em;
  }
 
`;

export default SingleTask;
