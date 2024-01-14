import React,{useEffect, useState} from 'react';
import { TodoForm } from './TodoForm';
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import {EditTodoForm} from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos , setTodos] = useState([])
    const [cpy ,setCpy]=useState('');
    const [ordr , setOrdr]= useState(true)
    

    const addTodo= todo =>{
        if(todo!==''){
            setTodos([...todos,{id:uuidv4(),task:todo,
                isEditing:false,isCompleted:false}])
            setOrdr(!ordr)
                
        }
       
    }
    const deleteTodo=id=>{
        setTodos(todos.filter(todo => todo.id!==id))
    }
    const editTodo=id=>{
        setTodos(todos.map(todo=> todo.id === id ?{
            ...todo,isEditing: !todo.isEditing
        }: todo))
    }
    const editTask=(task,id)=>{
        setTodos(todos.map(todo=> todo.id === id ? {
            ...todo, task ,isEditing: !todo.isEditing
        }: todo))
    }

    const copyTodo=id=>{
        const t=todos.filter(todo=> todo.id === id);
        setCpy(t[0].task);
        console.log(t[0].task)
    }

    useEffect(()=>{
        console.log(todos)
        todos.sort((a,b)=>a.isCompleted-b.isCompleted)
        setTodos([...todos])
        console.log('useeffect called')
    },[ordr])

    const completeToggle=id=>{
        setTodos(todos.map(todo=> todo.id === id ?{
            ...todo , isCompleted:!todo.isCompleted
        }:todo))
        setOrdr(!ordr)
        
        // todos.sort((a,b)=>a.isCompleted-b.isCompleted)
        console.log(todos)
    }
        
    
  return (
    <div className='TodoWrapper'>
        <h1>Things To Do</h1>
        <TodoForm addTodo={addTodo} cpy={cpy} />

        {todos.map((todo ,index)=>(
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ):(
                <Todo task={todo} key={index}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            copyTodo={copyTodo}
            completeToggle={completeToggle} />
            )
            
        ))}
    </div>
  )
}
