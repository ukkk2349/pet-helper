<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <div class="form-wrapper">
            <!-- <label for="name">Your Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Nguyễn Văn A"
              v-model="name"
              required
            /> -->
          <div class="row justify-content-center mb-4">
            <h2 class="title">{{ $t("SignUp") }}</h2>
          </div>
          <b-validate ref="validateSignInForm">
            <div class="row">
              <div class="col">
                <b-text-box
                  v-model="user.FirstName"
                  id="firstName"
                  :placeholder="$t('FirstName')"
                  :isShowLabel="true"
                  :label="$t('FirstName')"
                  require
                >
                </b-text-box>
              </div>
              <div class="col">
                <b-text-box
                  id="lastName"
                  v-model="user.LastName"
                  :placeholder="$t('LastName')"
                  :isShowLabel="true"
                  :label="$t('LastName')"
                  require
                >
                </b-text-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-text-box
                  id="fullName"
                  v-model="user.FullName"
                  :placeholder="$t('FullName')"
                  :isShowLabel="true"
                  :label="$t('FullName')"
                  :disabled="true"
                  require
                >
                </b-text-box>
              </div>
            </div>
              
            <div class="row">
              <div class="col">
                <b-text-box
                  id="email"
                  v-model="user.Email"
                  placeholder="Email"
                  :isShowLabel="true"
                  label="Email"
                  rule="email"
                  require
                >
                </b-text-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-text-box
                  id="phoneNumber"
                  v-model="user.PhoneNumber"
                  :placeholder="$t('PhoneNumber')"
                  :isShowLabel="true"
                  :label="$t('PhoneNumber')"
                  mask="(+84) X00 000 000"
                  :maskRule="{ X: /[02-9]/ }"
                  require
                >
                </b-text-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-text-box
                  id="password"
                  v-model="user.Password"
                  :placeholder="$t('Password')"
                  :isShowLabel="true"
                  :label="$t('Password')"
                  mode="password"
                  require
                >
                </b-text-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-select-box
                  v-model="user.GenderID"
                  :items="dataCbbGender"
                  displayExpr="GenderName"
                  valueExpr="GenderID"
                  :placeholder="$t('Gender')"
                  :isShowLabel="true"
                  :label="$t('Gender')"
                  require
                  @onSelectionChanged="onSelectGender"
                >
                </b-select-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-date-box
                  :isShowLabel="true"
                  :label="$t('DateOfBirth')"
                  v-model="user.Birthday"
                  require
                >
                </b-date-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-select-box
                  :items="dataCbbCity"
                  displayExpr="Name"
                  valueExpr="Id"
                  :placeholder="$t('SelectCity')"
                  :isShowLabel="true"
                  :label="$t('City')"
                  require
                  @onSelectionChanged="onSelectProvince"
                >
                </b-select-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-select-box
                  :items="dataCbbDistrict"
                  displayExpr="Name"
                  valueExpr="Id"
                  :placeholder="$t('SelectDistrict')"
                  :isShowLabel="true"
                  :label="$t('District')"
                  require
                  @onSelectionChanged="onSelectDistrict"
                >
                </b-select-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-select-box
                  :items="dataCbbWard"
                  displayExpr="Name"
                  valueExpr="Id"
                  :placeholder="$t('SelectWard')"
                  :isShowLabel="true"
                  :label="$t('Ward')"
                  @onSelectionChanged="onSelectWard"
                >
                </b-select-box>
              </div>
            </div>
  
            <div class="row">
              <div class="col">
                <b-text-box
                  id="address"
                  v-model="user.Address"
                  :placeholder="$t('Address')"
                  :isShowLabel="true"
                  :label="$t('Address')"
                >
                </b-text-box>
              </div>
            </div>
          </b-validate>

          <small id="message" style="color: red; font-weight: bold" v-if="messageValidate && messageValidate.length > 0">{{ messageValidate }}</small>
          <button type="submit" class="mt-3 mb-3 submit-button" @click="onSignUp">
            {{ $t('CreateAccount') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserAPI from '@/api/UserAPI';
import User from '@/model/User';

export default {
  name: "SignUp",
  data() {
    return {
      user: new User(),
      dataCbbCity: [],
      dataCbbDistrict: [],
      dataCbbWard: [],
      dataCbbGender: [
        {
          GenderID: 1,
          GenderName: this.$t('Male')
        },
        {
          GenderID: 2,
          GenderName: this.$t('Female')
        },
        {
          GenderID: 3,
          GenderName: this.$t('Different')
        }
      ],
      messageValidate: ""
    }
  },
  async created() {
    await this.getDataCity();
  },
  methods: {
    async getDataCity() {
      var res = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
      if (res && res.status == 200) {
        this.dataCbbCity = res.data;
      }
    },
    /**
     * Lấy dữ liệu quận huyện sau khi chọn thành phố
     * @param {object} e item đã chọn
     */
    onSelectProvince(e) {
      if (e) {
        this.user.CurrentProvinceID = e.ID;
        this.user.CurrentDistrictName = e.Name;
        this.dataCbbDistrict = e.Districts;
      }
    },
    /**
     * Lấy dữ liệu quận huyện sau khi chọn thành phố
     * @param {object} e item đã chọn
     */
    onSelectDistrict(e) {
      if (e) {
        this.user.CurrentDistrictID = e.ID;
        this.user.CurrentDistrictName = e.Name;
        this.dataCbbWard = e.Wards;
      }
    },
    /**
     * Lấy dữ liệu phường xã
     * @param {object} e item dã chọn
     */
    onSelectWard(e) {
      if (e) {
        this.user.CurrentDistrictID = e.ID;
        this.user.CurrentDistrictName = e.Name;
        this.dataCbbWard = e.Wards;
      }
    },
    /**
     * Xử lý gán giá trị sau khi chọn giới tính
     * @param {object} e 
     */
    onSelectGender(e) {
      this.user.GenderID = e.GenderID;
      this.user.GenderName = e.GenderName;
    },
    /**
     * Đăng ký
     */
    onSignUp() {
      if (this.$refs.validateSignInForm.validate()) {
        this.user.GenderID = 1;
        UserAPI.save(this.user).then(res => {
          if (res.data.success) {
            UserAPI.signIn({UserName: this.user.PhoneNumber, Password: this.user.Password}). then(res => {
              this.$store.dispatch("login", res.data.data);
              this.$router.push('/');
            }, err => {
              console.log(err);
            })
          }
        }, error => {
          console.log(error);
        })
      }
      else {
        console.log(false)
      }
    }
  },
  watch: {
    user: {
      // console.log(val)
      deep: true,
      handler(value) {
        this.user.FullName = (value.FirstName ? value.FirstName : '') + ' ' + (value.LastName ? value.LastName : '');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  background-color: #faf5ef;
  padding: 5%;
  border-radius: 5%;

  label {
    font-weight: bold;
  }

  .row {
    margin: 0 0 10px 0;

    .col:first-child {
      padding-left: 0;
    }

    .col:last-child {
      padding-right: 0;
    }
  }
}


button.submit-button {
  background-color: #171a1d;
  color: white;
  width: 100%;
  border: none;
  padding: 3%;
  text-transform: uppercase;
  font-weight: 700;
  box-sizing: border-box;
}
</style>