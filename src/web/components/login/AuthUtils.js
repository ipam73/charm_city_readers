var actions = require("../../../actions");

function requireAuth(nextState, replace) {
  var user = actions.isLoggedIn();
  console.log("requireAuth:", user);
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
