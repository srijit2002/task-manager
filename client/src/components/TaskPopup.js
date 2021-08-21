import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalAppContext } from "../reducer/context";
import instance from "../axios";
import { Form,Button} from "../pages/Register";
const TaskPopup = () => {
  const { isTaskPopupOpen, taskMode, dispatch, _id } = useGlobalAppContext();
  const closeTaskPopup = (e) => {
    e.preventDefault();
    dispatch({ type: "CLOSE__TASK__POPUP" });
  };
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [disabled, setDisabled] = useState(false);
  const createTask = async (e) => {
    e.preventDefault();
    setDisabled(state=> !state)
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 11);
    const dueDate = new Date(`${month}/${day}/${year}`).getTime();
    const newTask = { title, details, dueDate };
    try {
      const allTasks = await instance.post(`/api/v1/task/${_id}`, newTask);
      dispatch({ type: "ADD__TASKS", payload: allTasks.data.data });
    } catch (error) {
      setDisabled(state=> !state)
      dispatch({
        type: "OPEN_MODEL",
        payload: {
          errorMessage: error?.response.data.message,
          typeOfAlert: "danger",
        },
      });
    }
  };

  return (
    <div className={(!isTaskPopupOpen)?`page__wrapper hide__wrapper`:`page__wrapper`}>
      <TaskCard>
      <Form className={!isTaskPopupOpen ? `hide__component` : `form`} onSubmit={createTask}>
        <div className="form__inputs">
          <label htmlFor="title">Title of the task</label>
          <input
            id="title"
            className="task__title"
            type="text"
            placeholder="Title of task"
            required
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form__inputs">
          <label htmlFor="date">Due date of the task</label>
          <input
            className="task__due-date"
            type="date"
            id="date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form__inputs">
          <label htmlFor="details">Description of the task</label>
          <textarea
            id="details"
            className="task__details"
            placeholder="Details about task"
            value={details || ""}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* this is a button wrapper */}
        <div className="button__wrapper">
          <Button
            className="btn btn--primary"
            type="submit"
            disabled={disabled}
          >
            {taskMode}
          </Button>
          <Button className="btn btn--secondary" onClick={closeTaskPopup}>
            Cancel
          </Button>
        </div>
      </Form>
      </TaskCard>
    </div>
  );
};

const TaskCard = styled.article`
  width:70vw;
  max-width: 600px;
  background-color: var(--clr-secondary-bg);
  padding: 3em;
  min-height: 80vh;
  border-radius: 0.2em;
  min-width:280px;
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
      @media (max-width: 694px) {
      font-size:0.8rem;
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
export default TaskPopup;
