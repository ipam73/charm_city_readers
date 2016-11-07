var Constants = require('../constants');
var _ = require("underscore");
var moment = require("moment");

// Initialize Firebase
import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCAAUrjrCNH_xCigW0T9qZxqeuaUpfcKmw",
    authDomain: "reading-challenge.firebaseapp.com",
    databaseURL: "https://reading-challenge.firebaseio.com",
    storageBucket: "firebase-reading-challenge.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
var firebaseRef = firebaseApp.database().ref();
var db = firebase.database();


function authFailure(err) {
  console.log("authFailure:", err);
  return {
    type: Constants.LOGIN_FAILURE,
    error: err,
  };
}

// action to login to Google via a popup. Dispatch error or user
function loginWithGoogle() {

  return function(dispatch) {
    (new Firebase(firebaseURI)).authWithOAuthPopup('google').then(function(result) {
      // console.log("oauth from google login complete", result);
      var token = result.token; // empty in current scope
      var user = result.google;
      user.uid = result.uid;
      dispatch(loginSuccess(token, user));
      // console.log("dispatching to push /about")
      dispatch(getStudentList(user.uid));
      // dispatch(push("/"));
    }).catch(function(err) {
      // console.log("error logging in with google", err);
      dispatch(authFailure(err));
    });
  };
}

function loginWithPassword(email, password) {

  return function(dispatch) {
    (new Firebase(firebaseURI)).authWithPassword({email: email, password:password}).then(function(result) {
      // console.log("login with email/password complete", result);
      var user = {
        displayName: email,
        uid: result.uid,
      };
      dispatch(loginSuccess(null, user));
      dispatch(getStudentList(user.uid));
      // dispatch(push("/"));
    }).catch(function(err) {
      // console.log("error logging in with email/password", err);
      dispatch(authFailure(err));
    });
  }
}

function setLoading() {
  return {
    type: Constants.SET_LOADING,
  };
}

function loginWithPasswordNative(email, password, navigator) {
  console.log("trying to log in w/password");
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {

      console.log("login with email/password complete", result);
      var user = firebase.auth().currentUser;

      var responseUser = {
        displayName: "",
        uid: "",
      };

      if (user) {
        var name = user.displayName;
        var email = user.email;
        var uid = user.uid;

        responseUser.displayName = email;
        responseUser.uid = uid;
      } else {
        console.log("did not find user!", result);
      }
      dispatch(loginSuccess(null, responseUser));
    }).catch(function(err) {
      console.log("error logging in with email/password", err);
      dispatch(authFailure(err));
    });
  }
}

function createUserFailure(err) {
  // console.log("authFailure:", err);
  return {
    type: Constants.CREATE_USER_FAILURE,
    error: err,
  };
}

function createUserNative(email, password, navigator) {
  console.log("trying to create a new user: ");
  return function(dispatch) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      dispatch(loginWithPasswordNative(email, password, navigator));
    }).catch(function(err) {
      console.log("in catch, there is an error!");
      dispatch(createUserFailure(err));
    });
  };
}

function createUser(email, password) {
  return function(dispatch) {
    (new Firebase(firebaseURI)).createUser({email: email, password:password}).then(function(result) {
      dispatch(loginWithPassword(email, password));
    }).catch(function(err) {
      dispatch(createUserFailure(err));
    });
  };
}


function logoutMobile(navigator) {

  return function(dispatch) {
    firebase.auth().signOut().then(() => {
      dispatch(logoutSuccess());
    }, (err) => {
      dispatch(authFailure(err));
    });
  };
}

function logout() {

  return function(dispatch) {
    firebaseRef.unauth().then(() => {
      dispatch(logoutSuccess());
      // dispatch(push("/login"));
    }, (err) => {
      dispatch(authFailure(err));
    });
  };
}

function loginSuccess(token, user) {
  console.log("*** in login success", user);
  // TODO: ensure that firebase ref for this user exists
  // console.log("go to / on loginSuccess");
  return {
    type: Constants.LOGIN_SUCCESS,
    user: user,
  };
}

function logoutSuccess() {
  // TODO: ensure that firebase ref for this user exists
  return {
    type: Constants.LOGOUT_SUCCESS,
  };
}

// check if user is logged in. return user
function isLoggedIn() {
  var firebaseUser = firebaseRef.getAuth();
  // console.log("IS_LOGGED_IN. firebaseUser:", firebaseUser);
  var user = null;
  if (firebaseUser) {

    user = firebaseUser[firebaseUser.provider];
    // hack for displayName to exist
    if (firebaseUser[firebaseUser.provider].displayName) {
      user.displayName = firebaseUser[firebaseUser.provider].displayName;
    } else {
      user.displayName = firebaseUser[firebaseUser.provider].email;
    }
    user.uid = firebaseUser.uid;
  }

  return user;
};

function restoreAuth() {
    // console.log("RESTORE_AUTH");
    return function(dispatch) {
        var user = isLoggedIn();
        if (user) {
          dispatch(loginSuccess(null, user));
          dispatch(getStudentList(user.uid));
        }
    };
}

function triggerAddStudent(parentID) {
  const cleverAuthURL = 'https://reading-challenge.herokuapp.com/addstudent?user=' + parentID;
  console.log("cleverAuthURL", cleverAuthURL);
  return {
    type: Constants.TRIGGER_ADD_STUDENT,
    cleverAuthURL: cleverAuthURL,
  };
}

function addStudent(userID) {
  // uses redux-thunk middleware
  return function(dispatch) {
    var ajaxCall = _postAddStudent(userID);
    console.log('ajax call is: ', ajaxCall);
    ajaxCall.always(_.bind(function() {
      console.log('in always add student');
      // in the future should have a loading screen
    }, this)).done(_.bind(function(data) {
      console.log('in done');
      return dispatch(addStudentSuccess());
    }, this)).fail(_.bind(function() {
      console.log('in fail');
      var errorMessage = "An error has occurred while saving your settings. Please refresh the page. If the error continues, contact support@clever.com.";
      return dispatch(addStudentFailure(errorMessage));
    }, this));
  };
}

function addStudentSuccess() {
  return {
    type: Constants.ADD_STUDENT_SUCCESS,
    studentList: {} //load this in the list in
  };
}

function addStudentIntermediate() {

  return function (dispatch) {

    var ajaxCall = _logoutStudent({student: "my student"});

    ajaxCall.always(_.bind(function() {
      // in the future should have a loading screen
    }, this)).done(_.bind(function(data) {
      return dispatch(addStudentSuccess());
    }, this)).fail(_.bind(function() {
      var errorMessage = "An error has occurred while saving your settings. Please refresh the page. If the error continues, contact support@clever.com.";
      return dispatch(addStudentFailure(errorMessage));
    }, this));
  };

}

function addStudentFailure() {
  // console.log("addStudentFailure: ");
  return {
    type: Constants.ADD_STUDENT_FAILURE,
    studentList: {} //load this in the list in
  };
}

function getChallengeEndDate(students) {
  console.log("in here: getChallengeEndDate");
  return (dispatch, getState) => {
    if (!students) {
      students = {};
      return dispatch(setStudentList(students, ""));
    } else {
      var districtID;

      for (studentID in students) {
        districtID = students[studentID].district_id;
        break;
      }

      if (districtID) {
        // all saved dates are in format YYMMDD
        var ref = db.ref("/challenges/" + districtID).once("value", (snapshot) => {
          dispatch(setStudentList(students, snapshot.val()));
        });        
      } else {
        dispatch(setStudentList(students, ""))
      }


    }
  };
}

function setStudentList(students, challenges) {
  var challengeEndDate = "";
  if (!students) {
    students = {};
  }
  if (challenges) {
    challengeEndDate = challenges.curr_end_date;
  }
  return {
    type: Constants.GET_STUDENT_LIST,
    studentList: students,
    challengeEndDate,
  };
}

// GET ALL THE DATA FOR STUDENTS
function getStudentList(parent_id) {
  console.log("getting all the students!")
  return (dispatch, getState) => {
    var ref = db.ref("/parents/" + parent_id);
    return ref.child("students").once("value", (snapshot) => {
      dispatch(getChallengeEndDate(snapshot.val()));
    });
  };
}

function timeFormIsValid(newTime) {
  var formIsValid = true;
  var errors = {}; // clear any previous errors

  if (newTime === null) {
    errors.minutes = "Value cannot be blank.";
    formIsValid = false;
  }

  var inputTimeIsNumber = !isNaN(newTime);

  if (inputTimeIsNumber === false) {
    errors.minutes = "Please input a valid number.";
    formIsValid = false;
  }

  return {
    type: Constants.TIME_FORM_IS_VALID,
    errors,
    formIsValid,
  };
}

// newTime = {readDate: <string format YYMMDD>, readMinutes: <minutes>}
function setStudentTime(readDate, readTime, studentID, parentID) {
  var parentsRef = db.ref("/parents/" + parentID);
  var studentsTimeLogRef = parentsRef.child("students/" + studentID + "/time_log");

  // sets on time log with date in format:  YYMMDD
  var newTimeLog = {};

  var num = parseInt(readTime) || 0;
  newTimeLog[readDate] = num;
  studentsTimeLogRef.update(newTimeLog);

  return {
    type: Constants.SET_STUDENT_TIME,
    studentID,
    readDate,
    readTime,
  };
}

function setStudentBuddy(buddyName, studentID, parentID) {
  console.log("in set student budy", buddyName, studentID, parentID);
  var parentsRef = db.ref("/parents/" + parentID);
  var studentsBuddyRef = parentsRef.child("students/" + studentID);
  studentsBuddyRef.update({"buddy": buddyName});
  return {
    type: Constants.SET_STUDENT_BUDDY,
    studentID,
  };
}

function setMinsReadState(event, studentID) {
  var value = event.target.value;
  return {
    type: Constants.SET_STUDENT_TIME_STATE,
    studentID,
    timeRead: Number(value),
  };
}

module.exports = {
  getStudentList,
  setStudentTime,
  setStudentBuddy,
  triggerAddStudent,
  addStudent,
  addStudentFailure,
  addStudentSuccess,
  setMinsReadState,
  timeFormIsValid,
  loginWithGoogle,
  loginWithPassword,
  loginWithPasswordNative,
  setLoading,
  createUser,
  createUserNative,
  isLoggedIn,
  restoreAuth,
  logout,
  logoutMobile,
};
