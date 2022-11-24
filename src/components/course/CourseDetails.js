import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Question from "./course-details/Question";
import Review from "./course-details/Review";

function CourseDetails(props) {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <Link to="/">
          <span className="text-muted fw-light">Cours / </span>
        </Link>
        {data.title}
      </h4>

      <div className="row">
        <div className="col-12">
          <div className="nav-align-top mb-4">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link active"
                  role="tab"
                  data-bs-toggle="tab"
                  data-bs-target="#questions"
                  aria-controls="questions"
                  aria-selected="true"
                >
                  Questions
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link"
                  role="tab"
                  data-bs-toggle="tab"
                  data-bs-target="#reviews"
                  aria-controls="reviews"
                  aria-selected="false"
                >
                  Reviews
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="questions"
                role="tabpanel"
              >
                <Question id={data.id} />
              </div>
              <div className="tab-pane fade" id="reviews" role="tabpanel">
                <Review id={data.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
