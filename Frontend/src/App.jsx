import { useState } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Table from "./Components/Table/Table";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Account/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="/table" element={<Table />} />
            <Route path="/profile/:userid" element={ <Profile/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
