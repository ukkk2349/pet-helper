import BaseAPI from "./BaseAPI";

class CartAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'Cart';
  }

  /**
   * Lấy các sản phẩm trong giỏ hàng của người dùng
   * @returns ServiceResponse
   */
  getCartItem() {
    return this.api.get(`${this.controller}/get-cart-item`);
  }

}

export default new CartAPI();