import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../Redux/action";


export const Dashboard = () => {
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userData);
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const username = useSelector(state => state.username);

    const allTodos = todos.length;
    const personalTodos = todos.filter(item => item.tags.includes("Personal")).length;
    const otherTodos = todos.filter(item => item.tags.includes("Others")).length;
    const officialTodos = todos.filter(item => item.tags.includes("Official")).length;

    useEffect(() => {
        dispatch(getProfile({ username: username, token: token }))
    }, [username, token, dispatch])

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div>
            <div style={{ border: "1px solid black", padding: "10px", margin: "10px", backgroundColor: "#B4FF9F", color: "#035397" }}>
                <h4>PROFILE</h4>
                <p>Name: {userData.name}</p>
                <p>Mobile: {userData.mobile}</p>
                <p>Description: {userData.description}</p>
            </div>
            <div style={{ border: "1px solid black", padding: "10px", margin: "10px", backgroundColor: "#B4FF9F", color: "#035397" }}>
                <p >ALL: <span>{allTodos}</span></p>
                <p >Personal: <span>{personalTodos}</span></p>
                <p >Official: <span>{officialTodos}</span></p>
                <p >Others: <span>{otherTodos}</span></p>
            </div>
            <div>
                <button onClick={handleLogout} style={{
                    padding: "20px", marginLeft: "10px", fontSize: "18px", fontWeight: "700", color: "#112B3C",
                    backgroundColor: "#F66B0E"
                }}>LOG OUT</button>
            </div>
        </div>
    )
}