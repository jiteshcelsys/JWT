import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invalid from "./component/Invalid";
import Navbar from "./component/Navbar";
import { UserIn } from "./component/userIN";
import Homepage from "./Hompage";
function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/content" element={<Homepage />} />
          <Route path="/404" element={<Invalid />} />
          <Route path="/user" element={isLoggedIn ? <UserIn /> : <Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
