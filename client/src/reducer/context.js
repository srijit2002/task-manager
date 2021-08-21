import React,{useReducer,createContext,useContext} from 'react'
import reducer from './reducer';


const AppContext=createContext();
const useGlobalAppContext=()=>{
    return useContext(AppContext);
}

const AppProvider=({children})=>{
    const initialState={
        userName:"",
        userEmail:"",
        _id:"",
        userOccupation:"",
        tasks:[],
        totalCompletedTasks:0,
        isErrorModelOpen:false,
        errorMessage:"",
        typeOfAlert:"success",
        isTaskPopupOpen:false,
        taskMode:"Create",
        isPromptOpen:false,
        promptMessage:"",
        idOfDeleteTask:"",
        isUserUpdateModelOpen:false,
        isVerified:false
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const value={
        ...state,
        dispatch
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export {AppProvider,useGlobalAppContext}