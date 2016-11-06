import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Linking,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../actions';

const icon = require('../../../images/log-in-with-clever-large.png');

var styles = StyleSheet.create({
  row: {
    backgroundColor: '#FBFBFB',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  headingContainer: {
    flexDirection: 'row',
  },
  headingText: {
    // fontWeight: 'bold',
    flex: 1,
  },
  headingTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  button: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#2f67ab',
    width: 200,
    height: 30,
    flex: 1,
  },
});


class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.authAddStudent = this.authAddStudent.bind(this);
  }

  // authAddStudent() {
  //   console.log('adding student!');
  //   const url = 'https://reading-challenge.herokuapp.com/addstudent?user=' + this.props.parentID;
  //   Linking.canOpenURL(url).then(supported => {
  //     if (!supported) {
  //       console.log('Can\'t handle url: ' + url);
  //     } else {
  //       return Linking.openURL(url);
  //     }
  //   }).catch(err => console.error('An error occurred', err));
  //   this.props.getStudentList(this.props.parentID);
  // }

  authAddStudent() {
    this.props.triggerAddStudent();
    this.props.navigator.push({
      name: 'Clever'
    });
  }

  render() {
    return (
      <TouchableHighlight style={styles.row}>
        <View style={styles.headingContainer}>
          <View style={styles.headingText}>
            <Text style={styles.headingTitle}>Add a Student</Text>
            <TouchableHighlight onPress={this.authAddStudent}>
              <Image
                style={styles.button}
                source={icon}
              />
            </TouchableHighlight>
            <Text>
              Click the button to add a student using their Clever login credentials.
              If you need help finding the right credentials please contact the school.
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

function mapStateToProps(state) {
  var parentID = '';
  if (state.reducers.user) {
    parentID = state.reducers.user.uid;
  }
  return {
    parentID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStudentList: (parentID) => {
      dispatch(actions.getStudentList(parentID));
    },
    triggerAddStudent: (parentID) => {
      dispatch(actions.triggerAddStudent(parentID));
    }
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddStudent);
