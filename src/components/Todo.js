import React from "react";
import  { useState } from 'react';
import { connect } from 'react-redux';
import {addtodo,dlttodo,status,filtertodo} from '../Redux/Action/Action'



const Todo=(props)=>{
  const [newItem, setNewItem] = useState();
 
  
  function inputTextHandler (e){
    setNewItem({
      title: e.target.value,
      completed: false,
      id: Math.floor(Math.random() * 1000),
      modified : false
    })
  }
  
 
 
  
  

  return (
    <div className="App">
      <div className="todo-box">

      <h2>your tasks </h2>
      <div className='input-section'>
        <input
          
          placeholder='enter a todo'
          onChange={inputTextHandler}
          className="todo-input"

        />

        <button className='add-btn' onClick={()=>props.Ajouter(newItem)}>add todo</button>
        <div className='search'>
              <input 
               type="text"
               placeholder="search..." 
               className='search-input' 
               onChange={e=>props.filterTask(e.target.value)}
              />
        </div>
        
      </div>


      <ul>
        {props.list.map(item => {
          return (
            <>
            <div 
            className={item.completed ? "todo completed" : "todo-list"}
              
             key={item.id}>{item.title}
             <div className='decor'>
              <button className='dlt-btn' onClick={() => props.Supprimer(item.id)}><i className="fa-solid fa-trash"></i></button>
              <button className="check-btn" onClick={()=> props.CompletedTodo(item.id)}><i className="fa-regular fa-square-check"></i></button>
             </div>
            </div>
           
            </>
          )
        }

        )}
      </ul>
      </div>
    </div>
  );
}
const mapStatetoProps =(state)=>{
  return {
    list : state.items

  }
}
const mapDispatchtoProps = (dispatch) =>({
  Ajouter : (payload)=>{
    dispatch(addtodo(payload))
  },
  Supprimer: (payload)=>{
    dispatch(dlttodo(payload))
  },
  CompletedTodo: (payload)=>{
    dispatch(status(payload))
  },
  filterTask: (payload)=>{
    dispatch(filtertodo(payload))
  }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Todo);
