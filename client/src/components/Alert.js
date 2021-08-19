import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import { useGlobalAppContext } from '../reducer/context'

const Alert = () => {
    const {isErrorModelOpen,errorMessage,typeOfAlert,dispatch}=useGlobalAppContext()
    const dangerColor="#ff0f0f" 
    const successColor="#339900" 
    useEffect(() => {
        const alertInterval=setInterval(() => {
            dispatch({type:"CLOSE_MODEL"})
        },3000);
            
        return () => {
           clearInterval(alertInterval)
        }
    }, [isErrorModelOpen,errorMessage,typeOfAlert])
    return (
        <AlertWrapper type={typeOfAlert} style={{display:(isErrorModelOpen)?"block":"none",backgroundColor:(typeOfAlert==="success")?successColor:dangerColor}}>
           {errorMessage}
        </AlertWrapper>
    )
}

const AlertWrapper=styled.div`
    position: absolute;
    top:0;
    left:50%;
    transform:translateX(-50%);
    min-width:400px;
    width:100%;
    padding:0.8em 0.5em;
    font-size: 1.2rem;
    text-align: center;
    border-radius:0 0 0.2em 0.2em;
    z-index:2;
    color:#fff;
`;

export default Alert
