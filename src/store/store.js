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
      state.cart = state.cart != null ? state.cart + 1 : 0;
    },
    moveFromCart(state, quantity) {
      state.cart = state.cart != null ? state.cart - quantity : 0;
    },
    order(state) {
      state.cart = 0;
    }
  },
  actions: {
    login({ commit }, authData) {
      localStorage.setItem('userKey', authData.UserKey);
      localStorage.setItem('isAdmin', authData.IsAdmin ? 1 : 0);  
      localStorage.setItem('isManager', authData.IsManager ? 1 : 0);  
      localStorage.setItem('cart', authData.Cart);  
      commit('authUser', {
        userKey: authData.UserKey,
        isAdmin: authData.IsAdmin,
        isManager: authData.IsManager,
        cart: authData.Cart
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
    },
    moveFromCart({commit}, quantity) {
      commit('moveFromCart', quantity);
    },
    order({commit}) {
      commit('order');
    }
  }
})

export default store;