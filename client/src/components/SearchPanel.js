import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlinePlusSm } from "react-icons/hi";
import { CgBell } from "react-icons/cg";
import { Link,useHistory } from "react-router-dom";
import { useGlobalSocketContext } from "../socket/SocketProvider";
import { useGlobalAppContext } from "../reducer/context";
const SearchPanel = () => {
  const history=useHistory()
  // const socket = useGlobalSocketContext();
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("new-user-joined", (name) => {
  //       console.log("new user is" + name);
  //     });
  //   }

  // },[socket]);

  // const handleUser = () => {
  //   socket.emit("join-chat-room", "srijit");
  //   console.log("join");
  // };
  // console.log(socket);
  const { dispatch, _id,tasks } = useGlobalAppContext();
  const [searchValue,setSearchValue]=useState("");


  const openTaskPopup = () => {
    if (_id.length === 0) {
      dispatch({
        type: "OPEN_MODEL",
        payload: {
          errorMessage: "To create a task you need to log in first",
          typeOfAlert: "danger",
        },
      });
    } else {
      dispatch({ type: "OPEN__TASK__POPUP", payload:"Create"});
    }
  };

  const handleRedirect=()=>{
    if(_id.length===0){
      history.push("/signin")
    }
    else{
      localStorage.clear("team-manager")
      dispatch({type:"LOG__OUT"})
      history.push("/signin");
    }
  }
  return (
    <SearchPanelWrapper className="panel">
      <div className="search__bar">
        <RiSearchLine className="search__bar__icon" />
        <input
          type="text"
          placeholder="search"
          className="search__bar__input"
          value={searchValue}
          onChange={e=>setSearchValue(e.target.value)}
        />
      </div>
      <nav className="icon__bar">
        <button className="nav__link" onClick={handleRedirect}>
          {(_id.length === 0)?`Sign in`:`Sign out`}
        </button>
        <Link className="nav__link nav__link--secondary" to="/register">
          Create Account
        </Link>
        <div className="icon__bar__notification">
          <CgBell className="icon__bar__icon" />
          <h4 className="icon__bar__counter">.</h4>
        </div>

        <div className="create__new__task">
          <h2 className="create__new__task__heading">Create task</h2>
          <button className="icon__bar__btn" onClick={openTaskPopup}>
            <HiOutlinePlusSm />
          </button>
        </div>
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
  .search__bar {
    background-color: var(--clr-primary-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0.9em;
    border-radius: 1em;
    &__input {
      border: none;
      outline: none;
      background-color: transparent;
    }
    &__icon {
      margin-right: 0.5em;
      font-size: 0.8rem;
    }
  }
  .icon__bar {
    display: flex;
    justify-content: center;
    align-items: center;
    &__notification {
      position: relative;
      display: grid;
      place-items: center;
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
    }
    &__btn {
      padding: 0.2em;
      border-radius:50%;
      background-color:#ff9761;
      font-size: 1.3rem;
      color: #fff;
      min-width: 2ch;
      display: grid;
      place-items: center;
      margin:0;
      margin-left: 0.4em;
      transition: all 0.5s;
      &:hover{
        background-color: var(--clr-secondary);
      }
    }
    &__icon {
      font-size: 1.2rem;
      cursor: pointer;
    }
    &__counter {
      position: absolute;
      top: 0;
      left: 10px;
      background-color: var(--clr-secondary);
      padding: 0.3em;
      border-radius: 50%;
      width: 2px;
      height: 2px;
      font-size: 1rem;
      color: var(--clr-secondary-bg);
      font-weight: 100;
      border: 1px solid #fff;
    }
  }
  .create__new__task{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:0.3em 0.7em;
    background-color: var(--clr-primary-bg);
    border-radius:1.5em;
    margin: 0 0.5em;
    margin-left:0.5em;
    margin-right: 0;
    &__heading{
      font-size:0.9rem;
      font-weight: 500;
    }
  }
`;

export default SearchPanel;
