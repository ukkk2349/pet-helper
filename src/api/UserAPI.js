import BaseAPI from "./BaseAPI";

class UserAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'User';
  }

  signIn(userInfo) {
    return this.api.post(`${this.controller}/sign-in`, userInfo);
  }
}

export default new UserAPI();