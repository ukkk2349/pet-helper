<template>
  <div class="container-fluid">
    <div class="big-banner">
      <div class="picture">
        <img src="../assets/images/big-banner.jpg" alt="" class="w-100">
      </div>
      <div class="banner-text">
        <h1>MiniPaw</h1>
        <div class=" mt-2 ke mb-2"></div>
        <p>{{ $t("Slogan") }}</p>
        <a href="#mainContent" class="button btn btn-info mt-2">{{ $t("ViewNow") }}</a>
      </div> <!-- end banner-text -->
    </div>
    <!-- end big-banner  -->

    <div class="pets container-fluid mt-4" id="mainContent">
      <h1 class="setting-title">{{ $t("PetWaitingForAdopt") }}</h1>
      <div class="row">
        <template v-for="(pet, index) in pets" :key="pet.PetID">
          <div class="col-lg-4 col-md-4 col-sm-6 col-12 col-item" v-if="index<3">
            <div class="item">
              <div class="box-img">
                <div class="pet-image cursor-pointer" @click="onViewPetDetail(pet.PetID)">
                  <img class="img-fluid lazy-loaded" :src="require(`@/assets/images/${pet.PetAvatar}`)" :alt="pet.PetName">
                </div>
              </div>
              <div class="box-info">
                <div class="pet-name cursor-pointer" @click="onViewPetDetail(pet.PetID)">{{ pet.PetName }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="view-all text-end">
        <b-button
          :text="$t('ViewAll') + ' >>'"
          @click="onClickViewAll(1)"
        >
        </b-button>
      </div>
    </div>

    <div class="product container-fluid" style="padding-top: 80px">
      <h1 class="setting-title mb-4">{{ $t('Product') }}</h1>
      <div class="row">
        <template v-for="(product, index) in products" :key="product.ProductID">
          <div v-if="index<4" class="col-lg-3 col-md-4 col-sm-6 col-12 col-item gutter" style="padding: 0">
            <div class="item">
              <div class="box-img cursor-pointer">
                <div @click="onViewProductDetail(product.ProductID)">
                  <img class="img-responsive w-100 lazy-loaded" :src="require(`@/assets/images/product/${product.ProductAvatar}`)" :alt="product.ProductName">
                </div>
              </div>
              <div class="box-info">
                <div class="product-name cursor-pointer" @click="onViewProductDetail(product.ProductID)" style="padding: 20px 0 4px 0">{{ product.ProductName }}</div>
                <br>
                <p style="color: #FF7A00; font-weight: bold; margin-bottom: 0">${{ product.Price }}</p>
                <span v-if="!product.State == 2" style="color: red; font-weight: bold">{{ $t('OutOfStock') }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="view-all text-end">
        <b-button
          :text="$t('ViewAll') + ' >>'"
          @click="onClickViewAll(2)"
        >
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
import PetAPI from '@/api/PetAPI';
import ProductAPI from '@/api/ProductAPI';

export default {
  name: "HomePage",
  components: {
    
  },
  data() {
    return {
      pets: [],
      products: []
    }
  },
  created() {
    this.getPetData();
    this.getProductData();
  },
  methods: {
    /**
     * Lấy list thú cưng
     */
    getPetData() {
      var me = this;
      PetAPI.getAll().then(res => {
        if (res.data.success) {
          me.pets = res.data.data;
        }
      }, err => {
        console.log(err)
      });
    },
    /**
     * Lấy list sản phẩm
     */
    getProductData() {
      var me = this;
      ProductAPI.getAll().then(res => {
        if (res.data.success) {
          me.products = res.data.data;
        }
      }, err => {
        console.log(err)
      });
    },
    onSelectionChanged(e) {
      console.log(e);
    },
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
    onClickViewAll(index) {
      switch (index) {
        case 1:
          this.$router.push('pet');
          break;
        case 2:
          this.$router.push('product');
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.big-banner {
  position: relative;
  .banner-text {
    width: 40%;
    text-align: left;
    position: absolute;
    top: 33%;
    left: 10%;
    z-index: 2;
    opacity: 1;
    color: white;
  
    h1 {
      font-size: 60px;
    font-weight: bold;
    }
  
    p {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.5;
    }
  }
};
  .banner-text .button {
    color: white;
    font-size: 15px;
    background: transparent;
    border: 1px solid white;
    font-weight: bold;
    text-transform: uppercase;
    padding: 2% 4%;
  }
  .banner-text .button:hover {background: white; color: black}
  .banner-text {
    animation: 1s text-comein forwards;
    animation-delay: 0.3s;
  }
  @media screen and (max-width: 480px) {
    .big-banner {
      padding-top: 27px
    }
    .banner-text h1 {
      font-size: 20px;
    }
    .banner-text p {
      font-size: 10px;
    }
    .banner-text .button {
      font-size: 10px;
      position: absolute;
      top: 90px
    }
  }
  @keyframes text-comein {
    from {transform: translateX(-100px); opacity: 0}
    to {transform: translateX(0px); opacity: 1}
  }
  .item {
    padding: 0px 15px
  }
  .product .box-img {
    overflow: hidden;
    height: 300px;
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