import React from 'react'
import styled from 'styled-components'
import TaskPerson from "../images/person.svg"
import { useGlobalAppContext } from '../reducer/context'

const DetailsPanel = () => {
    const {userName,totalCompletedTasks}=useGlobalAppContext()

    return (
        <DetailsPanelWrapper className="panel">
           <div className="details__image">
               <img src={TaskPerson} alt="Hope your are doing great" />
              
           </div>
           <div className="details__desc">
               <h2>Hi, {userName}</h2>
               <p>You have {totalCompletedTasks} tasks to complete and your progress is very good</p>
           </div>
           <div className="circle circle--left"></div>
           <div className="circle circle--right"></div>
        </DetailsPanelWrapper>
    )
}

const DetailsPanelWrapper=styled.section`
    background-color:#fdf0dd!important;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .circle{
        position: absolute;
        border-radius:50%;
        width:180px;
        height:180px;
        background-color:#ffd3b4;
        transform: translate(-50%,-50%);
      
    &--left{
        top:0;
        left:0;
    }
    &--right{
        top:100%;
        left:100%;
    }
    }
    .details__image{
        z-index:1;
        img{
            width:100%;
        }
    }
    .details__desc{
        display: flex;
        flex-direction: column;
        flex:1;
        p{
            max-width:30ch;
            z-index:2;
        }
    }
`;
export default DetailsPanel
