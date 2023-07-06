class User {
  constructor() {
    this.UserID = 0;
    this.FirstName = null;
    this.LastName = null;
    this.FullName = null;
    this.Email = null;
    this.Password = null;
    this.Address = null;
    this.Birthday = null;
    this.BirthPlaceID = null;
    this.BirthPlaceName = null;
    this.CurrentProvinceID = null;
    this.CurrentProvinceName = null;
    this.CurrentDistrictID = null;
    this.CurrentDistrictName = null;
    this.CurrentWardID = null;
    this.CurrentWardName = null;
    this.PhoneNumber = null;
    this.UserKey = null;
    this.JoinDate = new Date();
    this.IsManager = false;
    this.IsAdmin = false;
  }
}

export default User;