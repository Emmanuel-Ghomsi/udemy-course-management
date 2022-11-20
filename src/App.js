import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./routes/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadCourses } from "./store/actions/courseActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCourses());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Router />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
