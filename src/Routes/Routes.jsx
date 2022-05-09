import React from "react";
import { Route, Routes } from "react-router-dom";
import { Edit } from "../Components/Edit";
import { Home } from "../Components/Home";
import { Task } from "../Components/Task";
import { Summary } from "../Components/Summary";
import { Notfound } from "../Components/NotFound";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>

            </Route>
            <Route path="/add-task" element={<Task />}>

            </Route>
            <Route path="/edit/:id" element={<Edit />}>

            </Route>
            <Route path="/summary" element={<Summary />}>

            </Route>
            <Route path="*" element={<Notfound />}>

            </Route>
        </Routes>
    )
}