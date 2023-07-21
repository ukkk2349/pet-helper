<template>
  <div class="container-fluid">
      <div class="row justify-content-center">
        <h1 class="setting-title">{{ $t('SettingProduct') }}</h1>
      </div>
      <hr />

      <div class="row">
        <div class="col-md-1 offset-md-2 col-2 gutter add-product-area">
          <b-button
            :text="$t('Add')"
            class="w-100"
            @click="onClickAddProduct"
          />
          <!-- <router-link to="/admin/add-product" class="add-product-button">
            <i id="addproduct" class="fas fa-plus"></i>
            <span>Add</span>
          </router-link> -->
        </div>
        <div class="col-md-7 col-10">
          <div class="searchbar">
            <b-text-box
              v-model="searchText"
              :placeholder="$t('ProductSearchPlaceholder')"
              :isSearchTextBox="true"
              @valueChanged="onSearch"
            />
          </div>
        </div>
      </div>

      <!-- product list -->
      <div class="row mt-4">
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-12 col-item gutter"
          style="padding: 0"
          v-for="product in products"
          :key="product.ProductID"
        >
          <div class="item">
            <div class="box-img">
              <img
                class="img-responsive w-100 lazy-loaded"
                :src="require(`@/assets/images/product/${product.ProductAvatar}`)"
                :alt="product.name"
              />
              <div class="product-options">
                <ul>
                  <li>
                    <div class="product-option view cursor-pointer" @click="onViewDetail(product.ProductID)">
                      <i class="fas fa-info-circle mr-1"></i>
                      <span>{{ $t('Detail') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="product-option update cursor-pointer" @click="onUpdateProduct(product.ProductID)">
                      <i class="fas fa-edit mr-1"></i>
                      <span>{{ $t('Edit') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="product-option delete cursor-pointer" @click="onDeleteProduct(product.ProductID)">
                      <i class="fas fa-trash-alt mr-1"></i>
                      <span>{{ $t('Delete') }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="box-info mt-3">
              <div
                class="product-name cursor-pointer"
                @click="onViewDetail(product.ProductID)"
              >
                {{ product.ProductName }}
            </div>
              <br />
              <p style="color: #ff7a00; font-weight: bold; margin-bottom: 0">
                {{ product.Price }} VND
              </p>
              <span v-if="!product.StateID == 2" style="color: red; font-weight: bold">{{ $t('OutOfStock') }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import ProductAPI from '@/api/ProductAPI';
import { success } from '@/common/commonFunction';

export default {
  name: "ProductSetting",
  data() {
    return {
      searchText: "",
      products: [],
      allProducts: []
    }
  },
  created() {
    this.getDataSource();
  },
  methods: {
    getDataSource() {
      var me = this;
      ProductAPI.getAll().then(res => {
        if (res.data.Success) {
          me.products = res.data.Data;
          me.allProducts = res.data.Data;
        }
      }, err => {
        console.log(err)
      });
    },
    /**
     * Mở form thêm sản phẩm
     */
    onClickAddProduct() {
      this.$router.push('/setting/product/add');
    },
    onViewDetail(productID) {
      this.$router.push({ path: '/product/detail', query: {id: productID}});
    },
    onUpdateProduct(productID) {
      this.$router.push({ path: '/setting/product/update', query: {id: productID}})
    },
    onDeleteProduct(productID) {
      ProductAPI.deleteByID(productID).then(res => {
        if (res.data.Success) {
          success(this.$t('DeleteProductSuccessfully'));
          this.getDataSource();
        }
      })
    },
    /**
     * Tìm kiếm
     */
    onSearch(val) {
      if (val && val.length > 0) {
        this.products = this.allProducts.filter(x => x.ProductName.toLowerCase().includes(val));
      } else {
        this.products = this.allProducts;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-product-area .add-product-button {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  color: #000;
}
.add-product-button #addproduct {
  float: left;
  font-size: 20px;
}
.add-product-button span{
  font-weight: bold;
  font-size: 20px
}
/* seach-input */
.searchbar {
  width: 100%;
  height: 50px;
}
.searchbar .search-input {
  width: 80%;
  height: 100%;
  font-size: 20px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  border: 2px solid #E8EAE6;
  padding-left: 2%;
}
.searchbar .search-input:focus {
  outline: none;
}

.searchbar .btn-search {
  width: 20%;
  height: 50px;
  border: 2px solid #E8EAE6;
  border-left: none;
  background-color: transparent;
  margin-top: 0;
  position: relative;
  top: -1px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
}

/* item */
.item {
  padding: 0px 15px;
}
.box-img {
  overflow: hidden;
  position: relative;
  height: 300px;
}
.box-img .product-options {
  position: absolute;
  top: 0;
  z-index: -2;
  opacity: 0;
  transition: opacity .5s;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
.box-img .product-options ul li {
  margin-top: 7%;
}
.box-img .product-options .product-option {
  opacity: 0;
  transition: opacity 1s;
  padding: 7px 13px;
  background-color: #FFF;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  color: #000

}
.box-img .product-options .product-option:hover {
  color: #ff7a00
}
.box-img:hover .product-options {
  z-index: 4;
  opacity: 1;
}
.box-img:hover .product-options .product-option {
  opacity: 1;
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
  filter: blur(4px)
}
.box-info .product-name {
  text-decoration: none;
  font-size: 28px;
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
</style>