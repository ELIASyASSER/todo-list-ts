export interface Task{
      id:number,
      description:string,
      isCompleted:boolean,
}

type Add = {type:'ADD',payload:Task}
type Delete = {type:"DELETE",payload:number}
type Toggle ={type:'TOGGLE',payload:number}
type Update ={type:'UPDATE',payload:{id:number,description:string}}
type Clear = {type:'CLEAR'}
export type Action = Add |Delete|Toggle|Update|Clear
