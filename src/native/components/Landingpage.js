import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

const backgroundImage = require('../../images/CharmCityReaders_mobile.jpeg');
const facebookLogin = require('../../images/sign-in-facebook.png');
const emailLogin = require('../../images/sign-in-with-email.png');
const googleLogin = require('../../images/sign-in-with-google-small.png');




class Landingpage extends React.Component {
  login() {
    // do some logic here, if new user show welcome, otherwise don't
    this.props.navigator.push({
      name: 'Login',
      title: 'Sign In with Email',
    });
  }

  _navigate(name) {
    // do some logic here, if new user show welcome, otherwise don't
    this.props.navigator.push({
      name: 'Welcome',
      title: '',
      display: false,
      passProps: {
        name,
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={backgroundImage}>
          <View style={styles.buttons}>
          <TouchableHighlight onPress={() => this.login()}>
            <Image
              style={styles.button}
              source={emailLogin}
            />
          </TouchableHighlight>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    width: 300,
    height: 60,
    flex: 1,
  },
  buttons: {
    marginBottom: 60,
  },
  backgroundImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

module.exports = Landingpage;
