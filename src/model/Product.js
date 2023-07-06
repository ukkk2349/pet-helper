import BaseModel from "./BaseModel";

class Product extends BaseModel {
  constructor() {
    super();
    this.ProductID = 0;
    this.ProductName = null;
    this.Description = null;
    this.ExpiredDate = null;
    this.ManufacturingDate = null;
    this.Origin = null;
    this.Price = null;
    this.StateID = null;
    this.StateName = null;
    this.ProductCategoryID = null;
    this.ProductCategoryName = null;
    this.ProductAvatar = null;
    this.Images = null;
  }
}

export default Product;