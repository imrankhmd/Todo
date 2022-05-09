import React from "react";
import { useSelector } from "react-redux";

export const Summary = () => {
    const todos = useSelector(state => state.todos);
    const todoCategory = todos.filter(item => item.category === "Todo").length;
    const inProgressCategory = todos.filter(item => item.category === "In Progress").length;
    const doneCategory = todos.filter(item => item.category === "Done").length;
    return (
        <div>
            <h2>SUMMARY</h2>
            <div style={{ border: "1px solid black", width: "200px", display: "flex", justifyContent: "space-around", backgroundColor: "#B4FF9F", color: "#035397" }}>
                <div>
                    <p>TODO</p>
                    <p>IN PROGRESS</p>
                    <p>DONE</p>
                </div>
                <div>
                    <p>{todoCategory}</p>
                    <p>{inProgressCategory}</p>
                    <p> {doneCategory}</p>
                </div>
            </div>
        </div>
    )
}