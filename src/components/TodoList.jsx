import React, { useState } from 'react';

const TodoList = (props) => {

    const [todos, setTodos] = useState([])
    const [content, setContent] = useState("")
    const [completed, setCompleted] = useState(false)

    const editTodo = (e) => setContent(e.target.value)
    const createTodo = (e) => {
        e.preventDefault();
        const newTodo = {content, completed}
        setContent("");
        setTodos([...todos, newTodo])
    }
    const updateStatus = (e, todo, index) => {
        const updatedTodo = {content: todo.content, completed : e.target.checked};
        const newTodos = todos.map((t, i) => {
            if(i === index){
                t = updatedTodo;
            }
            return t;
        })
        setTodos(newTodos);
    }
    const deleteTodo = (e, todoIndex) => {
        e.preventDefault();
        setTodos(todos.filter( (todo, i) => i !== todoIndex))
    }

    return(
        <div>
            <form onSubmit={createTodo}>
                <input type="text" onChange={editTodo} value={content}/>
                <input type="submit" value="Add"/>
            </form>
            <ul>
                {todos.map( (todo, i) =>
                    <li key={i}>
                        <form onSubmit={(e) => deleteTodo(e, i)}>
                            <h3 className={todo.completed? "done" : ""}>{todo.content}</h3>
                            <input type="checkbox" onChange={(e) => updateStatus(e, todo, i)}/>
                            <input type="submit" value="Delete"/>
                        </form>
                    </li>
                    )
                }
            </ul>
        </div>
    )
}
export default TodoList;