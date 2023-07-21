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
          <strong>{{ pet.PetName }}</strong>
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
                  v-for="(image, index) in pet.Images"
                  :key="image"
                >
                  <img
                    @click="selectedImg = index"
                    class="img-responsive w-100 lazy-loaded"
                    :src="require(`@/assets/images/${image}`)"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-10 gutter flex-column">
              <div
                class="product-img"
                v-for="(image, index) in pet.Images"
                :key="image"
              >
                <img
                  class="img-fluid"
                  :src="require(`@/assets/images/${image}`)"
                  v-if="selectedImg == index"
                  alt=""
                />
              </div>

              <b-button
                v-if="!isManager && !pet.IsAdopted"
                class="mt-4"
                :text="$t('SetAppointmentToViewAndAdopt')"
                @click="onSetAppointment"
              />
              <b-button
                type="secondary"
                v-if="pet.IsAdopted"
                class="mt-4"
                :text="$t('PetHadBeenAdopted')"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="detail text-start">
            <h2 class="product-title">{{ pet.PetName }}</h2>
            </div>
            <div class="product-summary text-left">
              <span class="weight">
                {{ $t('Species') }}: <span>{{ pet.SpeciesName }}</span>
              </span>
              <br />
              <span class="state">
                {{ $t('HealthState') }}: <span>{{ pet.HealthStateName }}</span>
              </span>
              <br />
              <span class="state">
                {{ $t('AdoptingState') }}: <span>{{ pet.IsAdopted ? $t('Adopted') : $t('WaitingForAdopting') }}</span>
              </span>
              <p class="mb-0" style="white-space: pre-line">
                {{ pet.Description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import PetAPI from '@/api/PetAPI';
import Pet from '@/model/Pet';

export default {
  name: "PetDetail",
  data() {
    return {
      petID: null,
      pet: new Pet(),
      selectedImg: 0,
      isManager: false
    }
  },
  created() {
    this.isManager = this.$store.getters.isManager;
    this.petID = this.$route.query.id;
    this.getData();
  },
  methods: {
    /**
     * Lấy dữ liệu chi tiết
     */
    getData() {
      PetAPI.getByID(this.petID).then(res => {
        if (res.data.Success) {
          this.pet = res.data.Data;
          this.pet.Images = this.pet.Images.split(';');
        }
      })
    },
    /**
     * Đặt lịch hẹn xem và nhận nuôi
     */
    onSetAppointment() {
      this.$router.push({ path: '/appointment', query: {id: this.petID}});
    }
  }
}
</script>

<style lang="scss" scoped>
.bread-crumb {
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
  text-align: start;
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
.product-img img{
  max-height: 400px;
}
.product-summary span {
  font-weight: 700;
}
</style>