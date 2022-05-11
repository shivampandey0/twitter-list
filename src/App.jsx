import React from "react";
import { Route, Routes } from "react-router-dom";
import { Error, Home } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
