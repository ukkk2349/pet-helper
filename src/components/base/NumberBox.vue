<template>
  <div class="number-box-wrapper" :class="[{'dis-flex justify-content-between' : !verticalLabel}, {'has-label': isShowLabel}]">
    <div v-if="isShowLabel" :for="id" class="number-box-label mb-1 font-weight-bold">{{ label }} <span v-if="require" class="require"></span></div>

    <DxNumberBox
      v-model="valueInput"
      :id="id"
      :show-spin-buttons="showSpinButtons"
      :show-clear-button="showClearButton"
      :disabled="disabled"
      :format="format"
    >
      <DxValidator v-if="require">
        <DxRequiredRule :message="$t('RequireValidateMessage', {name: name && name.length > 0 ? name : label})"/>
      </DxValidator>
    </DxNumberBox>
  </div>
</template>

<script>
import { DxNumberBox } from 'devextreme-vue/number-box';

export default {
  name: "NumberBox",
  components: {
    DxNumberBox
  },
  props: {
    modelValue: {
      default: null
    },
    showSpinButtons: {
      type: Boolean,
      default: false
    },
    showClearButton: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: "id"
    },
    name: {
      type: String,
      default: ""
    },
    isShowLabel: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      defautl: ""
    },
    verticalLabel: {
      type: Boolean,
      default: true
    },
    require: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "#.#"
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    valueInput: {
      get() {return this.modelValue},
      set(val) {this.$emit('update:modelValue', val)}
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.number-box-wrapper {
  height: var(--textbox-height);

  &.has-label {
    height: calc(var(--textbox-height) + 25px);

    .number-box-label {
      text-align: start;
    }
  }
}
</style>