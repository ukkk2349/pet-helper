<template>
  <div class="container-fluid">
    <h1 class="font-weight-bold">{{ $t('Product') }}</h1>
    <hr />

    <!-- bread crumb -->
    <div class="row">
      <div class="col-sm-6 text-start">
        <div class="bread-crumb">
          <router-link
            class="back-to-home"
            to="/"
            title="Back to the frontpage"
            >{{ $t('Home') }}</router-link
          >
          <i type="button" class="fas fa-angle-right"></i>
          <strong>{{ $t('Product') }}</strong>
        </div>
      </div>
      <div class="col-sm-5 text-end">
        <div class="filter">
          <button class="filter-button" @click="filtering = !filtering">
            <i class="fas fa-filter filter-icon"></i>
            <span class="ms-2">{{ $t('Filter') }}</span>
          </button>
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
    <hr />

    <div class="row">
      <!-- product list -->
      <div
        style="transition: 0.3s"
        :class="{ 'col-sm-6': filtering, 'col-md-8': filtering }"
      >
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-12 col-item gutter"
          style="padding: 0"
          v-for="product in products"
          :key="product.ProductID"
        >
          <div class="item" v-if="!product.isHidden">
            <div class="box-img cursor-pointer">
              <div @click="onViewDetail(product.ProductID)">
                <img
                  class="img-responsive w-100 lazy-loaded"
                  :src="require(`@/assets/images/product/${product.ProductAvatar}`)"
                  :alt="product.ProductName"
                />
              </div>
            </div>
            <div class="box-info">
              <div
                class="product-name cursor-pointer"
                style="padding: 20px 0 4px 0"
                @click="onViewDetail(product.ProductID)"
              >
                {{ product.ProductName }}
              </div>
              <p style="color: #ff7a00; font-weight: bold; margin-bottom: 0">
                ${{ product.Price }}
              </p>
              <span v-if="!product.StateID == 2" style="color: red; font-weight: bold">{{ $t('OutOfStock') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- filter -->
      <div
        :class="{ 'col-md-4': filtering, 'col-sm-6': filtering }"
        style="position: relative"
      >
        <div
          :class="[
            'filter-area',
            { active: filtering, hideFilter: !filtering },
          ]"
        >
          <div class="filter-content">
            <div class="filter-top">
              <h3 class="filter-title">{{ $t('ChooseAndFilter') }}</h3>
            </div>
            <div class="filter-form">
              <form action="">
                <div class="filter-group">
                  <div class="filter-header">{{ $t('ProductCategory') }}</div>
                  <div class="range-filter d-flex justify-content-evenly">
                    <b-select-box
                      :items="dataCbbProductCategory"
                      displayExpr="Name"
                      valueExpr="ID"
                      :placeholder="$t('ProductCategory')"
                      :isShowLabel="true"
                      :label="$t('ProductCategory')"
                      require
                      @onSelectionChanged="onSelectProductCategory"
                    />
                  </div>
                </div>
                <div class="filter-group mb-4">
                  <div class="filter-header">{{ $t('Price') }}</div>
                  <div class="range-filter d-flex justify-content-evenly">
                    <b-number-box
                      v-model="filter.MinPrice"
                    />
                    <div class="range-line"></div>
                    <b-number-box
                      v-model="filter.MaxPrice"
                    />
                  </div>
                </div>

                <b-button
                  :text="$t('Reset')"
                  type="secondary"
                  class="mr-2"
                />
                <b-button
                  :text="$t('Filter')"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductAPI from '@/api/ProductAPI';

export default {
  name: "ProductList",
  data() {
    return {
      filtering: false,
      filter: {},
      products: [],
      dataCbbProductCategory: [
        {
          ID: 1,
          Name: this.$t('Food')
        },
        {
          ID: 2,
          Name: this.$t('Effects')
        },
        {
          ID: 3,
          Name: this.$t('CareSupply')
        },
      ]
    }
  },
  created() {
    this.getDataSource();
  },
  methods: {
    getDataSource() {
      var me = this;
      ProductAPI.getAll().then(res => {
        if (res.data.success) {
          me.products = res.data.data;
        }
      }, err => {
        console.log(err)
      });
    },
    /**
     * Xem chi tiết sản phẩm
     * @param {int} productID id sản phẩm
     */
    onViewDetail(productID) {
      this.$router.push({ path: '/product/detail', query: {id: productID}});
    },
    onSelectProductCategory(e) {
      if (e) {
        this.filter.ProductCategoryID = e.ID;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bread-crumb {
  font-family: "Quicksand", sans-serif;
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
.filter-button {
  border: none;
  border-radius: 3px;
  background-color: transparent;
  transition: all 0.3s;
}
.filter-button:hover {
  color: #ff7a00;
}
.filter-button .filter-icon {
  text-align: end;
  font-size: 20px;
}
.item {
  padding: 0px 15px;
  width: 200px;
}
.box-img {
  overflow: hidden;
  height: 200px;
  width: 200px;
}
.box-img img {
  transition: all 0.8s linear;
  height: 100%;
  object-fit: cover;
}
@media screen and (max-width: 480px) {
  .box-img {
    height: 150px;
  }
}
.box-img:hover img {
  transform: scale(1.04);
  transition: all 0.8s linear;
}
.box-info .product-name {
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  color: #000;
  line-height: 28px;
}
.box-info .product-name:hover {
  color: #ff7a00;
}
.box-info p {
  color: #888;
}

.filter-area {
  background-color: #fff;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 5%;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: -50%;
  transition: opacity 0.3s ease-out;
  z-index: 2;
}
.filter-content {
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s linear;
}
.filter-area .filter-title {
  transform: translateX(-30px);
}
.filter-area .filter-form {
  position: relative;
  transition: opacity 0.3s;
  transition-delay: 0.3s;
  transform: translateX(-100%);
  visibility: hidden;
  margin-top: 10%;
}
.filter-area .filter-form .filter-header {
  font-weight: 900;
  text-align: start;
  margin-bottom: 10px;
  text-decoration: underline;
}
.filter-area .filter-form .range-calories,
.filter-area .filter-form .range-price {
  width: 6rem;
}
.filter-area .filter-form .range-filter .range-line {
  width: 1rem !important;
  height: 1px;
  background-color: #bdbdbd;
  margin: auto 0.625rem;
}
.filter-area .filter-form .filter-apply-button {
  border: none;
  background-color: #000;
  color: #fff;
  padding: 3% 10%;
}

@keyframes showFilter {
  from {
    right: -100%;
  }
  to {
    right: 0;
  }
}
.filter-area.active {
  width: 100%;
  opacity: 1;
  display: block;
  visibility: visible;
  z-index: 100;
  right: 0;
  animation: showFilter 0.5s ease forwards;
}
.filter-area.active .filter-content {
  opacity: 1;
  visibility: visible;
}
.filter-area.active .filter-title {
  transform: translateX(0);
}
.filter-area.active .filter-form {
  transform: translateX(0);
  transition-delay: 1s;
  opacity: 1;
  visibility: visible;
}
@keyframes hideFilter {
  from {
    right: 0;
  }
  to {
    right: -100%;
  }
}
.filter-area.hide-filter {
  animation: hideFilter 3s linear;
}
</style>