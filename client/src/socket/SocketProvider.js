import React,{useEffect,useState,useReducer,createContext,useContext} from 'react'
import io from "socket.io-client"
const socketContext=createContext()

const useGlobalSocketContext=()=>{
    return useContext(socketContext)
}
const SocketProvider = ({id,children}) => {
    const [socket,setSocket]=useState("")
    // useEffect(() => {
    //     const newSocket=io("http://localhost:8000",{query:{id}})
    //     setSocket(newSocket);
    //     // console.log(newSocket);
    //     return () => {
    //         newSocket.close()
    //     }
    // }, [id])
    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider
export {useGlobalSocketContext}