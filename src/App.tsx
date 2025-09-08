
import {  useEffect, useReducer, useRef, useState, type FormEvent } from 'react'
import {FaPen,FaTrash} from "react-icons/fa"
import reducer from "./states/reducer"
import type { Task } from './states/types'

function App() {


const storage = localStorage.getItem("tasks")
const tasks_storage = storage?JSON.parse(storage):[]
const [tasks,dispatch] = useReducer(reducer,tasks_storage)
const [text,setText] = useState('')
const [editingId,setEditingId] = useState<number|null>(null)
const handleSubmit = (e:FormEvent<HTMLFormElement>):void=>{
  e.preventDefault()
  if(!text){
    alert("please enter a task")
    return;
  }
  if(editingId!=null){
    dispatch({
      type:"UPDATE",
      payload:{id:editingId,description:text}
    })
    setEditingId(null)
  }else{
    dispatch({type:"ADD",payload:{
      id:Date.now(),
      description:text,
      isCompleted:false,
    }})
  }

  setText('')

}

  function toggleCase(id:number):void{
    dispatch({
      type:"TOGGLE",
      payload:id
    })
  }

  
  function updateStorage(tasks:Task[]):void{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }

  useEffect(()=>{
    updateStorage(tasks)
  },[tasks])

  
    return (
     <>
      <main className='app'>
          <h1>To-do Input</h1>
            <form className='container' onSubmit={handleSubmit}>
              <input type="text" value={text} onChange={(e)=>setText(e.target.value)}placeholder={editingId?'Enter new Item':"Enter Item to add"} />
              <button className={`${editingId?"edit":"submit"}`} type='submit'>{editingId?"Update item":"Add Item"}</button>
            </form>
            <section className="bottom">
              <h2>To do list</h2>
              <ul className='items'>
              {
                tasks?.map((item)=>{
                  return <li key={item.id} className='item'>

                  <label  htmlFor={`task-${item.id}`} className={`task ${item.isCompleted?'completed':''}`} >{item.description}</label>
                  <input id={`task-${item.id}`} hidden onChange={()=>toggleCase(item.id)} type="checkbox"   checked={item.isCompleted}  />
                  <div className="btns">
                      
                      <button onClick={()=>{setText(item.description);
                        setEditingId(item.id);scroll({
                          top:0,
                          behavior:"smooth"
                        })}}><FaPen size={26} color='green'/></button>


                      <button onClick={()=>dispatch({type:"DELETE",payload:item.id})}><FaTrash size={26} color='red'/></button>

                  </div>
                </li>
                })
              } 
              </ul>
              <button className='clear' onClick={()=>dispatch({type:"CLEAR"})}>Clear list</button>
            </section>
      </main>
     </>
  )
}

export default App
