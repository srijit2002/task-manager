import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
const ReactCalender = () => {
  const [value, onChange] = useState(new Date());
  return (
    <CalenderWrapper>
      <Calendar className="calender" onChange={onChange} value={value} />
    </CalenderWrapper>
  );
};

const CalenderWrapper=styled.article`
.calender{
  width:100%;
  max-width:250px;
  font-size:1rem;
  transform:scale(0.9);
  
  .react-calendar__tile--active {
    background-color: var(--clr-secondary);
    border-radius: 0.2em;
  }
  .react-calendar__tile{
    padding:0.5em;
  }
  .react-calendar__navigation{
    margin-bottom:0.4em;
    background-color: var(--clr-secondary);
    border-radius: 0.3em 0.3em 0 0;
    color:#fff;
    &__label{
      background-color: var(--clr-secondary);
      overflow: hidden;
    }
  }
 
  border:1.5px solid var(--clr-secondary);
  border-radius: 0.3em;
  .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus {
    background-color: #fff;
}
}

`;
export default ReactCalender;
