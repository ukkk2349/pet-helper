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
  },
  cart(state) {
    return state.cart;
  }
}

export default getters;