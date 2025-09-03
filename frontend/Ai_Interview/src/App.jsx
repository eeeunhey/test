import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import Login from "./pages/auth/Login"
import MyPage from "./pages/auth/MyPage";
import SignUp from "./pages/auth/SignUp";
import LandingPage from "./pages/LandingPage";
import SessionDetail from "./pages/Reports/SessionDetail";



const App = () => {
    return (
        <div >
            <Router>
              <Routes>
                <Route path ="/" element={<LandingPage />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/session/:id" element={<SessionDetail />} />
              </Routes>
            </Router>

            <Toaster 
              toastOptions={{
                className: "",
                style: {
                    fontSize: "13px",
                },
              }}  
            />

        </div>
    );
};

export default App