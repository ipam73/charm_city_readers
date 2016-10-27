import React from "react";
import {hashHistory} from "react-router";
import {connect} from "react-redux";
import actions from "../../../actions";

import AddTimeForm from "./AddTimeForm";
import toastr from "toastr";
import moment from "moment";

class AddTimePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readDate: moment(),
      maxDate: moment(),
    };
    this.setTimeState = this.setTimeState.bind(this);
    this.setMinsReadState = this.setMinsReadState.bind(this);
    this.saveTime = this.saveTime.bind(this);
    this.cancelTime = this.cancelTime.bind(this);
  }

  // since this is passed through props, can't set state
  // need to fix this by redux-ifying here
  setTimeState(date) {
    return this.setState({
      readDate: date,
    });
  }

  setMinsReadState(event) {
    this.props.setMinsReadState(event, this.props.studentID);
  }

  saveTime(event) {
    event.preventDefault();

    // trigger add time action
    var readDate = this.state.readDate.format('YYMMDD');
    this.props.setStudentTime(readDate, this.props.readMinutes, this.props.studentID, this.props.user.uid);
    this.setState({readDate: moment()});
    toastr.success("Time saved.");
    hashHistory.push("/");
  }

  cancelTime() {
    hashHistory.push("/");
  }

  render() {
    return (
      <div>
        <h3>{`Log Time: ${this.props.student.name}`}</h3>
        <AddTimeForm
          readDate={this.state.readDate}
          maxDate={this.state.maxDate}
          onDateChange={this.setTimeState}
          readMinutes={this.props.readMinutes}
          onMinsChange={this.setMinsReadState}
          onSave={this.saveTime}
          onCancel={this.cancelTime}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

AddTimePage.propTypes = {
  user: React.PropTypes.object.isRequired,
  setStudentTime: React.PropTypes.func.isRequired,
  setMinsReadState: React.PropTypes.func.isRequired,
  student: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  studentID: React.PropTypes.string,
  readMinutes: React.PropTypes.number,
  errors: React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const studentID = ownProps.params.id; // from path '/student/:id'

  return {
    studentID,
    user: state.reducers.user,
    student: state.reducers.studentList[studentID],
    timeFormIsValid: state.reducers.timeForm[studentID].formIsValid,
    readMinutes: state.reducers.timeForm[studentID].timeRead,
    errors: state.reducers.timeForm[studentID].errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStudentTime: (readDate, readTime, studentID, parentID) => {
      dispatch(actions.setStudentTime(readDate, readTime, studentID, parentID));
    },
    setMinsReadState: (event, studentID) => {
      dispatch(actions.setMinsReadState(event, studentID));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddTimePage);
