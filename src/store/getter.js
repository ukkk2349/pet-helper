const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.userKey !== null;
  },
  isAdmin(state) {
    return state.isAdmin;
  }
}

export default getters;