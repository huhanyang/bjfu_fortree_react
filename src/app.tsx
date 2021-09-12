import {ErrorBoundary} from "./component/error-boundary";
import {FullPageErrorFallback} from "./component/lib";
import {Navigate, Route, Routes} from "react-router";
import {BackPage} from "./page/back";
import {FrontPage} from "./page/front";
import React from "react";
import './app.css';


export const App = () => {
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                <Routes>
                    <Route path="/front/*" element={<FrontPage/>}/>
                    <Route path="/back/*" element={<BackPage/>}/>
                    <Navigate to="/front"/>
                </Routes>
            </ErrorBoundary>
        </div>
    );
}