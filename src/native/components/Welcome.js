import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';

import Button from 'apsl-react-native-button';
const icon = require('../../images/bookshelf.png');

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#946199',
  },
  row: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 80,
  },
  headingContainer: {
    flex: 1,
  },
  headingTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    paddingBottom: 5,
  },
  normalText: {
    fontSize: 14,
    color: 'white',
  },
  icon: {
    marginTop: 10,
    marginBottom: 30,
    flex: 1,
    alignSelf: 'center',
  },
  button: {
    marginTop: 25,
    backgroundColor: '#07AB80',
    borderRadius: 1,
    borderColor: '#07AB80',
    width: 200,
    height: 40,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
});

class Welcome extends React.Component {
  _navigate(name) {
    this.props.navigator.push({
      name: 'Homepage',
      title: 'Charm City Readers',
      passProps: {
        name,
      },
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <TouchableHighlight style={styles.row}>
          <View style={styles.headingContainer}>
            <Image style={styles.icon} source={icon} />
            <Text style={styles.headingTitle}>Welcome!</Text>
            <Text style={styles.normalText}>
              Over the next few months, your child's school will be participating in
              a district-wide reading challenge.  With this app your child can track
              their progress and earn rewards!
            </Text>
            <Button style={styles.button} textStyle={styles.buttonText} onPress={() => this._navigate('name')}>
              Get Started!
            </Button>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Welcome;
