import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../Redux/action";
import "./Login.css"

export const Login = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [loginUserName, setLogUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ password: loginPassword, username: loginUserName }))
    }
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />
    }
    return (
        <div className="LoginDiv">
            <form onSubmit={handleLogin} className="LoginForm">
                <input type="text" placeholder="User Name" onChange={e => setLogUserName(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setLoginPassword(e.target.value)} />
                <br />
                <input type="submit" value="LOGIN" />
            </form>
        </div>
    )
}