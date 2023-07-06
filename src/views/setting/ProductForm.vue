<template>
  <div class="container">
    <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
      <div class="form-wrapper">
        <h1 class="setting-title">{{ $t('AddProduct') }}</h1>
        <b-validate ref="validateAddProduct">
          <div
            v-if="previewImage != null"
            class="image-preview-wrapper"
            :style="{ 'background-image': `url(${previewImage})` }"
          >
          </div>
          <div class="d-flex flex-column align-items-start mb-3">
            <label class="images bold text-start">{{ $t('Avatar') }} <span class="require"></span></label>
            <div class="d-flex align-items-center">
              <label for="avatar-image" class="choose-image-button cursor-pointer mb-0">{{ $t('ChooseImage') }}</label>
              <span class="ml-2">{{ previewImage ? $t('ChoseImage', {number: 1}) : '' }}</span>
              <input
                id="avatar-image"
                class="form-control d-none"
                type="file"
                name="filetoupload"
                ref="fileInput"
                @change="updateAvatar"
                required
              />
            </div>
          </div>

          <div class="d-flex flex-column align-items-start mb-3">
            <label class="images bold text-start">{{ $t('Images') }} <span class="require"></span></label>
            <div class="d-flex align-items-center">
              <label for="images" class="choose-image-button cursor-pointer mb-0">{{ $t('ChooseImage') }}</label>
              <span class="ml-2">{{ images && images.length > 0 ? $t('ChoseImage', {number: images.length}) : '' }}</span>
              <input
                id="images"
                class="form-control d-none"
                type="file"
                name="filetoupload"
                ref="fileInputs"
                @change="updateImages"
                multiple
                required
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-text-box
                v-model="product.ProductName"
                :isShowLabel="true"
                :label="$t('ProductName')"
                require
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-date-box
                :isShowLabel="true"
                :label="$t('ManufacturingDate')"
                v-model="product.ManufacturingDate"
                require
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-date-box
                :isShowLabel="true"
                :label="$t('ExpiredDate')"
                v-model="product.ExpiredDate"
                require
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-text-box
                v-model="product.Origin"
                :isShowLabel="true"
                :label="$t('Origin')"
                require
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-select-box
                :items="dataCbbState"
                displayExpr="Name"
                valueExpr="ID"
                :placeholder="$t('State')"
                :isShowLabel="true"
                :label="$t('State')"
                require
                @onSelectionChanged="onSelectState"
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-number-box
                v-model="product.Price"
                :isShowLabel="true"
                :label="$t('Price')"
                require
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
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

          <div class="row">
            <div class="col">
              <b-text-area
                v-model="product.Description"
                :isShowLabel="true"
                :label="$t('Description')"
                require
              />
            </div>
          </div>

          <small id="message" style="color: red; font-weight: bold">{{ errorMsg }}</small>
          <div class="row mt-4">
            <div class="col d-flex flex-row-reverse justify-content-start">
              <b-button
                :text="$t('Add')"
                style="width: 80px"
                class="ml-2"
                @click="onAddProduct"
              />
              <b-button
                :text="$t('Cancel')"
                style="width: 80px"
                type="white"
                @click="onCancel"
              />
            </div>
          </div>

        </b-validate>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/model/Product';
import ProductAPI from '@/api/ProductAPI';
import { success } from '@/common/commonFunction';

export default {
  name: "ProductForm",
  data() {
    return {
      product: new Product(),
      errorMsg: "",
      previewImage: null,
      images: [],
      dataCbbState: [
        {
          ID: 1,
          Name: this.$t('Stocking')
        },
        {
          ID: 2,
          Name: this.$t('OutOfStock')
        }
      ],
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
  methods: {
    onCancel() {
      this.$router.push('/setting/product');
    },
    onAddProduct() {
      if (this.$refs.validateAddProduct.validate() && this.validateAvatar()) {
        this.product.Images = this.images.join("\\");
        ProductAPI.save(this.product).then(res => {
          if (res && res.data) {
            success(this.$t('AddProductSuccessfully'));
            this.$router.push('/setting/product')
          }
        })
      }
    },
    /**
     * validate ảnh đại diện là bắt buộc
     */
     validateAvatar() {
      if (this.previewImage) {
        return true;
      } else {
        this.errorMsg = this.$t('PleaseChooseAvatar');
        return false;
      }
    },
    /**
     * Lấy ảnh preview khi chọn ảnh đại diện
     */
     updateAvatar() {
      this.errorMsg = null;
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader;
        reader.onload = e => {
          this.previewImage = e.target.result;
          this.product.ProductAvatar = e.target.result;
        }

        reader.readAsDataURL(file[0]);
      }
    },
    /**
     * Chọn ảnh bổ sung
     */
     updateImages() {
      this.images = [];
      var me = this;
      var files = this.$refs.fileInputs.files;
      var reader = new FileReader();  
      function readFile(index) {
        if( index >= files.length ) return;
        var file = files[index];
        reader.onload = function(e) {  
          // get file content  
          me.images.push(e.target.result);
          // do sth with bin
          readFile(index+1)
        }
        reader.readAsDataURL(file);
      }
      readFile(0);
    },
    onSelectState(e) {
      if (e) {
        this.product.StateID = e.ID;
        this.product.StateName = e.Name;
      }
    },
    /**
     * Chọn phân loại sản phẩm
     * @param {object} e 
     */
    onSelectProductCategory(e) {
      if (e) {
        this.product.ProductCategoryID = e.ID;
        this.product.ProductCategoryName = e.Name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-preview-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
  border: 1px solid var(--black);
}

.choose-image-button {
  height: 36px;
  background-color: var(--white);
  color: var(--black);
  border: 2px solid var(--border-color);
  padding: 6px 10px;
  border-radius: var(--button-border-radius);
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper {
  background-color: #faf5ef;
  padding: 5%;
  border-radius: 5%;
} 
.row {
  margin-bottom: 10px;
}
</style>