import React from "react";
import styled from "styled-components";
import { useGlobalAppContext } from "../reducer/context";
import Task from "../utils/Task";
import NoTask from "../images/no-task.svg";
import Masonry from "react-masonry-css";

const Taskpanel = () => {
  const { tasks,isVerified,_id } = useGlobalAppContext();
 const breakPoints={
      default:3,
      1098:2,
      816:1
  }

  return (
    <TaskPanelWrapper className={tasks.length === 0 && `panel`}>
     
      {tasks.length === 0 && (
        <img
          className="noTaskImage"
          src={NoTask}
          alt="You have no active task right now"
        />
      )}
      {tasks.length === 0 && (
        <h1 className="noTaskTitle">
          You don't have any active task right now
        </h1>
      )}
      {(!isVerified&&_id)&&<MiniAlert>Please verify your email address</MiniAlert>}
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </Masonry>
    </TaskPanelWrapper>
  );
};

const TaskPanelWrapper = styled.main`
  position: relative;
  grid-area: taskPanel;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 90vh;
  align-content: start;
  padding: 0.7em;
  overflow-x: hidden;
  .noTaskImage {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width:30%;
    min-width:25ch;
  }
  .noTaskTitle {
    text-align: center;
    margin-top: 1.5em;
    background-color: var(--clr-secondary);
    height: fit-content;
    padding: 0.5em;
    color: var(--clr-secondary-bg);
    width: 100%;
    font-size: clamp(1rem,1.4vw,2rem);
  }
  
`;
const MiniAlert=styled.h2`
  padding:0.5em 1em;
  margin: 0.5em 0;
  font-size: 1rem;
  font-weight:200;
  background-color:#f86d6d;
  border-radius: 0.2em;
  color:#fff;
`
export default Taskpanel;
