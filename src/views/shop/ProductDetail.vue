<template>
  <div class="container-fluid">
    <div class="row m-4">
      <div class="col-sm-6 text-left">
        <div class="bread-crumb">
          <router-link
            class="back-to-home"
            to="/"
            title="Back to the frontpage"
            >{{ $t('Home') }}</router-link
          >
          <i class="fas fa-angle-right"></i>
          <strong>{{ product.ProductName }}</strong>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="row">
        <div class="col-lg-5 col-md-7 col-sm-12 col-12">
          <div class="row">
            <div class="col-sm-2 gutter pt-4">
              <div class="image-track w-100">
                <div
                  class="mini-image mb-3"
                  v-for="(image, index) in product.Images"
                  :key="image"
                >
                  <img
                    @click="selectedImg = index"
                    class="img-responsive w-100 lazy-loaded"
                    :src="require(`@/assets/images/product/${image}`)"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-10 gutter">
              <div
                class="product-img"
                v-for="(image, index) in product.Images"
                :key="image"
              >
                <img
                  class="img-fluid"
                  :src="require(`@/assets/images/product/${image}`)"
                  v-if="selectedImg == index"
                  alt=""
                />
              </div>
              
              <div>
                <small
                  id="message"
                  style="color: red; font-weight: bold"
                ></small>
                <span v-if="!product.State == 2" style="color: red; font-weight: bold">{{ $t('OutOfStock') }}</span>
                <br />
                <b-button
                  v-if="!isManager"
                  :text="$t('AddToCart')"
                  @click="addToCart"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-5 col-sm-12 col-12">
          <div class="detail text-start">
            <h2 class="product-title">{{ product.ProductName }}</h2>
            <div class="product-">
              <h4 style="color: #ff7a00; font-weight: bold">
                {{ formatMoney(product.Price) }}
              </h4>
              <hr />
            </div>
            <div class="product-summary text-left mb-3">
              <span class="weight"> <b>{{ $t('ManufacturingDate') }}:</b> {{ formatDateX(product.ManufacturingDate) }} </span>
              <br />
              <span class="calories mb-1">
                <b>{{ $t('ExpiredDate') }}:</b> {{ formatDateX(product.ExpiredDate) }}
              </span>
              <br>
              <span class="stock mb-1">
                <b>{{ $t('Origin') }}:</b> {{ product.Origin }}
              </span>
              <br>
              <span class="stock mb-1">
                <b>{{ $t('State') }}:</b> {{ product.StateID == 1 ? $t('Stocking') : $t('OutOfStock') }}
              </span>
              <p class="mb-0 pb-0" style="white-space: pre-line">
                {{ product.Description }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-12 col-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/model/Product';
import ProductAPI from '@/api/ProductAPI';
import CartAPI from '@/api/CartAPI';
import Cart from '@/model/Cart';
import { formatDate, formatMoney } from '@/common/commonFunction';
import { success } from '@/common/commonFunction';

export default {
  name: "ProductDetail",
  data() {
    return {
      product: new Product(),
      productID: null,
      selectedImg: 0,
      isManager: false
    }
  },
  created() {
    this.isManager = this.$store.getters.isAdmin;
    this.productID = this.$route.query.id;
    this.getData();
  },
  methods: {
    /**
     * Lấy dữ liệu chi tiết của sản phẩm
     */
    getData() {
      ProductAPI.getByID(this.productID).then(res => {
        if (res.data.Success) {
          this.product = res.data.Data;
          this.product.Images = this.product.Images.split(';');
        }
      })
    },
    formatDateX(s) {
      return formatDate(s);
    },
    /**
     * Thêm vào giỏ hàng
     */
    addToCart() {
      var cart = new Cart();
      cart.Price = this.product.Price;
      cart.ProductID = this.productID;
      cart.ProductName = this.product.ProductName;
      cart.ProductAvatar = this.product.ProductAvatar;
      CartAPI.save(cart).then(res => {
        if (res.data && res.data.Success) {
          success(this.$t('AddToCartSuccessfully'));
          this.$store.dispatch('addToCart');
        }
      }, err => {
        console.log(err);
      })
    },
    formatMoney(val) {
      return formatMoney(val);
    }
  }
}
</script>

<style lang="scss" scoped>
.bread-crumb {
  font-size: 14px;
  font-weight: 500;
  color: #878787;
}
.bread-crumb .back-to-home {
  color: #000;
  text-decoration: none;
}
.bread-crumb .back-to-home:hover {
  text-decoration: underline;
}
.bread-crumb i {
  padding: 0 10px;
  color: #878787;
}
.content .detail p {
  font-size: 14px;
  color: #a8a8a8;
  line-height: 28px;
  font-weight: 400;
  padding-bottom: 30px;
}

.content .detail .btn-action {
  border: none;
  padding: 0 39px;
  height: 55px;
  font-size: 14px;
  background: #ff7a00;
  letter-spacing: 0.2em;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  transition: 0.3s;
  text-align: center;
}
.mini-image:hover {
  cursor: pointer;
}
</style>