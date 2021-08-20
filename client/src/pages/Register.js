import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import styled from "styled-components";
import RegisterImage from "../images/register.svg";
import { useGlobalAppContext } from "../reducer/context";
import axios from "axios";

const Register = () => {
  const { dispatch } = useGlobalAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [job, setJob] = useState("");
  const [disabled,setDisabled]=useState(false)
  const history=useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true)
      const userModel = { name, email, password, occupation: job };
      const newUser = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        userModel
      );
      history.push("/")
      setDisabled(false)
      localStorage.setItem("team-manager",JSON.stringify([email,password]))
      dispatch({type:"REGISTER__USER",payload:newUser.data.data})
      
    
    } catch (error) {
      console.log(error?.response.data.message);
      setDisabled(false)
      dispatch({type:"OPEN_MODEL",payload:{errorMessage:error?.response.data.message,typeOfAlert:"danger"}})
    }
    
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <img
          src={RegisterImage}
          alt="Create an accout to start using the app"
          className="page__img"
        />
        <main className="page__details">
          <h1 className="page__heading">Create Account</h1>
          <Form
            action=""
            method="POST"
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="form__inputs">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                name="name"
                placeholder="Name"
                type="text"
                className="form__name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
                placeholder="Email"
                type="email"
                className="form__email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
                placeholder="Password"
                type="password"
                className="form__password"
              />
              <input
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
                name="occupation"
                placeholder="Enter your occupation"
                type="text"
                className="form__occupation"
              />
            </div>
            <Button type="submit" className="form__btn" disabled={disabled}>
              Create Account
            </Button>
            <Link to="/" className="form__btn form__btn--secondary">
              Back to home page
            </Link>
            <h3 className="secondary__link">
              Already have an account?<Link to="/signin">Sign in</Link>
            </h3>
          </Form>
        </main>
      </FormWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.section`
  background-color: var(--clr-primary-bg);
  min-height: 100vh;
  display: grid;
  place-items: center;
`;
const FormWrapper = styled.article`
  width: 80vw;
  max-width: 750px;
  background-color: var(--clr-secondary-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5em 4em;
  border-radius: 0.2em;
  box-shadow:0 0 10px 3px #d7d7d7;
  .page__img {
    width:50%;
    max-width: 350px;
    display: inline-block;
  }
  .page__details {
    background-color: var(--clr-secondary-bg);
    flex: 1;
  }
  .page__heading {
    font-size: 2rem;
    margin-bottom: 0.3em;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  .form__inputs {
    display: flex;
    flex-direction: column;
    flex:1;
    input,textarea {
      font-family: var(--ff-primary);
      font-size: 1.1rem;
      padding: 0.4em;
      margin: 0.3em 0;
      width: 100%;
      border: 1px solid;
      &:focus{
        outline-color: var(--clr-secondary);
      }
    }
  }
  .secondary__link {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: center;
    margin-top: 0.3em;
    a {
      color: var(--clr-secondary);
      font-weight: 500;
    }
  }
  .form__btn {
    background-color: var(--clr-secondary);
    font-size: 1.1rem;
    padding: 0.5em;
    margin: 0;
    margin-top: 1em;
    border-radius: 0.1em;
    &:hover {
      filter: saturate(110%);
    }
    &--secondary {
      color: var(--clr-secondary);
      background-color: transparent;
      display: grid;
      place-items: center;

      padding: 0.4em;
    }
  }
`;

const Button = styled.button`
  background-color: var(--clr-secondary);
  font-size: 1.1rem;
  padding: 0.4em;
  margin: 0;
  margin-top: 1em;
  border-radius: 0.1em;
  &:hover {
    filter: saturate(110%);
  }
`;
export default Register;
export { Button, Form, FormWrapper, PageWrapper };
