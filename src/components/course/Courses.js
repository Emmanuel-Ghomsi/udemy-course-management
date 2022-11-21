import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import PresentationCard from "./PresentationCard";

import { getCourses } from "../../store/actions/courseActions";

function Courses() {
  const stateCourses = useSelector((state) => state.course.courses);

  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [openId, setOpenId] = useState("");
  const [unReadQuestions, setUnReadQuestions] = useState(null);

  const token = `${process.env.REACT_APP_UDEMY_CLIENT_API}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (stateCourses === null) dispatch(getCourses());
    else setCourses(stateCourses);
  }, [stateCourses]);

  const countUnReadQuestions = (course) => {
    axios
      .get(
        `${process.env.REACT_APP_UDEMY_HOSTNAME}/taught-courses/questions/?status=unread&course=${course}/?page_size=100`,
        config
      )
      .then((res) => {
        setUnReadQuestions(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpenId(course);
  };

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
                  <th>Status (Survoler le cours pour afficher son statut)</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {courses.map((course, index) => {
                  return (
                    <tr
                      key={course.id}
                      onMouseOver={(event) => {
                        event.stopPropagation();
                        countUnReadQuestions(course.id);
                        event.preventDefault();
                      }}
                    >
                      <td>
                        <Link
                          to="/course-detail"
                          state={{
                            data: {
                              id: course.id,
                              title: course.published_title,
                            },
                          }}
                        >
                          <strong>{course.published_title}</strong>
                        </Link>
                      </td>
                      <td>
                        {openId == course.id ? (
                          <span className="badge bg-label-warning me-1">
                              {unReadQuestions}&nbsp;question(s) non lue(s)
                            </span>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
