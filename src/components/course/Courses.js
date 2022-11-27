import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import PresentationCard from "./PresentationCard";
import TableHead from "./table/TableHead";

import { getCourses } from "../../store/actions/courseActions";

import "../../assets/scss/comments.scss";

function Courses() {
  const stateCourses = useSelector((state) => state.course.courses);

  const dispatch = useDispatch();
  const [courses, setCourses] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [search, setSearch] = useState("");

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
      let moyenne = 0;
      courses.map((course) => {
        axios
          .get(
            `${process.env.REACT_APP_UDEMY_HOSTNAME}/taught-courses/questions/?status=unread&course=${course.id}/?page_size=100`,
            config
          )
          .then(async (res) => {
            const results = await axios.get(
              `${process.env.REACT_APP_UDEMY_HOSTNAME}/taught-courses/reviews/?course=${course.id}/?page_size=100`,
              config
            );
            let rating = 0;

            results.data.results?.map((review) => {
              rating = rating + review.rating;
            });

            rating == 0 ? (moyenne = 0) : (moyenne = rating / results.data.results.length);

            tab = tab.concat({
              id: course.id,
              title: course.published_title,
              count: res.data.count,
              avg: Math.round(moyenne * 100) / 100,
            });
            setCompletedCourses(tab);
          })
          .catch((err) => {
            console.error(err);
          });
      });
    }
  }, [stateCourses, courses]);

  const columns = [
    { label: "Filtrer", accessor: "title", sortable: true },
    { label: "Status", accessor: "count", sortable: true },
    { label: "Note moyenne", accessor: "avg", sortable: true },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...completedCourses].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setCompletedCourses(sorted);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <PresentationCard />
      </div>

      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Cours</span>
      </h4>

      <div className="row">
        <div className="card">
          <div className="d-flex align-center justify-between">
            <h5 className="card-header">Tout les cours</h5>

            <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0"></i>
                <input
                  type="search"
                  className="form-control border-0 shadow-none"
                  placeholder="Rechercher..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <TableHead {...{ columns, handleSorting }} />

              <tbody className="table-border-bottom-0">
                {completedCourses != null ? (
                  completedCourses
                    ?.filter((item) => {
                      if (search.length > 0 && item.title != null) {
                        return item.title
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase());
                      }
                      return item.title;
                    })
                    .map((course, index) => {
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
                          <td>
                            <span className="badge bg-label-primary me-1">
                              {course.avg}
                            </span>
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
