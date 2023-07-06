<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <h1 class="font-weight-bold">{{ $t('Pet') }}</h1>
    </div>
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
          <strong>{{ $t('Pet') }}</strong>
        </div>
      </div>
      <div class="col-sm-5 text-end">
        <div class="filter">
          <button class="filter-button" @click="isFiltering = !isFiltering">
            <i class="fas fa-filter filter-icon"></i>
            <span class="ms-2">{{ $t('Filter') }}</span>
          </button>
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
    <hr />

    <div class="row">
      <!-- pets list -->
      <div
        style="transition: 0.3s"
        :class="{ 'col-sm-6': isFiltering, 'col-md-8': isFiltering }"
      >
        <div
          class="col-lg-4 col-md-4 col-sm-6 col-12 col-item"
          style="transition: 0.3s"
          v-for="pet in pets"
          :key="pet.PetID"
        >
          <div class="item" v-if="!pet.isHidden">
            <div class="box-img cursor-pointer">
              <div class="pet-image" @click="onViewDetail(pet.PetID)">
                <img
                  class="img-fluid lazy-loaded"
                  :src="require(`@/assets/images/${pet.PetAvatar}`)"
                  :alt="pet.PetName"
                />
              </div>
            </div>
            <div class="box-info cursor-pointer" @click="onViewDetail(pet.PetID)">
              <div class="pet-name">{{
                pet.PetName
              }}</div>
              
            </div>
          </div>
        </div>
      </div>

      <!-- filter -->
      <div
        :class="{ 'col-md-4': isFiltering, 'col-sm-6': isFiltering }"
        style="position: relative; transition: 0.3s"
      >
        <div
          :class="[
            'filter-area',
            { active: isFiltering, 'hide-filter': !isFiltering },
          ]"
        >
          <div class="filter-content">
            <div class="filter-top">
              <h3 class="filter-title">{{ $t('ChooseAndFilter') }}</h3>
            </div>
            <div class="filter-form">
              <form action="">
                <div class="mb-4">
                  <div class="filter-header">{{ $t('Species') }}</div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="species"
                      id="dogRadio"
                      value="Dog"
                      checked
                      v-model="filter.species"
                    />
                    <label class="form-check-label" for="dogRadio">
                      {{ $t('Dog') }}
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="species"
                      id="catRadio"
                      value="Cat"
                      v-model="filter.species"
                    />
                    <label class="form-check-label" for="catRadio">
                      {{ $t('Cat') }}
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="species"
                      id="fishRadio"
                      value="Fish"
                      v-model="filter.species"
                    />
                    <label class="form-check-label" for="fishRadio">
                      {{ $t('Bird') }}
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="species"
                      id="birdRadio"
                      value="Bird"
                      v-model="filter.species"
                    />
                    <label class="form-check-label" for="birdRadio">
                      {{ $t('Different') }}
                    </label>
                  </div>
                  <div class="row justify-content-center">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="species"
                        id="allRadio"
                        value="All"
                        v-model="filter.species"
                      />
                      <label class="form-check-label" for="allRadio">
                        {{ $t('All') }}
                      </label>
                    </div>
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
import PetAPI from '@/api/PetAPI';

export default {
  name: "PetList",
  data() {
    return {
      isFiltering: false,
      pets: [],
      filter: {}
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
          me.pets = res.data.data;
        }
      }, err => {
        console.log(err)
      });
    },
    onViewDetail(petID) {
      this.$router.push({ path: '/pet/detail', query: {id: petID}});
    },
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  overflow: hidden;
  position: relative;
}
.bread-crumb {
  line-height: 25px;
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
  transition: 0.3s;
}
.filter-button:hover {
  color: #ff7a00;
}
.filter-button .filter-icon {
  text-align: end;
  font-size: 20px;
}
.item {
  padding: 37px;
}
.box-img {
  /* border-radius: 50%; */
  clip-path: circle(31%);

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
.col-item {
  float: left;
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
  transition: all 3s linear, opacity 0.3s ease-out;
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
.filter-area .filter-form .form-check {
  text-align: start;
  width: 40%;
  float: left;
  margin-left: 10%;
}
.filter-area .filter-form .form-check .form-check-input {
  text-align: center;
}
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