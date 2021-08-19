import React from 'react'
import styled from "styled-components";
import { useGlobalAppContext } from '../reducer/context';
import Task from "../utils/Task"
import NoTask from "../images/no-task.svg"
const Taskpanel = () => {
    const {tasks}=useGlobalAppContext()
    return (
        <TaskPanelWrapper className={(tasks.length===0)&&`panel`}>
            {(tasks.length===0)&&<img className="noTaskImage" src={NoTask} alt="You have no active task right now"/>}
            {(tasks.length===0)&&<h1 className="noTaskTitle">You don't have any active task right now</h1>}
            {
                tasks.map(task=>{
                   
                    return  <Task key={task._id}{...task}/>
                })
            }
           
        </TaskPanelWrapper>
    )
}


const TaskPanelWrapper=styled.main`
    position: relative;
    grid-area: taskPanel;
    display: flex;
    flex-direction: column;
    gap:1em;
    overflow-x: hidden;
    overflow-Y:auto;
    max-height:90vh;
    align-content: start;
   padding:1em;
    .noTaskImage{
        position: absolute;
        top:60%;
        left:50%;
        transform: translate(-50%,-50%);
        width:60%;
    }
    .noTaskTitle{
        text-align:center;
        margin-top:1.5em;
        background-color: var(--clr-secondary);
        height: fit-content;
        padding:0.5em;
        color: var(--clr-secondary-bg);
    }
`;
export default Taskpanel
