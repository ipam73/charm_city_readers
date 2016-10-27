import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';

var styles = StyleSheet.create({
  button: {
    marginTop: 15,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 2,
    width: 200,
    height: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
});

class AddTime extends React.Component {
  onAddTimePress() {
    this.props.navigator.push({
      name: 'AddTimeScreen',
      title: `Log Time: ${this.props.student.name}`,
      passProps: {
        studentID: this.props.studentID,
      },
    });
  }

  render() {
    return (
      <Button style={styles.button} textStyle={styles.buttonText} onPress={this.onAddTimePress.bind(this)}>
        Log Time
      </Button>
    );
  }
}

AddTime.propsTypes = {
  studentID: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  const studentID = props.studentID;
  return {
    navigator: props.navigator,
    studentID,
    student: state.reducers.studentList[studentID],

  };
}

module.exports = connect(mapStateToProps, null)(AddTime);
