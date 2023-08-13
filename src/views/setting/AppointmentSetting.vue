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

        <template #StatusName="{ data }">
          <div 
            :class="['custom-column status-column', data.StatusID == appointmentStatus.WaitingForAccept ? 'waiting' : data.StatusID == appointmentStatus.Accepted ? 'accepted' : 'declined' ]"
            :title="data.StatusName"
          >
            {{ data.StatusName }}
          </div>
        </template>

        <template #customOptionColumn="{ data }">
          <div class="d-flex justify-content-around">
            <b-icon
              :id="'approveIcon' + data.AppointmentID"
              v-if="data.StatusID == 1"
              icon="fa-solid fa-check"
              @click="onSetStatus(data, 2)"
            />
            <b-icon
              :id="'rejectIcon' + data.AppointmentID"
              v-if="data.StatusID == 1"
              icon="fa-solid fa-xmark"
              @click="onSetStatus(data, 3)"
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
import AppointmentStatus from '@/enum/AppointmentStatus';
import AppointmentAPI from '@/api/AppointmentAPI';
import { success } from '@/common/commonFunction';
import ModelState from '@/enum/ModelState';
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
          FieldName: "PhoneNumber",
          Caption: this.$t('PhoneNumber'),
          DataType: DataType.Default,
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
          DataType: DataType.Custom
        },
      ],
      appointmentStatus: AppointmentStatus
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      AppointmentAPI.getAll().then(res => {
        if (res.data && res.data.Success) {
          this.dataSource = res.data.Data;
        }
      });
    },
    onClickViewPetDetail(petID) {
      this.$router.push({ path: '/pet/detail', query: {id: petID}});
    },
    onSetStatus(item, statusID) {
      item.State = ModelState.Update;
      item.StatusID = statusID;
      if (statusID == 2) {
        item.StatusName = this.$t('AppointmentAccepted');
      } else {
        item.StatusName = this.$t('AppointmentRejected');
      }
      AppointmentAPI.save(item).then(res => {
        if (res.data && res.data.Success) {
          success(this.$t('UpdateStatusSuccessfully'));
          this.getData();
        }
      }, err => {
        console.log(err);
      })
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
.status-column {
  color: var(--white);
  text-align: center;
  padding: 4px;
  border-radius: 4px;

  &.declined {
    background-color: var(--red);
  }
  &.waiting {
    background-color: var(--blue);
  }
  &.accepted {
    background-color: var(--green);
  }
}
</style>