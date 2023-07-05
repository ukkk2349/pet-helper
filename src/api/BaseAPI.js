import BaseAPIConfig from './config/BaseAPIConfig';

class BaseAPI {
  constructor() {
    this.controller = 'Base'
    this.api = BaseAPIConfig
  }
   
  /**
   * lấy tất cả dữ liệu
   * @returns 
   */
  getAll() {
    return this.api.get(`${this.controller}/getAll`);
  }

  save(model) {
    return this.api.post(this.controller, model);
  }

  getByID(id) {
    return this.api.get(`${this.controller}/getByID/${id}`);
  }

  deleteByID(id) {
    return this.api.post(`${this.controller}/deleteByID/${id}`);
  }

}  

export default BaseAPI;