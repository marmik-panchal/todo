import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from '../component/todo/Todo';

const MainRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element=<Todo /> />
        </Routes>
    );
};

export default MainRoutes;
