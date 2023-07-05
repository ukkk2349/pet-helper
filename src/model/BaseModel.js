class BaseModel {
  constructor() {
    this.CreatedDate = new Date();
    this.CreatedBy = null;
    this.ModifiedDate = new Date();
    this.ModifiedBy = null;
  }
}

export default BaseModel;