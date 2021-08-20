import {createGlobalStyle} from "styled-components"


const GlobalStyle=createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    min-height:100vh;
    overflow-x:hidden;
    font-family: var(--ff-primary);
    max-height: 100vh;
}
abbr[title] {
    text-decoration:none;
}
:root{
    --clr-primary-bg:#EAECF2;
    --clr-secondary-bg:#fff;

    --clr-secondary:#fd7b38;
    --clr-btn-secondary:#ebf8f2;

    --ff-primary:'Roboto', sans-serif;
}
.panel{
      background-color: var(--clr-secondary-bg);
      border-radius: 1em;
      box-shadow:0 0 10px 3px #d7d7d7;
  }
  button{
      border: none;
      outline:none;
      cursor:pointer;
      margin: 0 0.5em;
      display: grid;
      place-items: center;
      background-color: transparent;
  }
 /* width */
::-webkit-scrollbar {
  width: 6px;
  
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background:var(--clr-secondary); 
  border-radius:40em;
}

.hide__wrapper{
  opacity:0;
  user-select:none;
  pointer-events:none;
}
.hide__component{
  transform:translateY(100%);
}
img{
  width:100%;
}
.completed{
  filter:opacity(50%);
  
  path {
      stroke: #2cf72c;
    }
}

//React masonry library
.my-masonry-grid {
  display: flex;
  justify-content:space-between;
  margin-left: -30px; /* gutter size offset */
  width: auto;
  padding-left:2em;
 
}
.my-masonry-grid_column {
  background-clip: padding-box;
  margin-right: 1.1em;
}

/* Style your items */
.my-masonry-grid_column > article { /* change div to reference your elements you put in <Masonry> */
 margin:0 2em 2em 0;
}
.my-masonry-grid_column:nth-last-col(){ /* change div to reference your elements you put in <Masonry> */
 margin-right:0;
}





`;


export default GlobalStyle
