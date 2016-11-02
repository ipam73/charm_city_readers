import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';

class BuddyButton extends React.Component {
  onBuddyPress() {
    this.props.navigator.push({
      name: 'Buddy',
      title: `Select Buddy: ${this.props.student.name}`,
      passProps: {
        studentID: this.props.studentID,
      },
    });
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onBuddyPress.bind(this)}>
        <Image
          style={styles.buddyButton}
          source={require('../../../images/buddy/BuddyPlaceholder.png')}
        />
      </TouchableHighlight>
    );
  }
}

BuddyButton.propsTypes = {
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

const styles = StyleSheet.create({
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
  buddyButton: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});

module.exports = connect(mapStateToProps, null)(BuddyButton);
