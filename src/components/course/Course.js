import { Link } from "react-router-dom";

function Course(props) {
  const data = {
    id: props.id,
    title: props.title,
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to="/course-detail" state={{data : data}}>
          <h5 className="card-title">{props.title}</h5>
        </Link>
      </div>
    </div>
  );
}

export default Course;
