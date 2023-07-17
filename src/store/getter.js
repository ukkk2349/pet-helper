const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.userKey !== null;
  },
  isAdmin(state) {
    return state.isAdmin;
  },
  isManager(state) {
    return state.isManager;
  }
}

export default getters;