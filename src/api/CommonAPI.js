import BaseAPI from "./BaseAPI";

class CommonAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'Common';
  }

  /**
   * Lấy các sản phẩm trong giỏ hàng của người dùng
   * @returns ServiceResponse
   */
  searchGlobal(searchValue) {
    return this.api.post(`${this.controller}/search-global?searchValue=${searchValue}`, );
  }

}

export default new CommonAPI();