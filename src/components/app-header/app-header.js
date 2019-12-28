import React from 'react';
import './app-header.css';

const AppHeader = ({ todo, done }) => {
    return (
        <div className="app-header d-flex">
            <h1>Todo App</h1>
            <h2>{todo} more todo {done} done</h2>
        </div>
    );
};

export default AppHeader;