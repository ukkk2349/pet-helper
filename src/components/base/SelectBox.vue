<template>
  <div class="select-box-wrapper" :class="[{'dis-flex justify-content-between' : !verticalLabel}, {'has-label': isShowLabel}]">
    <div v-if="isShowLabel" :for="id" class="text-box-label mb-1 font-weight-bold">{{ label }} <span v-if="require" class="require"></span></div>
    <DxSelectBox
      :value="value"
      :class="[{'show-border': showBorder}, { 'no-border': !showBorder }  ]"
      :items="items"
      :input-attr="{ 'aria-label': 'Product With Placeholder' }"
      :show-clear-button="showClearButton"
      :placeholder="placeholder"
      :display-expr="displayExpr"
      :value-expr="valueExpr"
      item-template="itemTemplate"
      :disabled="disabled"
      drop-down-button-template="dropdown-icon"
      :no-data-text="$t('NoDataText')"
      @selectionChanged="onSelectionChanged"
    >
      <template #itemTemplate="{ data }">
        <div class="select-box-item">
          <div class="title">{{ data[displayExpr] }}</div>
        </div>
      </template>
      <template #dropdown-icon="{}">
        <b-icon icon="fa-solid fa-chevron-down" size="14px"></b-icon>
      </template>
      <DxValidator v-if="require">
        <DxRequiredRule :message="$t('RequireValidateMessage', {name: name && name.length > 0 ? name : label})"/>
      </DxValidator>
    </DxSelectBox>
  </div>
</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box';

export default {
  name: "BaseSelectBox",
  components: {
    DxSelectBox
  },
  props: {
    modelValue: {
      default: null
    },
    showClearButton: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: "selectBox"
    },
    name: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    },
    displayExpr: {
      type: String,
      default: ""
    },
    valueExpr: {
      type: String,
      default: ""
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    value: {
      default: null
    },
    isShowLabel: {
      type: Boolean,
      default: false,
    },
    label: {
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
  methods: {
    /**
     * Khi chọn item / bỏ chọn item
     * @param {*} e 
     */
    onSelectionChanged(e) {
      this.$emit('onSelectionChanged', e.selectedItem);
      this.$emit('update:modelValue', e[this.valueExpr]);
    }
  }
}
</script>

<style lang="scss">
.select-box-wrapper {
  height: 60px;

  &.has-label {
    height: calc(var(--textbox-height) + 25px);

    .text-box-label {
      text-align: start;
    }
  }

  .show-border {
    border: 1px solid var(--border-color);
  }

  .dx-dropdowneditor-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>