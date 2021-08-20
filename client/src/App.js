import React from "react";
import Home from "./pages/Home";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import { AppProvider } from "./reducer/context";
import Alert from "./components/Alert";
import SingleTask from "./pages/SingleTask";

const App = () => {
 

  return (
    <>
      <GlobalStyle />

      <AppProvider>
        <Router>
          <Alert />
          <Switch>
            <Route exact path="/">
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
          </Switch>
        </Router>
      </AppProvider>
    </>
  );
};

export default App;
