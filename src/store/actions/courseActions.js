import axios from "axios";

const token = `${process.env.REACT_APP_UDEMY_CLIENT_API}`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getCourses = () => {
  return (dispatch, getState) => {
    findCourses()
      .then((res) => {
        dispatch({
          type: "GET_COURSES",
          courses: res.data.results,
        });
      })
      .catch((err) => {
        dispatch({
          type: "EMPTY_COURSES",
        });
      });
  };
};

export const loadCourses = () => {
  return (dispatch, getState) => {
    const courses = getState().course.courses;
    const questionsList = getState().course.questionsList;
    const reviewsList = getState().course.reviewsList;

    if (courses) {
      dispatch({
        type: "COURSE_LOADED",
        courses,
        questionsList,
        reviewsList,
      });
    } else return null;
  };
};

const findCourses = () => {
  return axios.get(
    `${process.env.REACT_APP_UDEMY_HOSTNAME}/taught-courses/courses/?page_size=100`,
    config
  );
};
