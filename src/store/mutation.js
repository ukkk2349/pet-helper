const mutations = {
  authUser(state, userData) {
    state.userId = userData.userId;
    state.isAdmin = userData.isAdmin;
  },
  storeUser(state, user) {
    state.user = user;
  },
  clearAuthData(state) {
    state.idToken = null,
      state.userId = null,
      state.isAdmin = 0
  }
}

export default mutations;