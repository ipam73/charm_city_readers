import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../actions';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    paddingTop: 80,
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#FBFBFB',
    padding: 20,
  },
  name: {
    color: '#946199',
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 15,
  },
  item: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 15,
    marginLeft: 15,
  },
});

class Menu extends React.Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
    navigator: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  };

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text style={styles.name}>{this.props.user ? this.props.user.displayName : ''}</Text>
        <Text
          onPress={() => this.props.onItemSelected('Homepage', 'Charm City Readers', this.props.navigator)}
          style={styles.item}
        >
          Home
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('About', 'About the Challenge', this.props.navigator)}
          style={styles.item}
        >
          About the Challenge
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Support', 'Support', this.props.navigator)}
          style={styles.item}
        >
          Support
        </Text>

        <Text
          onPress={() => {
            this.props.logout();
            this.props.onItemSelected('Landingpage', '', this.props.navigator);
          }}
          style={styles.item}
        >
          Logout
        </Text>
      </ScrollView>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    logout: (navigator) => {
      dispatch(actions.logout(navigator));
    },
  };
}

// sets current state for Header as this.prop
function mapStateToProps(state) {
  return {
    user: state.reducers.user,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Menu);

