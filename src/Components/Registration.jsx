import { useState } from "react";
import { registration } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import "./Registration.css"

const initData = {
    name: "",
    email: "",
    username: "",
    password: "",
    mobile: "",
    description: ""
}
export const Registration = () => {

    const isError = useSelector(state => state.isError);
    const [userData, setUserData] = useState(initData);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        dispatch(registration({ ...userData }));
    }
    const { name, email, username, password, mobile, description } = userData;

    return (<div className="registerdiv">
        {isError && <p>An error has occured...</p>}
        <form onSubmit={handleRegistration} className="RegisterForm">
            <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="username" value={username} onChange={handleChange} placeholder="User Name" />
            <br />
            <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
            <input type="number" name="mobile" value={mobile} onChange={handleChange} placeholder="Mobile" />
            <input type="text" name="description" value={description} onChange={handleChange} placeholder="Description" />
            <br />
            <input type="submit" value="REGISTER" />
        </form>
    </div>)
}