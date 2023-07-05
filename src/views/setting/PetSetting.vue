<template>
  <div class="container-fluid">
      <div class="row justify-content-center">
        <h1 class="setting-title">{{ $t('Pet') }}</h1>
      </div>
      <hr />

      <div class="row mt-4">
        <div class="col-md-1 offset-md-2 col-2 gutter add-pet-area pr-0">
          <!-- <router-link to="/admin/add-pet" class="add-pet-button">
            <svg id="catadd" style="enable-background:new 0 0 300 300;" version="1.1" viewBox="0 0 300 300" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="   M203.152,50.384C187.131,42.456,169.086,38,150,38C83.726,38,30,91.726,30,158s53.726,120,120,120s120-53.726,120-120   c0-18.284-4.089-35.612-11.403-51.121" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><path d="   M163.126,119.763C159.015,118.621,154.598,118,150,118c-5.108,0-9.994,0.766-14.485,2.162c-2.326-4.88-8.688-17.237-15.633-22.162   c0,0-7.278,19.104-5.643,37.648C111.527,139.964,110,144.839,110,150c0,14.728,12.437,27.132,29.367,30.857   C122.437,190.17,110,221.18,110,258c0,4.554,0.19,9.02,0.556,13.367C122.91,275.664,136.182,278,150,278s27.09-2.336,39.444-6.633   C189.81,267.02,190,262.554,190,258c0-36.82-12.437-67.83-29.368-77.143C177.563,177.132,190,164.728,190,150   c0-5.994-2.06-11.603-5.644-16.398C185.32,115.725,178.568,98,178.568,98C171.805,102.796,165.595,114.638,163.126,119.763z" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><circle cx="238" cy="70" r="40" style="fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"/><line style="fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="238" x2="238" y1="94" y2="46"/><line style="fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="214" x2="262" y1="70" y2="70"/></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>
            <span>{{  }}</span>
          </router-link> -->
          <b-button
            :text="$t('Add')"
            class="w-100"
            @click="onClickAddPet"
          >
          </b-button>
        </div>
        <div class="col-md-7 col-10">
          <div class="searchbar">
            <!-- <input type="text" class="search-input float-left" v-model="search" v-on:keyup="onSearch" placeholder="Name..."> -->
            <b-text-box
              v-model="searchText"
              :placeholder="$t('PetSearchPlaceholder')"
              :isSearchTextBox="true"
            />
          </div>
        </div>
      </div>

      <!-- pets list -->
      <div class="row">
        <div
          class="col-lg-4 col-md-4 col-sm-6 col-12 col-item"
          style="transition: 0.3s"
          v-for="pet in listPet"
          :key="pet.PetID"
        >
          <div class="item">
            <div class="box-img">
              <div class="pet-image" :to="'/pet/info/' + pet.id">
                <img
                  class="img-fluid lazy-loaded"
                  :src="require(`@/assets/images/${pet.PetAvatar}`)"
                  :alt="pet.PetName"
                />
              </div>
              <div class="pet-options">
                <ul>
                  <li>
                    <div class="pet-option view cursor-pointer" @click="onViewDetail(pet.PetID)">
                      <i class="fas fa-info-circle mr-1"></i>
                      <span>{{ $t('Detail') }}</span>
                    </div>
                  </li>
                  <li>
                    <div class="pet-option update cursor-pointer" @click="onUpdatePet(pet.PetID)">
                      <i class="fas fa-edit mr-1"></i>
                      <span>Edit</span>
                    </div>
                  </li>
                  <li>
                    <div class="pet-option delete cursor-pointer" @click="onDeletePet(pet.PetID)">
                      <i class="fas fa-trash-alt mr-1"></i>
                      <span>Delete</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="box-info">
              <router-link class="pet-name" :to="'/pet/info/' + pet.PetID">{{
                pet.PetName
              }}</router-link>
              <br />
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import PetAPI from '@/api/PetAPI';
import { success } from '@/common/commonFunction';

export default {
  name: "PetSetting",
  data() {
    return {
      listPet: [],
      searchText: ""
    }
  },
  created() {
    this.getDataSource();
  },
  methods: {
    getDataSource() {
      var me = this;
      PetAPI.getAll().then(res => {
        if (res.data.success) {
          me.listPet = res.data.data;
        }
      }, err => {
        console.log(err)
      });
    },
    /**
     * Tìm kiếm
     */
    onSearch() {

    },
    /**
     * Hiển thị form thêm thú cưng
     */
    onClickAddPet() {
      this.$router.push('pet/add');
    },
    onDeletePet(petID) {
      PetAPI.deleteByID(petID).then(res => {
        if (res.data.success) {
          success(this.$t('DeletePetSuccessfully'));
          this.getDataSource()
        }
      })
    },
    onViewDetail(petID) {
      this.$router.push({ path: '/pet/detail', query: {id: petID}});
    },
    onUpdatePet(petID) {
      this.$router.push({ path: '/setting/pet/update', query: {id: petID}})
    }
  }
}
</script>

<style lang="scss" scoped>
.add-pet-button span{
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
  padding: 37px;
}
.box-img {
  clip-path: circle(40%);

  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  height: 250px;
}
.box-img img {
  transition: all 0.8s linear;
  object-fit: cover;
  max-block-size: -webkit-fill-available;
  height: 100%;
}
.box-img:hover img {
  transform: scale(1.04);
  transition: all 0.8s linear;
  filter: blur(4px)
}
.box-img .pet-options {
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
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      margin-top: 10px;
    }
  }

  .pet-option {
    opacity: 0;
    transition: .5s;
    padding: 7px 13px;
    background-color: #FFF;
    border: none;
    border-radius: 20px;
    text-decoration: none;
    color: #000;

    &:hover {
      color: var(--orange);
    }
  }
}
.box-img:hover .pet-options {
  z-index: 4;
  opacity: 1;
}
.box-img:hover .pet-options .pet-option {
  opacity: 1;
}
.box-info .pet-name {
  text-decoration: none;
  font-weight: 500;
  font-size: 28px;
  display: inline-block;
  margin-bottom: 10px;
  color: black;
  transition: all 0.3s;
}
.box-info .pet-name:hover {
  color: #ff7a00;
}
.box-info p {
  color: #888;
}
</style>