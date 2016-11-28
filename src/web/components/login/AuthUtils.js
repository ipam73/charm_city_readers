var actions = require("../../../actions");

function requireAuth(nextState, replace) {
  var user = actions.isLoggedIn();
  // console.log("*** \n *** \n requireAuth auth utils:", user);
  if (!user) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

module.exports = {
  requireAuth,
}
