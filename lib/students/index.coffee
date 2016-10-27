_ = require "underscore"
config = require "#{__dirname}/../../web/config"

###############################################################################
## Downgrading to firebase 2.4, since newsest version does not work w/react
## see:  https://medium.com/@Pier/firebase-is-broken-for-react-native-7f78b7a066da#.gotw818vu
## and PR: https://github.com/ipam73/reading-challenge/commit/35247388d6ccc29a8dfd2bb1768da3e13a2c07df
# firebase = require('firebase')
# firebase.initializeApp { serviceAccount: config.FIREBASE_ACCOUNT, databaseURL: "https://reading-challenge.firebaseio.com" }
# db = firebase.database()
###############################################################################

Firebase = require('firebase')
firebaseURI = "https://reading-challenge.firebaseio.com/"

### student schema
  {
    id: '1233',
    name: 'Pam',
    school: 'Elementary School',
    total_mins: 445,
    goal: 60,
    grade: '4'
    progress: [
      {date: 1, mins: 45},
      {date: 2, mins: 10},
      {date: 3, mins: 65}
    ]
  }
###
save_student = (student_id, first_name, school_id, school_name, district_id, grade, parent_id) ->
  console.log "saving right now!"
  student_to_save =
    id: student_id
    name: first_name
    school_id: school_id
    school_name: school_name
    district_id: district_id
    grade: grade
    time_log: {}

  ## Downgrading to firebase 2.4, since newsest version does not work w/react
  # parentsRef = db.ref("/parents/#{parent_id}")
  # studentsRef = parentsRef.child("students")
  parentsRef = new Firebase(firebaseURI + "parents/" + parent_id)
  studentsRef = parentsRef.child("students/#{student_id}")

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
