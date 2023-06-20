<template>
  <div class="select-box-wrapper">
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
      @selectionChanged="onSelectionChanged"
    >
      <template #itemTemplate="{ data }">
        <div class="select-box-item">
          <div class="title">{{ data[displayExpr] }}</div>
        </div>
      </template>
      <template #dropdown-icon="{}">
        <b-icon icon="fa-solid fa-chevron-down"></b-icon>
      </template>
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
    showClearButton: {
      type: Boolean,
      default: false
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
    }
  }
}
</script>

<style lang="scss">
.select-box-wrapper {
  height: 60px;

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