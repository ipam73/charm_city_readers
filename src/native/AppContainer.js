import React from 'react';
import {
  Navigator,
  StyleSheet,
  TouchableHighlight,
  Text,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../actions';

// pages
import About from './components/About';
import AddTimeScreen from './components/time/AddTimeScreen';
import CleverWebView from './components/add-student/CleverWebView';
import Homepage from './components/Homepage';
import Landingpage from './components/Landingpage';
import Login from './components/login/Login';
import Support from './components/Support';
import Welcome from './components/Welcome';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectBuddy from './components/buddy/SelectBuddy';

// menu
const SideMenu = require('react-native-side-menu');
const Menu = require('./components/common/Menu');
const Header = require('./components/common/Header');

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  nav: {
    position: 'absolute',
    backgroundColor: '#8E44AD',
    height: 56,
    flexDirection: 'row',
  },
  navButtonIcon: {
    marginLeft: 13,
    marginTop: 15,
  },
  navTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class AppContainer extends React.Component {

  state = {
    isOpen: false,
    selectedItem: 'Homepage',
  };

  toggle() {
    // console.log("in toggle");
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    // console.log("in updateMenuState");
    this.setState({isOpen});
  }

  onMenuItemSelected = (item, title, navigator) => {
    // console.log("in onMenuItemSelected selected 2");

    var navBarDisplay = true;
    if (item === 'Landingpage') {
      navBarDisplay = false;
    }
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
    navigator.push({
      name: item,
      title,
      display: navBarDisplay,
    });
  }

  navigationBarRouteMapper(onToggle) {
    return ({
      LeftButton(route, navigator, index, navState) {
        if (
          route.name === 'AddTimeScreen' 
          || route.name === 'Login' 
          || route.name === 'Buddy'
          || route.name === 'Clever') {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => { if (index > 0) { navigator.pop()} }}
            >
              <Icon style={styles.navButtonIcon} name="md-arrow-back" size={30} color="#FFFFFF" />
            </TouchableHighlight>
          );
        }
        return (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => onToggle()}
          >
            <Icon style={styles.navButtonIcon} name="md-menu" size={30} color="#FFFFFF" />
          </TouchableHighlight>
        );
      },

      RightButton(route, navigator, index, navState) {
        if (route.onPress) {
          return (<TouchableHighlight></TouchableHighlight>);
        }
      },

      Title(route, navigator, index, navState) {
        return <Text style={styles.navTitle}>{route.title}</Text>;
      },
    });
  }

  renderScene(route, navigator) {
    var component;
    console.log("in render scene app container, route is: ", route);
    switch (route.name) {
      case 'About':
        component = About;
        break;
      case 'AddTimeScreen':
        component = AddTimeScreen;
        break;
      case 'Buddy':
        component = SelectBuddy;
        break;
      case 'Clever':
        component = CleverWebView;
        break;
      case 'Homepage':
        component = Homepage;
        break;
      case 'Landingpage':
        console.log("in landing page");
        component = Landingpage;
        if (this.props.user) {
          console.log(" in is authenticated!****");
          component = Homepage;
          route.name = 'Homepage';
          route.title = 'Charm City Readers';
        }
        break;
      case 'Login':
        component = Login;
        if (this.props.user) {
          console.log(" in is authenticated!****");
          component = Homepage;
          route.name = 'Homepage';
          route.title = 'Charm City Readers';
        }
        break;
      case 'Support':
        component = Support;
        break;
      case 'Welcome':
        component = Welcome;
        break;
      default:
        component = Landingpage;
        break;
    }
    const newElement = React.createElement(
      component, {...this.props, ...route.passProps, route, navigator}
    );
    const menu = (<Menu
      navigator={navigator}
      onItemSelected={this.onMenuItemSelected}
    />);

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
      >
        {newElement}
      </SideMenu>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      initialRoute: {name: 'Landingpage', title: '', display: false},
    };
  }

  componentDidMount() {
    console.log("appcontainer - in component did mount");
    const url = Linking.getInitialURL().then(url => {

      if (url) {
        const routeName = url.replace(/.*?:\/\//g, "");
        if (routeName.toLowerCase() === "homepage") {
          if (this.props.user) {
            this.props.getStudentList(this.props.parentID);
          }
        }
      }
    });
  }

  render() {
    return (
      <Navigator
        style={styles.mainContainer}
        initialRoute={this.state.initialRoute}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Header
            style={styles.nav}
            routeMapper={this.navigationBarRouteMapper(this.toggle.bind(this))}
          />
        }
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
    user: state.reducers.user,
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
