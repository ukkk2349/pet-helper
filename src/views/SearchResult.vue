<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <h1 class="setting-title">{{ $t('SearchResult', {value: searchValue}) }}</h1>
    </div>
    <hr />

    <div class="pets container-fluid mt-4" id="mainContent">
      <h1 class="setting-title">{{ $t("PetWaitingForAdopt") }}</h1>
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div class="description">
            {{ $t('DescriptionPetListHomePage') }}
          </div>
        </div>
      </div>
      <div class="row">
        <template v-for="(pet, index) in pets" :key="pet.PetID">
          <div class="col-lg-4 col-md-4 col-sm-6 col-12 col-item" v-if="index<3">
            <div class="item">
              <div class="box-img">
                <div class="pet-image cursor-pointer" @click="onViewPetDetail(pet.PetID)">
                  <img 
                    class="img-fluid lazy-loaded" 
                    :src="require(`@/assets/images/${pet.PetAvatar}`)" 
                    :alt="pet.PetName"
                    :title="pet.PetName"
                  >
                </div>
              </div>
              <div class="box-info">
                <div class="adopt-status" :class="pet.IsAdopted ? 'adopted' : 'not-adopted'">
                  {{ pet.IsAdopted ? $t('Adopted') : $t('WaitingForAdopting') }}
                </div>
                <div class="pet-name cursor-pointer" @click="onViewPetDetail(pet.PetID)">{{ pet.PetName }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="product container-fluid" style="padding-top: 80px">
      <h1 class="setting-title mb-4">{{ $t('Product') }}</h1>
      <div class="row">
        <template v-for="(product, index) in products" :key="product.ProductID">
          <div v-if="index<4" class="col-lg-3 col-md-4 col-sm-6 col-12 col-item gutter px-4" style="padding: 0">
            <div class="item">
              <div class="box-img cursor-pointer">
                <div @click="onViewProductDetail(product.ProductID)">
                  <img 
                    class="img-responsive w-100 lazy-loaded" 
                    :src="require(`@/assets/images/product/${product.ProductAvatar}`)" 
                    :alt="product.ProductName"
                    :title="product.ProductName"
                  >
                </div>
              </div>
              <div class="box-info">
                <div 
                  class="product-name cursor-pointer" 
                  @click="onViewProductDetail(product.ProductID)" 
                  style="padding: 20px 0 4px 0"
                  :title="product.ProductName"
                >
                  {{ product.ProductName }}
                </div>
                <br>
                <p style="color: #FF7A00; font-weight: bold; margin-bottom: 0">{{ formatMoney(product.Price) }}</p>
                <span v-if="!product.State == 2" style="color: red; font-weight: bold">{{ $t('OutOfStock') }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CommonAPI from '@/api/CommonAPI';
import { formatMoney } from '@/common/commonFunction';

export default {
  name: "SearchResult",
  data() {
    return {
      pets: [],
      product: [],
      searchValue: ""
    }
  },
  created() {
    this.searchValue = this.$route.query.searchValue;
    CommonAPI.searchGlobal(this.searchValue)
    .then(res => {
      if (res.data && res.data.Success) {
        this.pets = res.data.Data.Pets;
        this.products = res.data.Data.Products;
      }
    })
    .catch(err => {
      console.log(err);
    })
  },
  methods: {
    /**
     * Xem chi tiết thú cưng
     * @param {int} petID id thú cưng
     */
     onViewPetDetail(petID) {
      this.$router.push({ path: '/pet/detail', query: {id: petID}});
    },
    /**
     * Xem chi tiết sản phẩm
     * @param {int} productID id sản phẩm
     */
     onViewProductDetail(productID) {
      this.$router.push({ path: '/product/detail', query: {id: productID}});
    },
    formatMoney(val) {
      return formatMoney(val);
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    padding: 0px 15px;
  } 
  .product .box-img {
    overflow: hidden;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  .box-img img {
    transition: all .8s linear; 
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 480px) {
    .box-img {
      height: 150px
    }
  }
  .pets .box-img {
    /* border-radius: 50%; */
    clip-path: circle(32%);
    height: 250px;
    margin-bottom: 15px;
    overflow: hidden;
  }
  .box-img img {
    transition: all .8s linear; 
    object-fit: cover;
    height: 100%;
  }
  .box-img:hover img {
    transform: scale(1.04);
    transition: all .8s linear; 
  }
  .box-info .product-name {
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    line-height: 28px;
  }
  .box-info .product-name:hover {
    color: #ff7a00;
  }
  .box-info .pet-name {
    text-decoration: none;
    font-weight: 500;
    font-size: 28px;
    display: inline-block;
    margin-bottom: 10px;
    color: black;
    transition: all .3s;
  }
  .box-info .pet-name:hover {
    color: #ff7a00;
  }
  .box-info p {
      color: #888;
  }
  .find-pet h4 {
    font-size: 20px;
    margin: 30px 0;
  }
</style>