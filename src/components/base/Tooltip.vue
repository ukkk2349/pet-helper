<template>
  <DxTooltip
    :hide-on-outside-click="false"
    :target="target"
    show-event="mouseenter"
    hide-event="mouseleave"
  >
    {{ text }}
  </DxTooltip>
</template>

<script>
import { DxTooltip } from 'devextreme-vue/tooltip';
export default {
  name: "BaseTooltip",
  components: {
    DxTooltip
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    target: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.dx-tooltip-wrapper .dx-overlay-content {  
  background-color: var(--tooltip-bg-color);
  border: var(--tooltip-bg-color);
  color: var(--white);
  font-size: 14px;

  .dx-popup-content {
    padding: 0px 10px;
    height: 36px;
    line-height: 36px;
    white-space: normal!important;
  }
}

.dx-tooltip-wrapper.dx-popover-wrapper .dx-popover-arrow:after {  
    background-color: var(--tooltip-bg-color);  
}  
</style>