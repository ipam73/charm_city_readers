var Constants = require("../constants");
var _ = require("underscore");
var moment = require("moment");

var END_DATE = moment('2016-08-5');

var initialState = {
  studentList: {},
  timeForm: {},
  user: null, // auth.currentUser,
  isAuthenticated: false,
  errorMessage: '',
  weeksLeft: 0,
};

function getTotalTimeForStudent(student) {
  var time_log = student.time_log;
  var total_time = 0;

  if (time_log !== null && typeof time_log === 'object') {
    total_time = _.reduce(time_log, function(memo, num){ return memo + parseInt(num); }, 0);
  }

  return total_time;
}

function calculateWeeksLeft() {
  var today = moment(new Date());
  var duration = moment.duration(END_DATE.diff(today));
  var weeksLeft = duration.asWeeks();
  return Math.floor(weeksLeft);
}

function rootReducer(state, action) {
  if (!state) state = initialState;
  var newstate = _.clone(state);
  newstate.errorMessage = '';

  switch (action.type) {
    case Constants.GET_STUDENT_LIST:
      newstate.weeksLeft = calculateWeeksLeft();
      newstate.studentList = action.studentList; // whatever is returned from the list
      // not sure if we want to do this here or not
      var studentIDs = Object.keys(newstate.studentList);
      for (var student_id of studentIDs) {
        var totalTime = getTotalTimeForStudent(newstate.studentList[student_id]);
        newstate.studentList[student_id].total_mins = totalTime;
        newstate.timeForm[student_id] = {
          errors: {},
          formIsValid: true,
          timeRead: 0,
        };
      }
      // not sure if we want to do this here or not

      return newstate;

    case Constants.ADD_STUDENT:
      return newstate;

    case Constants.ADD_STUDENT_SUCCESS:
      return newstate;

    case Constants.ADD_STUDENT_FAILURE:
      return newstate;

    case Constants.SET_STUDENT_TIME:
      newstate.timeForm[action.studentID].timeRead = action.readTime;
      return newstate;

    case Constants.TIME_FORM_IS_VALID:
      newstate.timeForm[action.studentID].errors = action.errors;
      newstate.timeForm[action.studentID].formIsValid = action.formIsValid;
      return newstate;

    case Constants.SET_STUDENT_TIME_STATE:
      newstate.timeForm[action.studentID].timeRead = action.timeRead;
      return newstate;

    case Constants.LOGIN_SUCCESS:
      console.log("in login success user is: ", action.user);
      newstate.user = {
        displayName: action.user.displayName,
        uid: action.user.uid,
      };
      newstate.isAuthenticated = true;
      return newstate;

    case Constants.LOGIN_FAILURE:
      // console.log("in login failure");
      newstate.errorMessage = "Sign in failed, please try again with another username and/or password.";
      newstate.user = null;
      newstate.isAuthenticated = false;
      return newstate;

    case Constants.LOGOUT_SUCCESS:
      // reset everything to initial state
      // newstate.user = null;
      // newstate.isAuthenticated = false;
      return _.clone(initialState);

    case Constants.CREATE_USER_FAILURE:
      newstate.user = null;
      newstate.errorMessage = "There was a problem creating your account, please try again with another username and/or password.";
      if (action.error.code === 'INVALID_EMAIL') {
        newstate.errorMessage = "There was a problem creating your account, email is invalid.";
      } else if (action.error.code === 'EMAIL_TAKEN') {
        newstate.errorMessage = "There was a problem creating your account, email is already taken.";
      }
      return newstate;

    default:
      return newstate;
  }
}

module.exports = rootReducer;
