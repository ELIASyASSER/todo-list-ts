import type { Action, Task } from "./types";

const reducer = (state:Task[],action:Action):Task[]=>{
    if(action.type =="ADD"){
        return [...state,action.payload]
    }
    if(action.type =="TOGGLE"){
        return state.map((task)=>{
            return task.id == action.payload?{...task,isCompleted:!task.isCompleted}:task
        })
    }
    if(action.type =="DELETE"){
        return state.filter((item)=>item.id !== action.payload)
    }
    if(action.type =="UPDATE"){
        return state.map((task)=>{
            return task.id ==action.payload.id?{...task,description:action.payload.description}:task
        })
    }
    
    if(action.type =="CLEAR"){
        return []
    }
    else{
        const unExpected:never = action;
        throw new Error(`No case for ${unExpected}`)
    }
}
export default reducer

