import React, { useState } from "react";
import SigninImage from "../images/login.svg";
import { Button, Form, FormWrapper, PageWrapper } from "./Register";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useGlobalAppContext } from "../reducer/context";
const Signin = () => {
  const { dispatch } = useGlobalAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const userModel = { email, password };
      const newUser = await axios.post(
        "http://localhost:8000/api/v1/user/signin",
        userModel
      );
      dispatch({ type: "SIGNIN__USER", payload: newUser.data.data });
      history.push("/");
    } catch (error) {
      console.log(error?.response.data.message);
      dispatch({
        type: "OPEN_MODEL",
        payload: {
          errorMessage: error?.response.data.message,
          typeOfAlert: "danger",
        },
      });
    } 
  };
 
  return (
    <PageWrapper>
      <FormWrapper>
        <img
          src={SigninImage}
          alt="Create an accout to start using the app"
          className="page__img"
        />
        <main className="page__details">
          <h1 className="page__heading">Sign In</h1>
          <Form
            action=""
            method="POST"
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="form__inputs">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
                placeholder="Email"
                type="email"
                className="form__email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
                placeholder="Password"
                type="password"
                className="form__password"
              />
            </div>
            <Button type="submit" className="form__btn" disabled={disabled}>
              Sign in
            </Button>
            <Link to="/" className="form__btn form__btn--secondary">
              Back to home page
            </Link>
            <h3 className="secondary__link">
              Don't have an account?<Link to="/register">Create a new one</Link>
            </h3>
          </Form>
        </main>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Signin;
