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
    return (
      <View style={styles.main}>
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.props.cleverAuthURL}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
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
});

function mapStateToProps(state) {
  console.log("going to: ", state.reducers.cleverAuthURL);
  var parentID = '';
  if (state.reducers.user) {
    parentID = state.reducers.user.uid;
  }
  return {
    parentID,
    cleverAuthURL: state.reducers.cleverAuthURL,
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
