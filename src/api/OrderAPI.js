import BaseAPI from "./BaseAPI";

class OrderAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'Order';
  }

}

export default new OrderAPI();