import React from "react";
import Home from "./pages/Home";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import { AppProvider } from "./reducer/context";
import Alert from "./components/Alert";
import SingleTask from "./pages/SingleTask";
import Sidebar from "./components/Sidebar";
import TaskPopup from "./components/TaskPopup";
import UserDetailsUpdate from "./utils/UserDetailsUpdate";
const App = () => {
 

  return (
    <>
      <GlobalStyle />

      <AppProvider>
        <Router>
          <Alert />
          <UserDetailsUpdate/>
          <Switch>
            <Route exact path="/">
              <TaskPopup/>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/task/:taskId">
              <SingleTask />
            </Route>
            <Route path="/sidebar">
              <Sidebar/>
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </>
  );
};

export default App;
