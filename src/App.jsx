import React from "react";
import { Routes, Route } from "react-router-dom";
import LandinPage from "./vendorDashboard/pages/LandinPage"; // Ensure this file exists
import NotFoundPage from "./vendorDashboard/components/Notfound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandinPage />} />
      <Route path="*" element={<NotFoundPage />} /> 
    </Routes>
  );
};

export default App;
