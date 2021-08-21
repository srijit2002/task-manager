import React, {useState, useEffect} from "react";
import SearchPanel from "../components/SearchPanel";
import Sidebar from "../components/Sidebar";
import TaskPanel from "../components/TaskPanel";
import styled from "styled-components";
import Prompt from "../utils/Prompt";




const Home = () => {
  const [width,setWidth]=useState(window.innerWidth)
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])

  return (
    <HomeWrapper>
      <Prompt/>
      <SearchPanel />
     {(width>694)&&<Sidebar/>}
      <TaskPanel />
    </HomeWrapper>
  );
};
const HomeWrapper = styled.section`
  display: grid;
  grid-template-rows: 1fr 8fr;
  grid-template-columns: 1fr 5fr 1.5fr;
  background-color: var(--clr-primary-bg);
  min-height: 100vh;
  grid-template-areas:
    "sidebar searchPanel searchPanel"
    "sidebar taskPanel taskPanel";

  grid-gap: 1em;
  padding: 1em;
  max-height: 100vh;
  @media(max-width:694px){
    grid-template-areas:
    "searchPanel searchPanel searchPanel"
    "taskPanel taskPanel taskPanel";
  }
`;
export default Home;
