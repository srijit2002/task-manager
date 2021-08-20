import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";
import { IoListCircleOutline } from "react-icons/io5";
import { GiAchievement } from "react-icons/gi";
import Calender from "./ReactCalender";
import Person from "../images/person.svg";
import { useGlobalAppContext } from "../reducer/context";

const Sidebar = () => {
  const { userName, userOccupation, tasks,dispatch } = useGlobalAppContext();
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);
  const [taskPercent, setTaskPercent] = useState(0);
  useEffect(() => {
    let totalCompleted = 0;
    tasks.forEach(({ isCompleted }) => {
      isCompleted && totalCompleted++;
    });
    setTotalCompletedTasks(totalCompleted);
    const percent = (totalCompletedTasks / tasks.length) * 100;
    setTaskPercent(percent);
  }, [tasks, totalCompletedTasks]);

  return (
    <SidebarWrapper className="panel">
      <div className="user">
        <img src={Person} alt="" className="user__img" />
        <h1 className="user__name">
          {userName}
          <button className="btn" onClick={()=>dispatch({type:"OPEN__USER__UPDATE__MODEL"})}>
            <FaUserEdit />
          </button>
        </h1>
        <h2 className="user__occupation">{userOccupation}</h2>
        <div className="user__details">
          <div className="user__achievements">
            <GiAchievement className="icon" />
            <p>
              <span>
                {totalCompletedTasks}
                <br />
              </span>
              completed
            </p>
          </div>
          <div className="user__tasks">
            <IoListCircleOutline className="icon icon--total" />
            <p>
              <span>
                {tasks.length}
                <br />
              </span>
              total
            </p>
          </div>
        </div>
        <BarChart taskPercent={taskPercent} />
      </div>
      <div className="calender">
        <Calender />
      </div>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2em 1em;
  .user {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .btn {
      font-size: 1rem;
      display: inline;
      margin: 0;
      color:#ff9761;
      cursor:pointer;
      margin-left:0.5em;
      &:hover{
        color:var(--clr-secondary);
      }
    }

    &__img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0.7em 0;
      padding: 0.1em;
      border: 2px solid var(--clr-secondary);
      position: relative;
    }
    &__name {
      font-size: 1.1rem;
    }
    &__occupation {
      font-size: 0.6rem;
      font-weight: 400;
      color: #687086;
    }
    &__details {
      display: flex;
      flex: 1;
      padding: 0.3em 0.1em;
      border-radius: 0.4em;
      background-color: var(--clr-primary-bg);
      margin-top: 0.8em;

      .icon {
        font-size: 1rem;
        background-color: var(--clr-secondary-bg);
        width: 3ch;
        height: 3ch;
        border-radius: 50%;
        padding: 0.15em;
        &--total {
          padding: 0.05em;
        }
      }
    }
    &__tasks,
    &__achievements {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4em;
      p {
        line-height: 1;
        font-size: 0.7rem;
        margin-left: 0.4em;
        min-width: 9ch;
        span {
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }
    &__tasks {
      border-left: 2px solid #d1d5e0;
    }
  }
`;
const BarChart = styled.div`
  position: relative;
  width:90%;
  height: 0.4rem;
  background-color: var(--clr-primary-bg);
  margin-top: 1em;
  border-radius: 3em;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--clr-secondary);
    width: ${({ taskPercent }) => {
      return `${taskPercent}%`;
    }};
  }
`;
export default Sidebar;
