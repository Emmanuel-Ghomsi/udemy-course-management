import { Routes, Route } from "react-router-dom";
import Aside from "../components/Aside";
// import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer";
import Courses from "../components/course/Courses";
import CourseDetails from "../components/course/CourseDetails";

function Dashboard() {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Aside />
          <div className="layout-page">
            {/* <Navigation />*/}
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Courses />} />
                <Route path="/course-detail/*" element={<CourseDetails />} />
              </Routes>
              <Footer />
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
}

export default Dashboard;
