import {useState} from 'react';

import './todolist.css';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [lastIndex, setLastIndex] = useState(0);

    const handleAddTask = (e) => {
        e.preventDefault();
        console.log(lastIndex);
        
        if (newTask.trim() !== '') {
            setLastIndex(lastIndex + 1);
            setTasks([...tasks, { text: newTask, completed: false, index: lastIndex }]);
            setNewTask('');
            setFilter('all');
        }
    };

    const handleRemoveTask = (index) => {
        console.log(index);
        setTasks(tasks.filter((task) => task.index !== index ));
    };

    const handleCompletedTask = (index) => {
        const updatedTasks = tasks.map((task) => (
            (task.index === index) ? { ...task, completed: !task.completed } : task
        ));

        setTasks(updatedTasks);
    }

    const filteredTasks = tasks.filter((task, i) => {
                            if (filter === 'done') return task.completed;
                            if (filter === 'undone') return !task.completed;
                            return true
                        });
    

    return (
        <div className="ToDoList">
            <h1>To Do List</h1>
            <div className='filters'>
                <form>
                    <label>
                        <input type='radio' name='filter' checked={filter === 'all'} onChange={() => setFilter('all')} />
                        <span>All</span>
                    </label>
                    <label>
                        <input type='radio' name='filter' onChange={() => setFilter('done')} checked={filter === 'done'}/>
                        <span>Completed</span>
                    </label>
                    <label>
                        <input type='radio' name='filter' onChange={() => setFilter('undone')} checked={filter === 'undone'}/>
                        <span>Incomplete</span>
                    </label>
                </form>
            </div>
            <ul className='tasks'>
                {
                    (filteredTasks.length === 0) ? (
                        <p className='emptyMessage'>... There are no tasks ... </p> 
                    ) : (
                        filteredTasks.map((task, index) => (
                            <li key={index}>
                                <label>
                                    <input type='checkbox' checked={task.completed} className="checkbox-round" value={task.text} onChange={() => handleCompletedTask(task.index)} />
                                    { task.text }
                                </label>
    
                                <button onClick={() => handleRemoveTask(task.index)}>&#10005;</button>
                            </li>
                        ))
                    )
                }
            </ul>
            <form>
                <input type="text" placeholder='Add a new task ...' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                <button onClick={handleAddTask}>Add</button>
            </form>
        </div>
    );
};



export default ToDoList;