<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light bg-transparent mt-0 p-lg-2 p-sm-1 menu"
    >
      <div class="nav">
        <div class="header-left">
          <a href="/" class="d-flex justify-content-center align-items-center">
            <img src="../../assets/images/logo.svg" alt="" width="60" height="60">
            <span class="logo-title">MiniPaw</span>
          </a>
        </div>

        <div
          class="collapse navbar-collapse header-center justify-content-center"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav text-center">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">{{
                $t("Home")
              }}</router-link>
            </li>
            <!-- <b-dropdown
              :title="$t('Shop')"
              :items="shopItems"
              displayExpr="Name"
              @onSelectItem="onSelectShopItem"
            >
            </b-dropdown> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/pet">{{
                $t("Pet")
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/product">{{
                $t("Shop")
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">{{
                $t("AboutUs")
              }}</router-link>
            </li>
          </ul>
        </div>

        <div class="header-right d-flex align-items-center text-center">
          <b-icon
            icon="fa-solid fa-magnifying-glass"
            id="search"
            @click="openSearch"
          />
          
          <template v-if="auth && isManager">
            <b-icon
              icon="fa-solid fa-gear"
              id="adminSettingIcon"
              @click="onClickSettingAdmin"
            />
          </template>
          <template v-else>
            <b-icon
              icon="fa-regular fa-user"
              id="userIcon"
              @click="onClickUserIcon"
            />
          </template>
          
          <div v-if="!isManager" class="cart" id="cartIcon">
            <b-icon
              class="cart-icon"
              icon="fa-solid fa-cart-shopping"
              @click="onGoToCart"
            />
            <div class="quantity">
              <small>{{ productQuantity }}</small>
            </div>
          </div>

          <b-button 
            v-if="auth"
            :text="$t('LogOut')"
            class="logout-button" 
            type="white"
            @click="onLogout" 
          >
            {{ $t("LogOut") }}
          </b-button>
        </div>
        <b-tooltip
          :text="$t('Search')"
          target="#search"
        />
        <b-tooltip
          :text="$t('AdminSetting')"
          target="#adminSettingIcon"
        />
        <b-tooltip
          :text="auth ? $t('AccountSetting') : $t('LogIn')"
          target="#userIcon"
        />

        <b-tooltip
          :text="$t('Cart')"
          target="#cartIcon"
        />
      </div>
    </nav>

    <!-- SEARCH -->
    <div class="search-tool" id="menucontainer">
      <div :class="['search-area', { active: openSearchForm }]">
        <div class="search-top">
          <h3 class="search-title">{{ $t("SearchDescription") }}</h3>
        </div>
        <div class="search-form d-flex">
          <!-- <input
            type="text"
            class="search-input"
            :placeholder="$t('ContentSearch')"
            ref="search"
            v-model="searchText"
            autofocus
          /> -->
          <b-text-box
            class="w-100"
            v-model="searchText"
            :placeholder="$t('ContentSearch')"
            :isSearchTextBox="true"
            @valueChanged="onSearch"
          />
          <b-button
            class="search-button ml-2"
            :text="$t('Search')"
          />
          <!-- <button type="button" class="search-button">{{ $t("Search") }}</button> -->
        </div>
        <div class="back">
          <i class="fa-solid fa-xmark" type="button" @click="closeSearch"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      userId: null,
      openSearchForm: false,
      searchText: "",
      message: null,
      isManager: false,
      productQuantity: 0,
      shopItems: [
        {
          Name: this.$t("Pet"),
          Link: '/pet'
        },
        {
          Name: this.$t("Product"),
          Link: '/product'
        }
      ]
    };
  },
  created() {
    this.isManager = this.$store.getters.isManager ? true : false;
    this.productQuantity = this.$store.getters.cart ? this.$store.getters.cart : 0;
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    /**
     * Mở popup tìm kiếm
     */
    openSearch() {
      this.openSearchForm = true;
    },
    /**
     * Đóng popup tìm kiếm
     */
    closeSearch() {
      this.openSearchForm = false;
    },
    /**
     * Tìm kiếm
     */
    onSearch() {

    },
    /**
     * Chọn item trong mục Cửa hàng
     * @param {*} item 
     */
    onSelectShopItem(item) {
      this.$router.push(item.Link)
    },
    /**
     * Sự kiến ấn chọn icon user. Nếu chưa đăng nhập thì điều hướng về trang đăng nhập, rồi thì là về trang cá nhân
     */
    onClickUserIcon() {
      if (this.auth) {
        this.$router.push('/profile');
      } else {
        this.$router.push('/sign-in');
      }
    },
    /**
     * Ấn đến thiết lập trang web của quản lý / admin
     */
    onClickSettingAdmin() {
      this.$router.push('/setting');
    },
    /**
     * Đến giỏ hàng cá nhân
     */
    onGoToCart() {
      if (this.auth) {
        this.$router.push('/cart');
      } else {
        this.$router.push('/sign-in');
      }
    },
    /**
     * Đăng xuất
     */
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  watch: {
    "$store.state.cart": {
      handler(val) {
        this.productQuantity = val;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.header-left {
  width: 30%;

  .logo-title {
    font-weight: 700;
    font-size: 45px;
    color: #D45079;
  }
}
.navbar-brand {
  font-family: "Pacifico", cursive;
  font-size: 40px;
}
.header-center {
  width: 30%;
  text-align: center;
  color: var(--black);
  font-size: 20px;
}
.header-center a.nav-link {
  color: #000;
  transition: 0.3s;
  font-weight: 600;
  margin-right: 20px;
}
.header-center a.nav-link:hover {
  color: var(--orange);
}
router-link {
  text-decoration: none;
}
.header-right {
  width: 20%;
  gap: 20px;

  .cart {
    width: 24px;
    height: 24px;
    position: relative;

    .cart-icon {
      position: absolute;
      left: 0;
    }

    .quantity {
      position: absolute;
      left: 50%;
      top: 0;
      z-index: 3;
      border-radius: 40%;
      border: 1px solid var(--white);
      background-color: var(--orange);
      height: 15px;
      min-width: 20px;

      small {
        font-size: 10px;
        position: relative;
        top: -30%;
        font-weight: bold;
        color: var(--white);
      }
    }
  }
}
.logout-button {
  background-color: transparent;
  color: black;
  border: 2px solid black;
  border-radius: 5px;
  font-weight: bold;
}

/* search's css */
.search-tool .search-area {
  width: 100%;
  height: 0%;
  opacity: 0;
  transition: height 1s ease;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transition: transform 0.35s cubic-bezier(0.46, 0.01, 0.32, 1),
    opacity 0.4s ease-out, height 0.5s ease-out;
  z-index: 2;
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .search-tool .search-area:not(.active) {
    height: 0px;
    transition: all 0.5px;
  }

}
.search-top {
  display: block;
  padding: 30px 15px;
  transition-delay: 0.2s;
  transition: all 0.5s ease;
  transform: translateY(-30px);
}
.search-title {
  font-size: 40px;
  text-align: center;
  color: black;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1em;
}
.search-form {
  width: calc(100% - 100px);
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  transition: all 0.6 linear;
  transform: translateY(-100%);
  opacity: 0;
}
.search-input {
  height: 44px;
  background-color: var(--white);
  color: #000;
  border: none;
  border-bottom: 2px solid var(--border-color);
  width: 100%;
}
.search-area .search-form input.search-input:active,
.search-area .search-form input.search-input:focus {
  outline: none;
  border-bottom: 2px solid var(--input-focus-border-color);
}
.search-area .search-form .search-button {
  width: 100px;
}
.search-area .back {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2;

  i {
    font-size: 40px;
  }
}
.search-tool .search-area.active {
  height: 250px;
  opacity: 1;
  transition: all 0.5s;
  z-index: 101;
  padding-bottom: 50px;

  .search-top {
    transform: translateY(0px);
  }

  .search-form {
    transform: translateY(0px);
    transition-delay: 0.3s;
    opacity: 1;
  }
}
</style>
