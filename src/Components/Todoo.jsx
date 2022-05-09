import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editTodos, getTodos } from "../Redux/action";

export const Todoo = ({ id, title, tags, date, description, subtasks, category }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleEdit = () => {
        navigate.push(`/edit/${id}`);
    }
    const handleStatus = (id, subtaskId) => {
        subtasks = subtasks.map(item => {
            if (item.id === subtaskId) {
                return { ...item, status: !item.status }
            }
            return item
        });
        const payload = {
            title, date, description, subtasks, category, tags
        }

        dispatch(editTodos(id, payload))
            .then(res => {
                if (res.success) {
                    dispatch(getTodos());
                }
            })
    }

    return (
        <div style={{ border: "1px solid black", padding: "20px"}}>
            <h3>Title: <span>{title}</span></h3>
            <div>
                {tags?.map((item, index) => (
                    <span style={{ border: "1px solid black", padding: "5px" }} key={index}>{item}</span>
                ))}
            </div>
            <p>Date: <span>{date}</span></p>
            <p>Description: {description}</p>
            {
                subtasks?.map(item => (
                    <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <input type="checkbox" checked={item.status} onChange={() => handleStatus(id, item.id)} />
                        <p>{item.task}</p>
                        <h5>{item.status ? "Completed" : "Not Completed"}</h5>
                    </div>
                ))
            }
            <button onClick={() => handleEdit(id)}>EDIT</button>
        </div>
    )
}