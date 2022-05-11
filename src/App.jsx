import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components";
import { Authenticate, Error, Home } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
