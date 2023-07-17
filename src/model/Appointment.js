import BaseModel from "./BaseModel";

class Appointment extends BaseModel {
  constructor() {
    super();
    this.AppointmentID = 0;
    this.PetID = null;
    this.PetName = null;
    this.PetAvatar = null;
    this.UserID = 0;
    this.UserName = "";
    this.UserAvatar = null;
    this.StatusID = 0;
    this.StatusName = "";
    this.AppointmentDate = new Date();
  }
}

export default Appointment;