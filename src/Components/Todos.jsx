import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTodos } from "../Redux/action";
import { Todoo } from "./Todoo";

export const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);

    const todoCategory = todos.filter(item => item.category === "Todo");
    const inProgressCategory = todos.filter(item => item.category === "In Progress");
    const doneCategory = todos.filter(item => item.category === "Done");
    
    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch])
    return (
        <div>
            <Link to="/add-task"><h3>ADD NEW TASK</h3></Link>
            <Link to="/summary"><h3>SUMMARY</h3></Link>
            <div style={{ display: "flex", backgroundColor: "#B4FF9F", color: "#035397" }} >
                <div style={{ border: "1px solid black", padding: "20px" }}>
                    <h1>TODO</h1>
                    {
                        todoCategory?.map(item => (
                            <Todoo key={item.id} {...item} />
                        ))
                    }
                </div>
                <div style={{ border: "1px solid black", padding: "20px" }}>
                    <h1>IN PROGRESS</h1>
                    {
                        inProgressCategory?.map(item => (
                            <Todoo key={item.id} {...item} />
                        ))
                    }
                </div>
                <div style={{ border: "1px solid black", padding: "20px" }}>
                    <h1>DONE</h1>
                    {
                        doneCategory?.map(item => (
                            <Todoo key={item.id} {...item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}