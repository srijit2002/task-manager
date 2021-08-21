import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button } from "../pages/Register";
import { useGlobalAppContext } from "../reducer/context";
import instance from "../axios";

const UserDetailsUpdate = () => {
  const {
    isUserUpdateModelOpen,
    dispatch,
    userName,
    userEmail,
    userOccupation,
    _id,
  } = useGlobalAppContext();
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [occupation, setOccupation] = useState(userOccupation);
  useEffect(() => {
    setEmail(userEmail);
    setName(userName);
    setOccupation(userOccupation);
  }, [userName, userEmail, userOccupation]);
  const redirectToHomePage = (e) => {
    e.preventDefault();
    dispatch({ type: "CLOSE__USER__UPDATE__MODEL" });
  };
  const updateUserDate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser=await instance.patch(`/api/v1/user/${_id}`,{name,email,occupation});
      const {name:userName,email:userEmail,occupation:userOccupation}=updatedUser.data;
      dispatch({type:"UPDATE__USER",payload:{userName,userEmail,userOccupation}})
    } catch (error) {
      dispatch({
        type: "OPEN_MODEL",
        payload: {
          typeOfMessage: "error",
          errorMessage:
            error?.response?.message ||
            "Some error occured, please try again later",
        },
      });
    }
  };
  useEffect(() => {
    const prevInstance=JSON.parse(localStorage.getItem("team-manager"));
    if(prevInstance)localStorage.setItem("team-manager", JSON.stringify([userEmail, prevInstance[1]]));
  }, [userEmail]);
  return (
    <UserDetailsUpdateWrapper
      className={!isUserUpdateModelOpen && `hide__wrapper`}
    >
      <Form
        onSubmit={updateUserDate}
        className={
          !isUserUpdateModelOpen
            ? `hide__component userUpdateCard`
            : `userUpdateCard`
        }
      >
        <h2 className="form__title">Update your details</h2>
        <div className="form__inputs">
          <label htmlFor="name">Your Name</label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form__inputs">
          <label htmlFor="email">Your email address</label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__inputs">
          <label htmlFor="occupation">Your Occupation</label>
          <input
            required
            type="text"
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>
        <div className="button__wrapper">
          <Button className="btn btn--primary" type="submit">
            Save
          </Button>
          <Button className="btn btn--secondary" onClick={redirectToHomePage}>
            Cancel
          </Button>
        </div>
      </Form>
    </UserDetailsUpdateWrapper>
  );
};

const UserDetailsUpdateWrapper = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0 0 0/0.5);
  z-index: 5;
  display: grid;
  place-items: center;
  overflow:hidden ;
  .userUpdateCard {
    width: 40vw;
    max-width: 400px;
    padding: 2em;
    border-radius: 0.3em;
    background-color: var(--clr-secondary-bg);
    label {
      font-size: 0.8rem;
    }
    @media(max-width:694px){
      width: 75vw;
        max-width:700px;
    }
    @media(max-width:400px){
      width:95vw;
      max-width:700px;
    }
    .button__wrapper {
      display: flex;
      .btn {
        font-size: 1rem;
        padding: 0.3em 0.75em;
        min-width: 8ch;
        transition: all 350ms;
        &--primary {
          margin-right: 1em;
          &:hover {
            filter: saturate(90%);
          }
        }
        &--secondary {
          color: var(--clr-secondary);
          background-color: transparent;
          background-color: var(--clr-primary-bg);
          &:hover {
            filter: brightness(102%);
          }
        }
      }
    
    }
    .form__inputs {
      display: flex;
      flex-direction: column;
      flex: 1;
      input,
      textarea {
        font-family: var(--ff-primary);
        font-size: 1.1rem;
        padding: 0.4em;
        margin: 0.3em 0;
        width: 100%;
        border: 1px solid;
        &:focus {
          outline-color: var(--clr-secondary);
        }
      }
    }
  }
  .form__title {
    position: relative;
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.5em;
    padding-bottom: 0.3em;
    width: fit-content;
    margin: 0.3em auto;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 10%;
      background-color: var(--clr-secondary);
    }
  }
 
`;
export default UserDetailsUpdate;
