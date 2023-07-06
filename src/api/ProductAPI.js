import BaseAPI from "./BaseAPI";

class ProductAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'Product';
  }

}

export default new ProductAPI();