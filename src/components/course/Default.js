import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PresentationCard from "./PresentationCard";
import Course from "./Course";

import { getCourses } from "../../store/actions/courseActions";

function Default() {
  const stateCourses = useSelector((state) => state.course.courses);

  const dispatch = useDispatch(); // dispatch events
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (stateCourses === null) dispatch(getCourses());
    else setCourses(stateCourses);
  }, [stateCourses]);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <PresentationCard />
      </div>

      <div className="row">
        {courses.map((course, index) => {
          return (
            <div key={course.id} className="col-md-6 col-xl-4">
              <Course id={course.id} title={course.published_title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Default;
