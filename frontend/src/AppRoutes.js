import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from './pages/Users';

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Users/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes