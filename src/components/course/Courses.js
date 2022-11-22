import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import PresentationCard from "./PresentationCard";

import { getCourses } from "../../store/actions/courseActions";

function Courses() {
  const stateCourses = useSelector((state) => state.course.courses);

  const dispatch = useDispatch();
  const [courses, setCourses] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);

  const token = `${process.env.REACT_APP_UDEMY_CLIENT_API}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (stateCourses === null) dispatch(getCourses());
    else setCourses(stateCourses);

    if (courses != null) {
      let tab = [];
      courses.map((course) => {
        axios
          .get(
            `${process.env.REACT_APP_UDEMY_HOSTNAME}/taught-courses/questions/?status=unread&course=${course.id}/?page_size=100`,
            config
          )
          .then((res) => {
            tab = tab.concat({
              id: course.id,
              title: course.published_title,
              count: res.data.count,
            });
            setCompletedCourses(tab);
          })
          .catch((err) => {
            console.error(err);
          });
      });
    }
  }, [stateCourses, courses]);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <PresentationCard />
      </div>

      <div className="row">
        <div className="card">
          <h5 className="card-header">Tout les cours</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Cours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {completedCourses != null ? (
                  completedCourses?.map((course, index) => {
                    return (
                      <tr key={course.id}>
                        <td>
                          <Link
                            to="/course-detail"
                            state={{
                              data: {
                                id: course.id,
                                title: course.title,
                              },
                            }}
                          >
                            <strong>{course.title}</strong>
                          </Link>
                        </td>
                        <td>
                          {course.count > 0 ? (
                            <span className="badge bg-label-success me-1">
                              {course.count}&nbsp;question(s) non lue(s)
                            </span>
                          ) : (
                            <span className="badge bg-label-secondary me-1">
                              {course.count}&nbsp;question(s) non lue(s)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Chargement...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
