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
    isAdmin: Boolean(parseInt(localStorage.getItem('isAdmin'))) || null,
    isManager: Boolean(parseInt(localStorage.getItem('isManager'))) || null,
    user: null,
    cart: localStorage.getItem('cart') || 0
  },
  getters: getters,
  mutations: {
    authUser(state, userData) {
      state.userKey = userData.userKey;
      state.isAdmin = userData.isAdmin;
      state.isManager = userData.isManager;
      state.cart = userData.cart;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.userKey = null;
      state.isAdmin = 0;
      state.cart = 0;
    },
    addToCart(state) {
      state.cart == state.cart != null ? state.cart++ : 0;
    }
  },
  actions: {
    login({ commit }, authData) {
      localStorage.setItem('userKey', authData.userKey);
      localStorage.setItem('isAdmin', authData.isAdmin ? 1 : 0);  
      localStorage.setItem('isManager', authData.isManager ? 1 : 0);  
      localStorage.setItem('cart', authData.cart);  
      commit('authUser', {
        userKey: authData.userKey,
        isAdmin: authData.isAdmin,
        isManager: authData.isManager,
        cart: authData.cart
      })
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('userKey');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('cart');
      localStorage.clear();
      router.replace('/sign-in');
    },
    addToCart({commit}) {
      commit('addToCart');
    }
  }
})

export default store;