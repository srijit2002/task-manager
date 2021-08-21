import React from "react";
import styled from "styled-components";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi"
import { useGlobalAppContext } from "../reducer/context";
const SearchPanel = () => {
  
  const { dispatch, _id,isVerified } = useGlobalAppContext();


  const openTaskPopup = () => {
    if (_id.length === 0) {
      dispatch({
        type: "OPEN_MODEL",
        payload: {
          errorMessage: "To create a task you need to log in first",
          typeOfAlert: "danger",
        },
      });
    } 
    else if(!isVerified){
      dispatch({
        type: "OPEN_MODEL",
        payload: {
          errorMessage: "A verification email has been sent to your email address, please verify it, if you already then reload the page",
          typeOfAlert: "danger",
        },
      });
    }
    else {
      dispatch({ type: "OPEN__TASK__POPUP", payload: "Create" });
    }
  };

 
  return (
    <SearchPanelWrapper className="panel">
      <header className="icon__bar">
      <Link to="/sidebar" className="sidebar__link"><GiHamburgerMenu/></Link>
        <div className="create__new__task">
          <h2 className="create__new__task__heading">Create task</h2>
          <button className="icon__bar__btn" onClick={openTaskPopup}>
            <HiOutlinePlusSm />
          </button>
        </div>
       
      </header>
      <nav className="auth__links">
        <Link to="/signin" className="nav__link">
          Sign in
        </Link>
        <Link className="nav__link nav__link--secondary" to="/register">
          Create Account
        </Link>
      </nav>
    </SearchPanelWrapper>
  );
};
const SearchPanelWrapper = styled.header`
  grid-area: searchPanel;
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 50px;

  .icon__bar {
    display: flex;
    justify-content: center;
    align-items: center;
   
   
    &__btn {
      padding: 0.2em;
      border-radius: 50%;
      background-color: #ff9761;
      font-size: 1.3rem;
      color: #fff;
      min-width: 2ch;
      display: grid;
      place-items: center;
      margin: 0;
      margin-left: 0.4em;
      transition: all 0.5s;
      &:hover {
        background-color: var(--clr-secondary);
      }
      @media(max-width:426px){
        font-size: 0.7rem;
        
      }
    }
    &__icon {
      font-size: 1.2rem;
      cursor: pointer;
    }
   
  }
  .create__new__task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3em 0.7em;
    background-color: var(--clr-primary-bg);
    border-radius: 1.5em;
   
    &__heading {
      font-size: 0.9rem;
      font-weight: 500;
      @media(max-width:426px){
        font-weight: 300;
        font-size: 0.7rem;
      }
    }
  }
  .nav__link {
      text-decoration: none;
      color: var(--clr-secondary);
      font-size: 0.9rem;
      margin: 0 0.4em;
      transition: all 300ms;
      padding: 0.5em;
      background-color: #ffe1d194;
      border-radius: 0.2em;
      text-align: center;
      &:hover {
        background-color: #ffddca;
      }
      &--secondary {
        background-color: var(--clr-btn-secondary);
        color: #3cbfe0;
        &:hover {
          background-color: #ceffe8;
        }
      }
      @media(max-width:426px){
        font-size: 0.7rem;
      }
    }
    .auth__links{
      display: flex;
    }
    .sidebar__link{
      margin:0 0.5em;
      color: var(--clr-secondary);
      @media(min-width:694px){
        display:none;
      }
    }
    @media(max-width:426px){
       padding:0.3em;
      }
`;

export default SearchPanel;
