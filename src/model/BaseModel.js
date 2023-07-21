class BaseModel {
  constructor() {
    this.CreatedDate = new Date();
    this.CreatedBy = null;
    this.ModifiedDate = new Date();
    this.ModifiedBy = null;
    this.State = 1;
  }
}

export default BaseModel;