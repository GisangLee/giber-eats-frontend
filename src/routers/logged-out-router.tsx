import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from '../pages/login';
import { CreateAccount } from '../pages/signup';

export const LoggedoutRouter = () =>{

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/create-account" element={<CreateAccount/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};