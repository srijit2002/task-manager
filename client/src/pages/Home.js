import React, { useEffect} from "react";
import SearchPanel from "../components/SearchPanel";
import ChatPanel from "../components/ChatPanel";
import Sidebar from "../components/Sidebar";
import TaskPanel from "../components/TaskPanel";
import styled from "styled-components";
import TaskPopup from "../components/TaskPopup";
import Prompt from "../utils/Prompt";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useGlobalAppContext } from "../reducer/context";

const Home = () => {
  const { dispatch } = useGlobalAppContext();
  const history = useHistory();

  useEffect(() => {
    const getLocalStorage = async () => {
      try {
        const [email, password] = JSON.parse(
          localStorage.getItem("team-manager")
        );
        if (email && password) {
          const userModel = { email, password };
          const newUser = await axios.post(
            "http://localhost:8000/api/v1/user/signin",
            userModel
          );
          history.push("/");
          dispatch({ type: "SIGNIN__USER", payload: newUser.data.data });
         
        } else {
          history.push("/register");
        }
      } catch (error) {
        history.push("/register");
      }
    };

    getLocalStorage();
  }, [dispatch,history]);
  return (
    <HomeWrapper>
      <Prompt />
      <TaskPopup />
      <SearchPanel />
      <Sidebar />
      <TaskPanel />
      <ChatPanel />
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
    "sidebar taskPanel chatPanel";

  grid-gap: 1.5em;
  padding: 1em;
  max-height: 100vh;
`;
export default Home;
