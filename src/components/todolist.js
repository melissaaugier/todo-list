import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './todolist.css';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [lastIndex, setLastIndex] = useState(0);
    const [displayTasks, setDisplayTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        const filteredTasks = tasks.filter((task) => {
            if (filter === 'done') return task.completed;
            if (filter === 'undone') return !task.completed;
            return true;
        });

        setDisplayTasks(filteredTasks);

    }, [filter, tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setLastIndex(lastIndex + 1);
            setTasks([...tasks, { text: newTask, completed: false, index: lastIndex }]);
            setNewTask('');
            setFilter('all');
        }
    };

    const handleRemoveTask = (index) => {
        setTasks(tasks.filter((task) => task.index !== index));
    };

    const handleCompletedTask = (index) => {
        const updatedTasks = tasks.map((task) => (
            task.index === index ? { ...task, completed: !task.completed } : task
        ));
        setTasks(updatedTasks);
    };

    const handleEditClick = (index) => {
        const taskEdit = tasks.find((task) => task.index === index )
        setEditIndex(taskEdit.index);
        setEditText(taskEdit.text);
    };

    const handleSaveEdit = (index) => {
        const updatedTasks = tasks.map(task => 
            task.index === index ? { ...task, text: editText} : task 
        );

        setTasks(updatedTasks);
        setEditIndex(null);
    };

    const handleCancelEdit = (index) => {
        setEditIndex(null);
    };


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
                        <input type='radio' name='filter' onChange={() => setFilter('done')} checked={filter === 'done'} />
                        <span>Completed</span>
                    </label>
                    <label>
                        <input type='radio' name='filter' onChange={() => setFilter('undone')} checked={filter === 'undone'} />
                        <span>Incomplete</span>
                    </label>
                </form>
            </div>
            <ul className='tasks'>
                {displayTasks.length === 0 ? (
                    <p className='emptyMessage'>... There are no tasks ... </p>
                ) : (
                    <TransitionGroup className="todo-list">
                        {displayTasks.map((task) => (
                            <CSSTransition
                                key={task.index}
                                timeout={500}
                                classNames="item"
                            >
                                { task.index === editIndex ? (
                                    <li>
                                        <label>
                                            <input
                                                type='checkbox'
                                                checked={task.completed}
                                                className="checkbox-round"
                                                onChange={() => handleCompletedTask(task.index)}
                                            />
                                            <input type='text' value={editText} autoFocus onChange={(e) => setEditText(e.target.value)}/>
                                        </label>
                                        <div>
                                            <button className='btn-green' onClick={() => handleSaveEdit(task.index)}>Save</button>
                                            <button className='btn-red' onClick={() => handleCancelEdit()}>Cancel</button>
                                        </div>
                                    </li>
                                ) : (
                                    <li>
                                        <label>
                                            <input
                                                type='checkbox'
                                                checked={task.completed}
                                                className="checkbox-round"
                                                onChange={() => handleCompletedTask(task.index)}
                                            />
                                            {task.text}
                                        </label>
                                        <div>
                                            <button className='btn-yellow' onClick={() => handleEditClick(task.index)}>&#9998;</button>
                                            <button className='btn-red' onClick={() => handleRemoveTask(task.index)}>&#10005;</button>
                                        </div>
                                    </li>
                                )}
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                )}
            </ul>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder='Add a new task ...'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
