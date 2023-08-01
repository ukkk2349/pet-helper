<template>
  <b-setting-layout :title="$t('User')">
    <div class="content">
      <b-grid
        :headers="headers"
        :dataSource="dataSource"
        keyExpr="UserID"
        :isShowOptionColumn="true"
      >
      <template #customOptionColumn="{ data }">
          <div v-if="isAdmin" class="d-flex justify-content-around">
            <b-icon
              :id="'approveUser' + data.UserID"
              v-if="!data.IsManager"
              icon="fa-solid fa-check"
              @click="onSetAsManager(data, true)"
            />
            <b-icon
              :id="'rejectUser' + data.UserID"
              v-if="data.IsManager"
              icon="fa-solid fa-xmark"
              @click="onSetAsManager(data, false)"
            />
          </div>
          <b-tooltip
            :text="$t('SetAsManager')"
            :target="'#approveUser' + data.UserID"
          />
          <b-tooltip
            :text="$t('DeleteRoleManager')"
            :target="'#rejectUser' + data.UserID"
          />
        </template>
      </b-grid>
    </div>
  </b-setting-layout>
</template>

<script>
import DataType from '@/enum/DataType';
import UserAPI from '@/api/UserAPI';
import ModelState from '@/enum/ModelState';
import { success } from '@/common/commonFunction';

export default {
  name: "UserSetting",
  data() {
    return {
      dataSource: [],
      headers: [
        {
          FieldName: "FullName",
          Caption: this.$t('FullName'),
          DataType: DataType.Default,
          Width: 150
        },
        {
          FieldName: "Birthday",
          Caption: this.$t('DateOfBirth'),
          DataType: DataType.Date,
          Width: 150
        },
        {
          FieldName: "CurrentProvinceName",
          Caption: this.$t('CurrentProvince'),
          DataType: DataType.Default,
          Width: 300
        },
        {
          FieldName: "CurrentDistrictName",
          Caption: this.$t('CurrentDistrict'),
          DataType: DataType.Default,
          Width: 300
        },
        {
          FieldName: "CurrentWardName",
          Caption: this.$t('CurrentWard'),
          DataType: DataType.Default,
          Width: 300
        },
        {
          FieldName: "Email",
          Caption: this.$t('Email'),
          DataType: DataType.Default,
          Width: 150
        },
        {
          FieldName: "PhoneNumber",
          Caption: this.$t('PhoneNumber'),
          DataType: DataType.Default,
          Width: 150
        }
      ],
      isAdmin: false
    }
  },
  created() {
    this.getData();
    this.isAdmin = this.$store.getters.isAdmin;
  },
  methods: {
    getData() {
      UserAPI.getAll().then(res => {
        if (res.data && res.data.Success) {
          this.dataSource = res.data.Data.filter(x => x.Email != "admin");
        }
      });
    },
    onSetAsManager(user, isManager) {
      var data = user;
      data.IsManager = isManager;
      data.State = ModelState.Update;
      UserAPI.save(data).then(res => {
        if (res.data && res.data.Success) {
          success(this.$t("UpdateUserSuccessfully"));
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>