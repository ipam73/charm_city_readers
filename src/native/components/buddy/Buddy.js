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

class Buddy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.subHeading}>Change Buddy:</Text>
        <Image
          style={styles.buddyButton}
          source={require('../../../images/buddy/crab.png')}
        />
        <Image
          style={styles.buddyButton}
          source={require('../../../images/buddy/dog.png')}
        />
        <Image
          style={styles.buddyButton}
          source={require('../../../images/buddy/flag.png')}
        />
        <Image
          style={styles.buddyButton}
          source={require('../../../images/buddy/raven.png')}
        />
        <Image
          style={styles.buddyButton}
          source={require('../../../images/buddy/sailboat.png')}
        />
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
    setStudentTime: (readDate, readTime, studentID, parentID) => {
      dispatch(actions.setStudentTime(readDate, readTime, studentID, parentID));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Buddy);
