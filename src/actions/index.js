// library that deals with talking to backend
var Constants = require('../constants');
// var $ = require("jquery");
var _ = require("underscore");
var moment = require("moment");
// var { push } = require("react-router-redux")

/////////////////////////////////////////////////////////
// Downgrading to firebase 2.4, since newsest version does not work w/react
// see:  https://medium.com/@Pier/firebase-is-broken-for-react-native-7f78b7a066da#.gotw818vu
// and PR: https://github.com/ipam73/reading-challenge/commit/35247388d6ccc29a8dfd2bb1768da3e13a2c07df
import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCAAUrjrCNH_xCigW0T9qZxqeuaUpfcKmw",
    authDomain: "reading-challenge.firebaseapp.com",
    databaseURL: "https://reading-challenge.firebaseio.com",
    storageBucket: "firebase-reading-challenge.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
var firebaseRef = firebaseApp.database().ref();

// var firebase = require('firebase')
// var config = {
//     apiKey: "AIzaSyCAAUrjrCNH_xCigW0T9qZxqeuaUpfcKmw",
//     authDomain: "reading-challenge.firebaseapp.com",
//     databaseURL: "https://reading-challenge.firebaseio.com",
//     storageBucket: "firebase-reading-challenge.appspot.com",
// };
// firebase.initializeApp(config);
var db = firebase.database();
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Temporary workaround until Firebase fixes bug
// var Firebase = require('firebase');
// var firebaseURI = "https://reading-challenge.firebaseio.com/";
// var firebaseRef = new Firebase(firebaseURI);

// function setFirebaseRef(ref) {
//   return {
//     type: 'FIREBASE_REF_SET',
//     value: ref,
//   };
// }
/////////////////////////////////////////////////////////////

// helper function for ajax calls
function getCookie(name) {
  var parts = document.cookie.split(name + "=");
  if (parts.length === 2) {
    var v = parts.pop().split(";").shift();
    return decodeURIComponent(v);
  }
}

function authFailure(err) {
  // console.log("authFailure:", err);
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

function loginWithPasswordNative(email, password, navigator) {
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
        // var photoUrl = user.photoURL;
        var uid = user.uid;
        console.log("got in here!", user);
        console.log("got:", name, email, uid);
        responseUser.displayName = email;
        responseUser.uid = uid;
        // User is signed in.
      } else {
        console.log("did not find user!", result);

        // No user is signed in.
      }
      // console.log("new user is: ", user);
      dispatch(loginSuccess(null, responseUser));
      // console.log("dispatch new student list ", user.uid);
      dispatch(getStudentList(user.uid));

    }).catch(function(err) {
      // console.log("error logging in with email/password", err);
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
  return function(dispatch) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      dispatch(loginWithPasswordNative(email, password, navigator));
    }).catch(function(err) {
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

// helper function for ajax calls
function getCsrfHeader() {
  return { "x-csrf-token": getCookie("csrf-token") };
}

// ajax call for new student login
// function _postAddStudent(userID) {
//   return $.ajax({
//     url: `/addstudent?user=${userID}`,
//     dataType: 'jsonp',
//     contentType: 'text/html',
//     method: "GET",
//     headers: { 'Access-Control-Allow-Origin': '*', 'contentType' : 'text/html', 'X-Request': 'JSON'},
//     crossDomain: true,
//     // 'X-Request': 'JSON',

//     // xhrFields: {
//     //   // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
//     //   // This can be used to set the 'withCredentials' property.
//     //   // Set the value to 'true' if you'd like to pass cookies to the server.
//     //   // If this is enabled, your server must respond with the header
//     //   // 'Access-Control-Allow-Credentials: true'.
//     //   withCredentials: false,
//     // },
//     // datatype: 'jsonp',
//     // 'Accept': 'application/json',

//   });
// }


// ajax call for new student logut
// function _logoutStudent(query) {
//   return $.ajax({
//     url: "/logout",
//     method: "POST",
//     // headers: getCsrfHeader(),
//     headers: { 'Access-Control-Allow-Origin': '*' },
//     crossDomain: true,
//     datatype: 'jsonp',
//     data: query
//   });
// }

function triggerAddStudent(parentID) {
  const cleverAuthURL = 'https://reading-challenge.herokuapp.com/addstudent?user=' + parentID;
  // const cleverAuthURL = 'https://reading-challenge.herokuapp.com'
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
  // console.log("addStudentSuccess: ");


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

      // all saved dates are in format YYMMDD
      var ref = db.ref("/challenges/" + districtID).once("value", (snapshot) => {
        dispatch(setStudentList(students, snapshot.val()));
      });

    }
  };
}

function setStudentList(students, challenges) {
  if (!students) {
    students = {};
  }
  var challengeEndDate;
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
  // console.log("ACTIONS: getStudentList");
  return (dispatch, getState) => {
    console.log("in get student list");
    ///////////////////////////////////////////////////////////////////////
    // temporarily commenting out until firebase fixes bug, see top of file
    var ref = db.ref("/parents/" + parent_id);
    console.log("ACTIONS: getStudentList. parent:", parent_id);
    // var ref = new Firebase(firebaseURI + "parents/" + parent_id);
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
  createUser,
  createUserNative,
  isLoggedIn,
  restoreAuth,
  logout,
  logoutMobile,
};
