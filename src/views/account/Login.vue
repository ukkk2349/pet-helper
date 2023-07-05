<template>
  Login
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
        <b-validate ref="validateLogin">
          <div class="form-wrapper">
            <div class="form-group">
              <b-text-box
                placeholder="abc@gmail.com"
                v-model="account"
                :isShowLabel="true"
                :label="$t('EmailOrPhone')"
                require
              />
            </div>
            <div class="form-group m-b-0">
              <b-text-box
                :placeholder="$t('Password')"
                v-model="password"
                mode="password"
                :isShowLabel="true"
                :label="$t('Password')"
                require
              />
            </div>
            <small v-if="errorMessage && errorMessage.length > 0" id="wrong-login" style="color: red; font-weight: bold"> {{ errorMessage }}</small>
            <div class="forgot-password">
              <b-button
                :text="$t('ForgotPassword')"
                type="link"
                :showBorder="false"
                @click="onClickForgotPassword"
              />
            </div>
            <button type="submit" class="submit-button" @click="onClickSignIn">{{ $t("LogIn") }}</button>
            <div class="box-register">
              <span class="or-register mr-2"> {{ $t("DontHaveAnAccount") }} </span>
              <b-button 
                @click="onClickSignUp" 
                type="link" 
                :showBorder="false" 
                :text="$t('SignUp') + '!'"
              ></b-button>
            </div>
          </div>
        </b-validate>
      </div>
    </div>
  </div>
</template>

<script>
import UserAPI from '@/api/UserAPI';

export default {
  name: "LogIn",
  data() {
    return {
      account: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    /**
     * Điều hướng khi người dùng chọn đăng ký
     */
    onClickSignUp() {
      this.$router.push('sign-up');
    },
    /**
     * Điều hướng khi người dùng chọn quên mật khẩu
     */
    onClickForgotPassword() {
      this.$router.push('forgot-password');
    },
    /**
     * Xử lý đăng nhập
     */
    onClickSignIn() {
      if(this.$refs.validateLogin.validate()) {
        var userInfo = {
          UserName: this.account,
          Password: this.password
        }

        UserAPI.signIn(userInfo).then(res => {
          if (res.data.success) {
            this.$store.dispatch("login", res.data.data);
            this.$router.push('/');
          } else {
            this.errorMessage = res.data.Message;
          }
        }, err => {
          console.error(err);
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding-top: 80px;
}
.form-wrapper {
  background-color: #faf5ef;
  padding: 5%;
  border-radius: 5%;
  font-family: "Quicksand", sans-serif;
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