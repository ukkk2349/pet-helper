import BaseAPI from "./BaseAPI";

class PetAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'Pet';
  }

}

export default new PetAPI();