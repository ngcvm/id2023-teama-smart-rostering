/**
 * Main Application script
 */
import React, { FunctionComponent } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Roster from "./pages/Roster/Roster";

const App: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roster" element={<Roster />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/scheduler/docs/guide/Scheduler/integration/react/data-binding

export default App;
