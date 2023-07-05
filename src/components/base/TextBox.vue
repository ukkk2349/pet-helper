<template>
  <div class="text-box-wrapper" :class="[{'dis-flex justify-content-between' : !verticalLabel}, {'has-label': isShowLabel}]">
    <div v-if="isShowLabel" :for="id" class="text-box-label mb-1 font-weight-bold">{{ label }} <span v-if="require" class="require"></span></div>
    <DxTextBox
      :id="id"
      :placeholder="placeholder"
      v-model="valueInput"
      value-change-event="keyup"
      :mode="passwordMode"
      :disabled="disabled"
      class="position-relative"
      :class="{'pl-4': isSearchTextBox}"
      :mask="mask"
      :mask-rules="maskRule"
      @value-changed="valueChanged"
    >
      <DxValidator v-if="require">
        <DxRequiredRule :message="$t('RequireValidateMessage', {name: name && name.length > 0 ? name : label})"/>
        <DxEmailRule v-if="rule=='email'" :message="$t('EmailInvalid')"/>
      </DxValidator>
      <b-icon class="icon-search" location="before" v-if="isSearchTextBox" icon="fa-solid fa-magnifying-glass" size="18px"/>
      <b-icon class="icon-show-password" location="after" v-if="mode == 'password'" :icon="iconViewPassword" @click="clickViewPassword"/>
    </DxTextBox>
  </div>
</template>

<script>
import { DxTextBox }  from 'devextreme-vue/text-box';
export default {
  name: "TextBox",
  components: {
    DxTextBox
  },
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    modelValue: {
      require: true
    },
    mode: {
      type: String,
      default: "text"
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
    disabled: {
      type: Boolean,
      default: false
    },
    require: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: null
    },
    maskRule: {
      type: Object,
      default: null
    },
    rule: {
      type: String,
      default: ''
    },
    isSearchTextBox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordMode: this.mode,
      iconViewPassword: 'fa-regular fa-eye'
    }
  },
  computed: {
    valueInput: {
      get() {return this.modelValue},
      set(val) {this.$emit('update:modelValue', val)}
    }
  },
  methods: {
    valueChanged(e) {
      this.$emit('valueChanged', e);
    },
    clickViewPassword() {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
      this.iconViewPassword = this.passwordMode == 'text' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    }
  }
}
</script>

<style lang="scss">
.text-box-wrapper {
  height: var(--textbox-height);

  &.has-label {
    height: calc(var(--textbox-height) + 25px);

    .text-box-label {
      text-align: start;
    }
  }

  .icon-search {
    position: absolute;
    top: 6px;
    left: 6px;
    opacity: .5;
  }

  .icon-show-password {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 10;
  }
}
</style>