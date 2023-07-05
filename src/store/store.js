import { createStore } from 'vuex';
// import state from '@/store/state';
// import mutations from '@/store/mutation';
import getters from '@/store/getter';
// import actions from '@/store/action';
import router from '@/router/baseRouter';
export const store = createStore({

  //export default new Vuex.Store({
  state: {
    userKey: localStorage.getItem('userKey') || null,
    isAdmin: localStorage.getItem('isAdmin') || null,
    user: null,
    cart: localStorage.getItem('cart') || 0
  },
  getters: getters,
  mutations: {
    authUser(state, userData) {
      state.userKey = userData.userKey;
      state.isAdmin = userData.isAdmin;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null,
      state.userKey = null,
      state.isAdmin = 0
    }
  },
  actions: {
    login({ commit }, authData) {
      localStorage.setItem('userKey', authData.userKey);
      localStorage.setItem('isAdmin', authData.isAdmin);  
      commit('authUser', {
        userKey: authData.userKey,
        isAdmin: authData.isAdmin 
      })
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('userKey');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('cart');
      localStorage.clear();
      router.replace('/sign-in');
    }
  }
})

export default store;