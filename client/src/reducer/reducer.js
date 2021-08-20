const reducer=(state,action)=>{
    if(action.type==="CLOSE_MODEL"){
        return {...state,isErrorModelOpen:false}
    }
    else if(action.type==="OPEN_MODEL"){
        return {...state,isErrorModelOpen:true,errorMessage:action.payload.errorMessage,typeOfAlert:action.payload.typeOfAlert}
    }
    else if(action.type==="REGISTER__USER"){
        const {tasks,totalCompletedTasks,userEmail,userName,userOccupation,_id}=action.payload;
        return {...state,tasks,totalCompletedTasks,userEmail,userName,userOccupation,_id,isErrorModelOpen:true,errorMessage:"Account created successfully",typeOfAlert:"success"}
    }
    else if(action.type==="SIGNIN__USER"){
        const {tasks,totalCompletedTasks,userEmail,userName,userOccupation,_id}=action.payload;
        return {...state,tasks,totalCompletedTasks,userEmail,userName,userOccupation,_id,isErrorModelOpen:true,errorMessage:"Signed in successfully",typeOfAlert:"success"}
    }
    else if(action.type==="LOG__OUT"){
       return {...state,tasks:[],totalCompletedTasks:0,userEmail:"",userName:"",userOccupation:"",_id:"",isErrorModelOpen:true,errorMessage:"Logged out successfully",typeOfAlert:"success"}
    }
    else if(action.type==="CLOSE__TASK__POPUP"){
       return {...state,isTaskPopupOpen:false}
    }
    else if(action.type==="OPEN__USER__UPDATE__MODEL"){
      return {...state,isUserUpdateModelOpen:true}
   }
    else if(action.type==="CLOSE__USER__UPDATE__MODEL"){
       return {...state,isUserUpdateModelOpen:false}
    }
    else if(action.type==="OPEN__TASK__POPUP"){
       return {...state,isTaskPopupOpen:true,taskMode:action.payload}
    }
    else if(action.type==="ADD__TASKS"){
       return {...state,isTaskPopupOpen:false,tasks:action.payload, isErrorModelOpen:true,errorMessage:"Task created successfully",typeOfAlert:"success"}
    }
    else if(action.type==="DELETE__TASKS"){
       return {...state,isPromptOpen:false,tasks:action.payload, isErrorModelOpen:true,errorMessage:"Task deleted successfully",typeOfAlert:"success"}
    }
    else if(action.type==="CLOSE__PROMPT"){
       return {...state,isPromptOpen:false}
    }
    else if(action.type==="OPEN__PROMPT"){
       return {...state,idOfDeleteTask:action.payload,isPromptOpen:true}
    }
    else if(action.type==="EDIT__TASKS"){
       return {...state,isTaskPopupOpen:false,tasks:action.payload, isErrorModelOpen:true,errorMessage:"Task edited successfully",typeOfAlert:"success"}
    }
   else if(action.type==="UPDATE__USER"){
       return {...state,...action.payload,isErrorModelOpen:true,errorMessage:"You details edited successfully",typeOfAlert:"success",isUserUpdateModelOpen:false}
    }
}

export default reducer;