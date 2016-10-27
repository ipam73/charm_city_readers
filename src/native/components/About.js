import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

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
    fontSize: 18,
    color: 'black',
    paddingBottom: 10,
  },
  normalText: {
    fontSize: 14,
  },
  icon: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#2f67ab',
    width: 200,
    height: 30,
    flex: 1,
  },
});

function About() {
  return (
    <View style={styles.main}>
      <TouchableHighlight style={styles.row}>
        <View style={styles.headingContainer}>
          <View style={styles.headingText}>
            <Text style={styles.headingTitle}>How does the challenge work?</Text>
            <Text style={styles.normalText}>
              This challenge will allow schools to compete to see who has the best 
              readers in Baltimore. Parents should use this app to log minutes every 
              time their children read. The minutes count toward an individual goal 
              and a school goal. So what are you waiting for? Get reading now!
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

module.exports = About;
