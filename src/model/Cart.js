import BaseModel from "./BaseModel";

class Cart extends BaseModel {
  constructor() {
    super();
    this.CartID = 0;
    this.ProductID = null;
    this.ProductName = null;
    this.Price = null;
    this.UserID = null;
    this.ProductAvatar = null;
  }
}

export default Cart;