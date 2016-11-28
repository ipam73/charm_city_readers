_ = require "underscore"
config = require "#{__dirname}/../../web/config"

firebase = require('firebase')

firebaseConfig =
  apiKey: "AIzaSyCAAUrjrCNH_xCigW0T9qZxqeuaUpfcKmw"
  authDomain: "reading-challenge.firebaseapp.com"
  databaseURL: "https://reading-challenge.firebaseio.com"
  storageBucket: "firebase-reading-challenge.appspot.com"

firebaseApp = firebase.initializeApp(firebaseConfig)
firebaseRef = firebaseApp.database().ref()
db = firebase.database()


Firebase = require('firebase')
firebaseURI = "https://reading-challenge.firebaseio.com/"

save_student = (student_id, first_name, school_id, school_name, district_id, grade, parent_id, buddy) ->
  console.log "saving right now!", buddy
  student_to_save =
    id: student_id
    name: first_name
    school_id: school_id
    school_name: school_name
    district_id: district_id
    grade: grade
    time_log: {}
    buddy: buddy

  ## Downgrading to firebase 2.4, since newsest version does not work w/react
  parentsRef = db.ref("/parents/#{parent_id}")
  studentsRef = parentsRef.child("students/#{student_id}")
  # parentsRef = new Firebase(firebaseURI + "parents/" + parent_id)
  # studentsRef = parentsRef.child("students/#{student_id}")

  # TODO: check for errors here. 
  studentsRef.update(student_to_save)
  # TODO: check for duplicate student in firebase? or should we just overwrite transparently
  # existing_student = _.find students, (student) -> return student.id is student_id

  return null

add_time = (some_value) ->
  console.log "adding time: ", some_value
  console.log "saving right now!"
  return some_value


module.exports =
  save_student: save_student
  add_time: add_time
