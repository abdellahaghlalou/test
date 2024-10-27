import React from "react";
import Header from "./header";
import Dashboard from "./pages/dashboard";

import "./index.css";

function ApplicationRoot() {
    return (
        <div className="app-root">
            <Header />
            <Dashboard />
        </div>
    );
}

export default ApplicationRoot;
