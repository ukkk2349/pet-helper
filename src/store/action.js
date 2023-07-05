const actions = {
  login({ commit }, authData) {
    localStorage.setItem('userId', authData.userKey);
    localStorage.setItem('isAdmin', authData.isAdmin);  
    commit('authUser', {
      userId: authData.userKey,
      isAdmin: authData.isAdmin 
    })
  }
}

export default actions;