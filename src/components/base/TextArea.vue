<template>
  <div class="text-box-wrapper" :class="[{'dis-flex justify-content-between' : !verticalLabel}, {'has-label': isShowLabel}]" :style="{height: textBoxHeight + 'px'}">
    <div v-if="isShowLabel" :for="id" class="text-box-label mb-1 font-weight-bold">{{ label }} <span v-if="require" class="require"></span></div>
    <DxTextArea
      :height="height"
      :max-length="maxLength"
      v-model="valueInput"
    >
      <DxValidator v-if="require">
        <DxRequiredRule :message="$t('RequireValidateMessage', {name: name && name.length > 0 ? name : label})"/>
      </DxValidator>
    </DxTextArea>
  </div>
</template>

<script>
import DxTextArea from 'devextreme-vue/text-area';
export default {
  name: "TextArea",
  components: {
    DxTextArea
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
    height: {
      type: [Number, String],
      default: 72
    }
  },
  data() {
    return {
      textBoxHeight: 72
    }
  },
  created() {
    this.textBoxHeight = this.isShowLabel ? this.height + 25 : this.height;
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
    }
  }
}
</script>

<style lang="scss">
.text-box-wrapper {
  height: var(--textbox-height);

  &.has-label {
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