import BaseAPI from "./BaseAPI";

class CartAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'Cart';
  }

}

export default new CartAPI();