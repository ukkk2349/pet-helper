<template>
  <div class="container">
    <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
      <div class="form-wrapper">
        <h1 class="setting-title">{{ $t('AddPet') }}</h1>
        <b-validate ref="validateAddPet">
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
                v-model="pet.PetName"
                :isShowLabel="true"
                :label="$t('PetName')"
                require
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-number-box
                v-model="pet.Age"
                :isShowLabel="true"
                :label="$t('Age')"
                require
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b-select-box
                :items="dataCbbSpecies"
                displayExpr="Name"
                valueExpr="ID"
                :placeholder="$t('Species')"
                :isShowLabel="true"
                :label="$t('Species')"
                require
                @onSelectionChanged="onSelectSpecies"
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-text-area
                v-model="pet.Description"
                :isShowLabel="true"
                :label="$t('Description')"
                require
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-select-box
                :items="dataCbbHealthState"
                displayExpr="Name"
                valueExpr="ID"
                :placeholder="$t('HealthState')"
                :isShowLabel="true"
                :label="$t('HealthState')"
                require
                @onSelectionChanged="onSelectHealthState"
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
                @click="onAddPet"
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
import Pet from '@/model/Pet';
import PetAPI from '@/api/PetAPI';
import { success } from '@/common/commonFunction';

export default {
  name: "PetForm",
  data() {
    return {
      pet: new Pet(),
      previewImage: null,
      errorMsg: "",
      images: [],
      petID: null,
      dataCbbSpecies: [
        {
          ID: 1,
          Name: this.$t('Dog')
        },
        {
          ID: 2,
          Name: this.$t('Cat')
        },
        {
          ID: 3,
          Name: this.$t('Bird')
        },
        {
          ID: 4,
          Name: this.$t('Different')
        },
      ],
      dataCbbHealthState: [
        {
          ID: 1,
          Name: this.$t('Good')
        },
        {
          ID: 2,
          Name: this.$t('Weak')
        },
        {
          ID: 3,
          Name: this.$t('BeingTreated')
        },
      ]
    }
  },
  created() {
    this.pet = new Pet();
    this.petID = this.$route.query.id;
    if (this.petID) {
      PetAPI.getByID(this.petID).then(res => {
        if (res.data.Success) {
          this.pet = res.data.Data;
        }
      })
    }
  },
  methods: {
    /**
     * Chọn loài
     * @param {object} e item
     */
    onSelectSpecies(e) {
      if (e) {
        this.pet.SpeciesID = e.ID;
        this.pet.SpeciesName = e.Name;
      }
    },
    /**
     * Chọn tình trạng sức khoẻ
     * @param {object} e 
     */
    onSelectHealthState(e) {
      if (e) {
        this.pet.HealthStateID = e.ID;
        this.pet.HealthStateName = e.Name;
      }
    },
    /**
     * Thêm thú cưng mới
     */
    onAddPet() {     
      if (this.$refs.validateAddPet.validate() && this.validateAvatar()) {
        this.pet.Images = this.images.join("\\");
        PetAPI.save(this.pet).then(res => {
          if (res && res.data && res.data.Success) {
            success(this.$t('AddPetSuccessfully'));
            this.$router.push('/setting/pet')
          }
        })
      }
    },
    /**
     * Huỷ thêm -> trở về màn danh sách thú cưng
     */
    onCancel() {
      this.$router.push('/setting/pet');
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
          this.pet.PetAvatar = e.target.result;
        }

        reader.readAsDataURL(file[0]);
      }
    },
    /**
     * Chọn ảnh bổ sung của thú cưng
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