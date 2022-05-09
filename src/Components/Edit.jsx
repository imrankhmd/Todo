import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { editTodos } from "../Redux/action";


export const Edit = () => {
    const [subtaskTitle, setSubtaskTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const todo = useSelector(state => state.todos).filter(item => item.id === id)[0];
    const [data, setData] = useState(todo);
    const [tags, setTags] = useState(todo.tags);
    const [subtasks, setSubtasks] = useState(todo.subtasks);
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

    const handleEditTodo = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            subtasks,
            tags
        }
        dispatch(editTodos(id, payload))
            .then(res => {
                if (res.success) {
                    navigate.goBack();
                }
            })
    }

    const handleDelete = (itemId) => {
        setSubtasks([...subtasks.filter(item => item.id !== itemId)]);
    }
    const { title, description, date, category } = data;
    return (
        <div style={{ display: "flex" }}>
            <Dashboard />
            <form onSubmit={handleEditTodo} style={{ width: "70%", margin: "auto", textAlign: "center" }}>
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
                    <input type="radio" name="category" checked={category === "Todo" ? true : false} value="Todo" id="todo" onChange={handleChange} />
                    <label htmlFor="todo">Todo</label>
                    <input type="radio" name="category" checked={category === "In Progress" ? true : false} value="In Progress" id="inProgress" onChange={handleChange} />
                    <label htmlFor="inProgress">In Progress</label>
                    <input type="radio" name="category" checked={category === "Done" ? true : false} value="Done" id="done" onChange={handleChange} />
                    <label htmlFor="done">done</label>
                </div>
                <div>
                    <input type="checkbox" name="Official" id="official" checked={tags.includes("Official") ? true : false} onChange={handleCheckbox} />
                    <label htmlFor="official">Official</label>
                    <input type="checkbox" name="Personal" id="personal" checked={tags.includes("Personal") ? true : false} onChange={handleCheckbox} />
                    <label htmlFor="personal">Personal</label>
                    <input type="checkbox" name="Others" id="others" checked={tags.includes("Others") ? true : false} onChange={handleCheckbox} />
                    <label htmlFor="others">Others</label>
                </div>
                <input type="submit" value="Confirm Edit" />
            </form>
        </div>
    )
}