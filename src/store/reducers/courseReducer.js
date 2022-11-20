// Initial state
const initialState = {
  courses: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COURSES":
    case "COURSE_LOADED":
      return {
        ...initialState,
        courses: action.courses,
      };
    case "EMPTY_COURSES":
      return {
        courses: null,
      };
    default:
      return state;
  }
};

export default courseReducer;
