<template>
  <div class="container">
    <div class="col-sm-8 col-lg-6 offset-sm-2 offset-lg-3">
      <div class="form-wrapper">
        <h1 class="setting-title">{{ $t('SetAppointment') }}</h1>
        <b-validate ref="validateAddAppointment">
          <img
            v-if="pet.PetAvatar"
            class="image-preview-wrapper"
            :src="require(`@/assets/images/${pet.PetAvatar}`)"
            alt="pet.PetName"
          />

          <div class="row">
            <div class="col">
              <b-text-box
                v-model="pet.PetName"
                :isShowLabel="true"
                :label="$t('PetName')"
                disabled
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <b-date-box
                :isShowLabel="true"
                :label="$t('AppointmentDate')"
                v-model="appointment.AppointmentDate"
                type="datetime"
                require
              />
            </div>
          </div>

          <div class="mb-2">{{ $t('WeNeedYourEngagement') }}</div>
          <div class="row">
            <div class="col">
              <b-check-box v-model="engageStatus" :label="$t('EngageToJoinAppointment')"/>
            </div>
          </div>

          <small id="message" style="color: red; font-weight: bold">{{ errorMsg }}</small>
          <div class="row mt-4">
            <div class="col d-flex flex-row-reverse justify-content-center">
              <b-button
                :text="$t('SetAppointment')"
                style="width: 80px"
                class="ml-2"
                :disabled="!engageStatus"
                @click="onSetAppointment"
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
import AppointmentAPI from '@/api/AppointmentAPI';
import PetAPI from '@/api/PetAPI';
import Appointment from '@/model/Appointment';
import Pet from '@/model/Pet';
import AppointmentStatus from '@/enum/AppointmentStatus';
import { success } from '@/common/commonFunction';

export default {
  name: "AppointmentForm",
  data() {
    return {
      appointment: new Appointment(),
      petImage: null,
      petID: null,
      pet: new Pet(),
      engageStatus: false
    }
  },
  created() {
    this.petID = this.$route.query.id;
    if (this.petID) {
      PetAPI.getByID(this.petID).then(res => {
        if (res.data && res.data.success) {
          this.pet = res.data.data;
        }
      })
    }
  },
  methods: {
    /**
     * Đặt lịch hẹn nuôi
     */
    onSetAppointment() {
      if (this.$refs.validateAddAppointment.validate() && this.engageStatus) {
        this.appointment.PetID = this.pet.PetID;
        this.appointment.PetName = this.pet.PetName;
        this.appointment.PetAvatar = this.pet.PetAvatar;
        this.appointment.StatusID = AppointmentStatus.WaitingForAccept;
        this.appointment.StatusName = this.$t('AppointmentWaitingForAccept');
        AppointmentAPI.save(this.appointment).then(res => {
          if (res.data && res.data.success) {
            success(this.$t('SetAppointmentSuccessfully'));
            this.$router.push('/');
          }
        }, err => {
          console.log(err);
        })
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
.form-wrapper {
  background-color: #faf5ef;
  padding: 5%;
  border-radius: 5%;
} 
.row {
  margin-bottom: 10px;
}
</style>