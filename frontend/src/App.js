import React from "react";
import Form from "./Form/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListData from "./ListData/ListData";
import Navbar from "./Navbar/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/list-data" element={<ListData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
