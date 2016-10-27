import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  Linking,
} from 'react-native';
import Button from 'apsl-react-native-button';

const icon = require('../../images/baltimore_city_logo.jpg');

var styles = StyleSheet.create({
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
  headingContainer: {
    flexDirection: 'row',
  },
  headingText: {
    flex: 1,
  },
  headingTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  normalText: {
    fontSize: 14,
  },
  button: {
    marginBottom: 15,
    width: 300,
    flex: 1,
  },
  icon: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#2f67ab',
    width: 200,
    height: 60,
    flex: 1,
    alignSelf: 'center',
  },
  buttonLink: {
    marginTop: 15,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 2,
    width: 200,
    height: 30,
    alignSelf: 'center',
  },
  buttonLinkText: {
    fontSize: 14,
  },

});

class Support extends React.Component {

  linkToSupport() {
    const url = 'https://drive.google.com/file/d/0B9SRyd85Yz8ZQ09sQktjeTY2czQ/view?usp=drivesdk';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View style={styles.main}>
        <TouchableHighlight style={styles.row}>
          <View style={styles.headingContainer}>
            <View style={styles.headingText}>
              <Text style={styles.headingTitle}>Contact Information</Text>
              <Image style={styles.icon} source={icon} />
              <Text style={styles.normalText}>
                If you have any questions or concerns about the reading challenge,
                please see your child’s school for more information. If you have technical
                 issues with the use of this app, please email CitySchoolsIT@bcps.k12.md.us.
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.row}>
          <View style={styles.headingContainer}>
            <View style={styles.headingText}>
              <Text style={styles.headingTitle}>Getting Started</Text>
              <Button style={styles.buttonLink} textStyle={styles.buttonLinkText} onPress={this.linkToSupport.bind(this)}>
                See Guide
              </Button>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Support;
