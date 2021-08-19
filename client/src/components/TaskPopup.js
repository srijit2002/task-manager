import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { useGlobalAppContext } from "../reducer/context";
import axios from "axios"
const TaskPopup = () => {
  const { tasks,isTaskPopupOpen, taskMode, dispatch,_id,currentTaskId} = useGlobalAppContext();
  const closeTaskPopup = (e) => {
    e.preventDefault();
    dispatch({ type: "CLOSE__TASK__POPUP" });
  };
  const [title,setTitle]=useState("")
  const [details,setDetails]=useState("")
  const [date,setDate]=useState("")
  const[disabled,setDisabled]=useState(false)
  const createTask=async(e)=>{
      e.preventDefault()
      setDisabled(true)
      const year=date.slice(0,4);
      const month=date.slice(5,7);
      const day=date.slice(8,11);
      const dueDate=new Date(`${month}/${day}/${year}`).getTime();
      const newTask={title,details,dueDate}
      try {
        const allTasks=await axios.post(`http://localhost:8000/api/v1/task/${_id}`,newTask)
        dispatch({type:"ADD__TASKS",payload:allTasks.data.data});
      } catch (error) {
        dispatch({type:"OPEN_MODEL",payload:{errorMessage:error?.response.data.message,typeOfAlert:"danger"}})
      }
      finally{
        setDisabled(false)
      }
     
  }

  return (
    <TaskPopupWrapper className={!isTaskPopupOpen && `hide__wrapper`}>
      <form className={!isTaskPopupOpen ? `hide__component` : `task`} onSubmit={createTask}>
        <div className="task__header">
          <input
            type="text"
            className="task__title"
            placeholder="Title of task"
            required
            value={title||""}
            onChange={e=>setTitle(e.target.value)}
          />

          <input type="date" id="date" className="task__date" value={date||""} onChange={e=>setDate(e.target.value)}/>
        </div>
        <textarea className="task__details" placeholder="Details about task" value={details||""} onChange={e=>setDetails(e.target.value)} />
        <div className="task__button__wrapper">
          <button type="submit" className="btn btn--primary" disabled={disabled}>
            {taskMode}
          </button>
          <button className="btn btn--secondary" onClick={closeTaskPopup}>
            Cancel
          </button>
        </div>
      </form>
    </TaskPopupWrapper>
  );
};

const TaskPopupWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0 0 0/0.7);
  z-index: 3;
  transition: transform 300ms;

  .task {
    position: absolute;
    top: 10%;
    left: 8%;
    right: 8%;
    bottom: 0;
    background-color: var(--clr-secondary-bg);
    border-radius: 0.2em;
    display: flex;
    flex-direction: column;
    padding: 2em;
    transition: transform 300ms ease-out;
    transition-delay: 200ms;

    &__header {
      display: flex;
    }
    &__title {
      font-size: 1.5rem;
      font-weight: 700;
      padding: 0.3em;
      flex: 1;
      &:focus {
        outline-color: var(--clr-secondary);
      }
    }
    &__details {
      flex: 1;
      resize: none;
      font-size: 1.5rem;
      font-weight: 700;
      padding: 0.3em;
      &:focus {
        outline-color: var(--clr-secondary);
      }
    }
    &__button__wrapper {
      display: flex;
      margin-top: 0.5em;
      .btn {
        font-size: 1rem;
        padding: 0.3em 0.5em;
        margin: 0;
        border-radius: 0.1em;
        min-width: 6ch;

        font-weight: 100;
       
        &--primary {
          margin-right:1em;
          background-color: #f98e57;
          color: var(--clr-secondary-bg);
          &:hover {
          background-color: var(--clr-secondary);
        }
        }
        &--secondary {
          border: 2px solid #f98e57;
          color:#f98e57;
          &:hover {
          color: var(--clr-secondary);
        }
        }
      }
    }
    &__date {
      &:focus {
        outline-color: var(--clr-secondary);
      }
    }
  }
`;
export default TaskPopup;
