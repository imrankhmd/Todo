import { useSelector } from "react-redux";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { Registration } from "./Registration";
import { Todos } from "./Todos";

export const Home = () => {
    const isRegistered = useSelector(state => state.isRegistered);
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return !isRegistered ?
        <Registration /> : !isLoggedIn ? <Login /> :
            <div style={{ display: "flex" }}>
                <Dashboard />
                <Todos />
            </div>
}