import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/layout/header';

/** TODO: Add support for meta */
export default function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}