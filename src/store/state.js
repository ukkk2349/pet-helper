const state = {
  userID: localStorage.getItem('userID') || null,
  isAdmin: localStorage.getItem('isAdmin') || null,
  user: null,
  cart: localStorage.getItem('cart') || 0
}

export default state;