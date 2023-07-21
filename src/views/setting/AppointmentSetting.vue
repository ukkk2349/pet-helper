<template>
  <b-setting-layout :title="$t('SubcribeForAdopting')">
    <div class="content">
      <b-grid
        :headers="headers"
        :dataSource="dataSource"
        keyExpr="AppointmentID"
        :isShowOptionColumn="true"
      >
        <template #FullName="{ data }">
          <div class="name-column full-name-column" :title="data.UserName">
            {{ data.UserName }}
          </div>
        </template>
        <template #PetName="{ data }">
          <div 
            class="name-column pet-name-column"
            :title="data.PetName"
            @click="onClickViewPetDetail(data.PetID)"
          >
            {{ data.PetName }}
          </div>
        </template>

        <template #customOptionColumn="{ data }">
          <div class="d-flex justify-content-around">
            <b-icon
              :id="'approveIcon' + data.AppointmentID"
              v-if="data.StatusID == 1"
              icon="fa-solid fa-check"
            />
            <b-icon
              :id="'rejectIcon' + data.AppointmentID"
              v-if="data.StatusID == 1"
              icon="fa-solid fa-xmark"
            />
          </div>
          <b-tooltip
            :text="$t('Approve')"
            :target="'#approveIcon' + data.AppointmentID"
          />
          <b-tooltip
            :text="$t('Reject')"
            :target="'#rejectIcon' + data.AppointmentID"
          />
        </template>
      </b-grid>
    </div>
  </b-setting-layout>
</template>

<script>
import DataType from '@/enum/DataType';
import AppointmentAPI from '@/api/AppointmentAPI';

export default {
  name: "AppointmentSetting",
  data() {
    return {
      dataSource: [],
      headers: [
        {
          FieldName: "FullName",
          Caption: this.$t('FullName'),
          DataType: DataType.Custom,
          Width: 150
        },
        {
          FieldName: "PetName",
          Caption: this.$t('Pet'),
          DataType: DataType.Custom,
          Width: 300
        },
        {
          FieldName: "AppointmentDate",
          Caption: this.$t('AppointmentDate'),
          DataType: DataType.DateTime,
          Width: 150
        },
        {
          FieldName: "StatusName",
          Caption: this.$t('Status'),
          DataType: DataType.Default
        },
      ]
    }
  },
  created() {
    AppointmentAPI.getAll().then(res => {
      if (res.data && res.data.Success) {
        this.dataSource = res.data.Data;
      }
    })
  },
  methods: {
    onClickViewPetDetail(petID) {
      this.$router.push({ path: '/pet/detail', query: {id: petID}});
    }
  }
}
</script>

<style lang="scss" scoped>
.name-column {
  cursor: pointer;

  &:hover {
    color: var(--orange);
  }
}
</style>