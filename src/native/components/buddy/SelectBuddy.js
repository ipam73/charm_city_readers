import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  DatePickerAndroid,
  Image,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../actions';
import Button from 'apsl-react-native-button';

var crabIcon = require('../../../images/buddy/crab.png');
var dogIcon = require('../../../images/buddy/dog.png');
var flagIcon = require('../../../images/buddy/flag.png');
var ravenIcon = require('../../../images/buddy/raven.png');
var sailboatIcon = require('../../../images/buddy/sailboat.png');

class SelectBuddy extends React.Component {
  constructor(props) {
    super(props);
    this.onBuddyPress = this.onBuddyPress.bind(this);
  }

  onBuddyPress(buddyName) {
    this.props.setStudentBuddy(buddyName, this.props.studentID, this.props.parentID);
    this.props.navigator.push({
      name: 'Homepage',
      title: 'Charm City Readers',
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.subHeading}>Change Buddy:</Text>
        <TouchableHighlight onPress={() => this.onBuddyPress("crab")}>
          <Image
            style={styles.buddyButton}
            source={crabIcon}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onBuddyPress("dog")}>
          <Image
            style={styles.buddyButton}
            source={dogIcon}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onBuddyPress("flag")}>
          <Image
            style={styles.buddyButton}
            source={flagIcon}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onBuddyPress("raven")}>
          <Image
            style={styles.buddyButton}
            source={ravenIcon}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onBuddyPress("sailboat")}>
          <Image
            style={styles.buddyButton}
            source={sailboatIcon}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingTop: 50,
  },
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
  buddyButton: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  subRowContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
  },
  headingIcon: {
    width: 70,
    height: 70,
  },
  headingText: {
    paddingLeft: 20,
    // fontWeight: 'bold',
    flex: 1,
  },
  headingTitle: {
    // fontWeight: 'bold',
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
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
  subHeading: {
    // fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10,
  },
});

function mapStateToProps(state, props) {
  var parentID = '';
  if (state.reducers.user) {
    parentID = state.reducers.user.uid;
  }
  const studentID = props.studentID;
  return {
    parentID,
    navigator: props.navigator,
    studentID,
    student: state.reducers.studentList[studentID],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStudentBuddy: (buddy, studentID, parentID) => {
      dispatch(actions.setStudentBuddy(buddy, studentID, parentID));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SelectBuddy);
