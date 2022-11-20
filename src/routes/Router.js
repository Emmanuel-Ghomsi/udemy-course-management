import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}