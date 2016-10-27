import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Linking,
  Image,
  WebView,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../actions';


var styles = StyleSheet.create({
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
});

class CleverWebView extends React.Component {
  render() {
    // var url = 'https://clever.com/oauth/authorize?response_type=code&client_id=0eb1d85a706c4c392d04&redirect_uri=https://reading-challenge.herokuapp.com&district_id=56ae8e9c5994560100000ae4';
    const url = "https://google.com";
    // const url="https://reading-challenge.herokuapp.com";
    // const url = 'https://reading-challenge.herokuapp.com/addstudent?user=' + this.props.parentID;

    // console.log("parent id is: ", this.props.parentID);
    return (
      <WebView
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        source={{uri: url}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
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
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CleverWebView);
