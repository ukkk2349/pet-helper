import BaseModel from "./BaseModel";

class Pet extends BaseModel {
  constructor() {
    super();
    this.PetID = 0;
    this.PetName = null;
    this.Age = null;
    this.Description = null;
    this.SpeciesID = null;
    this.SpeciesName = null;
    this.IsAdopted = false;
    this.HealthStateID = null;
    this.HealthStateName = null;
    this.PetAvatar = null;
    this.Images = null;
  }
}

export default Pet;