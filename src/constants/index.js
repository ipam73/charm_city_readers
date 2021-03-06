var keyMirror = require('keymirror');

// key mirror creates an object with values equal to its key names
module.exports = keyMirror({
  GET_STUDENT_LIST: null,
  SET_STUDENT_TIME: null,
  ADD_STUDENT: null,
  ADD_STUDENT_SUCCESS: null,
  ADD_STUDENT_FAILURE: null,
  SET_STUDENT_TIME_STATE: null,
  SET_STUDENT_BUDDY: null,
  SET_LOADING: null,
  TIME_FORM_IS_VALID: null,
  TRIGGER_ADD_STUDENT: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGOUT_SUCCESS: null,
  CREATE_USER_FAILURE: null,
});
