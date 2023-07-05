<template>
  <div class="date-box-wrapper" :class="[{'dis-flex justify-content-between' : !verticalLabel}, {'has-label': isShowLabel}]">
    <div v-if="isShowLabel" :for="id" class="text-left mb-1 font-weight-bold">{{ label }} <span v-if="require" class="require"></span></div>
    <DxDateBox
      :value="valueInput"
      :input-attr="{ 'aria-label': 'Date' }"
      :type="type"
      :disabled="disabled"
    >
      <DxValidator v-if="require">
        <DxRequiredRule :message="$t('RequireValidateMessage', {name: name && name.length > 0 ? name : label})"/>
      </DxValidator>
    </DxDateBox>
  </div>
</template>

<script>
import DxDateBox from 'devextreme-vue/date-box';

export default {
  name: "DateBox",
  components: {
    DxDateBox
  },
  props: {
    modelValue: {
      require: true
    },
    type: {
      type: String,
      default: "date"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isShowLabel: {
      type: Boolean,
      default: false
    },
    label:  {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: "dateBox"
    },
    name: {
      type: String,
      default: ""
    },
    verticalLabel: {
      type: Boolean,
      default: true
    },
    require: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    valueInput: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$t("update:modelValue", val);
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>