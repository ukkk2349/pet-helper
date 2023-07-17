import BaseAPI from "./BaseAPI";

class AppointmentAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = 'Appointment';
  }

}

export default new AppointmentAPI();