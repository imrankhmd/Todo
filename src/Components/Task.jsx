import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { v4 as uuid } from "uuid";
import { setTodos } from "../Redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const initData = {
    title: "",
    date: "",
    description: "",
    category: "",
}
export const Task = () => {
    const [data, setData] = useState(initData);
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskTitle, setSubtaskTitle] = useState("");
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleSubtask = (e) => {
        e.preventDefault();
        const payload = {
            id: uuid(),
            task: subtaskTitle,
            status: false
        }
        setSubtasks([...subtasks, payload]);
    }
    const handleCheckbox = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            setTags([...tags, name]);
        } else {
            setTags(tags.filter(item => item !== name))
        }
    }
    const handleCreateTodo = (e) => {
        e.preventDefault();
        const payload = {
            id: uuid(),
            ...data,
            subtasks,
            tags
        }
        dispatch(setTodos(payload))
            .then(res => {
                if (res.success) {
                    navigate.goBack();
                }
            })
    }
    const handleDelete = (itemId) => {
        setSubtasks([...subtasks.filter(item => item.id !== itemId)]);
    }
    const { title, description, date } = data;

    return (
        <div style={{ display: "flex", border: "1px solid black", backgroundColor: "#B4FF9F" }}>
            <Dashboard />
            <form onSubmit={handleCreateTodo} style={{ width: "70%", margin: "auto", textAlign: "center" }}>
                <input value={title} type="text" name="title" placeholder="Title" onChange={handleChange} /><br />
                <textarea value={description} name="description" cols="30" rows="10" placeholder="Description" onChange={handleChange} />
                <div>
                    <input type="text" placeholder="Sub Task" onChange={e => setSubtaskTitle(e.target.value)} />
                    <input type="submit" value="ADD" onClick={handleSubtask} />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {
                            subtasks?.map(item => (
                                <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }} >
                                    <h4>{item.task}</h4>
                                    <FontAwesomeIcon onClick={() => handleDelete(item.id)} icon={faTrashAlt} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <input value={date} type="date" name="date" onChange={handleChange} />
                <div>
                    <input type="radio" name="category" value="Todo" id="todo" onChange={handleChange} />
                    <label htmlFor="todo">Todo</label>
                    <input type="radio" name="category" value="In Progress" id="inProgress" onChange={handleChange} />
                    <label htmlFor="inProgress">In Progress</label>
                    <input type="radio" name="category" value="Done" id="done" onChange={handleChange} />
                    <label htmlFor="done">done</label>
                </div>
                <div>
                    <input type="checkbox" name="Official" id="official" onChange={handleCheckbox} />
                    <label htmlFor="official">Official</label>
                    <input type="checkbox" name="Personal" id="personal" onChange={handleCheckbox} />
                    <label htmlFor="personal">Personal</label>
                    <input type="checkbox" name="Others" id="others" onChange={handleCheckbox} />
                    <label htmlFor="others">Others</label>
                </div>
                <input type="submit" value="Create New Task" />
            </form>
        </div>
    )
}