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
    marginBottom: 20,
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


class AddStudentEmpty extends React.Component {
  constructor(props) {
    super(props);
    this.authAddStudent = this.authAddStudent.bind(this);
  }

  authAddStudent() {
    console.log('adding student!');
    const url = 'https://reading-challenge.herokuapp.com/addstudent?user=' + this.props.parentID + '&mobile=true';
    console.log("url is!: ", url);
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
    this.props.getStudentList(this.props.parentID);
  }

  render() {
    return (
      <TouchableHighlight style={styles.row}>
        <View style={styles.headingContainer}>
          <View style={styles.headingText}>
            <Text style={styles.headingTitle}>Welcome to Charm City Readers!</Text>
            <Text>
              This challenge will allow schools to compete to see who has the best readers in Baltimore. Parents should use this app to log minutes every time their children read.
            </Text>

            <TouchableHighlight onPress={this.authAddStudent}>
              <Image
                style={styles.button}
                source={icon}
              />
            </TouchableHighlight>
            <Text>
              To get started with this app, add your student by clicking the "Log In with Clever" button above. You'll need to have your student's Clever login credentials ready.
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddStudentEmpty);
