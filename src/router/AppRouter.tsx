import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../views/Home'

const AppRouter: React.FC = () => {
    const DEFAULT_HOME = "/";

    return (
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
            <Routes>
                <Route path={DEFAULT_HOME} element={<Home />}>
                    <Route index path={"home"} element={<Home />} />
                </Route>
                <Route path={"*"} element={<Navigate to={DEFAULT_HOME} replace={true} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter