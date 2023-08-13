<template>
  <DxPopup
    :visible="popupVisible"
    :drag-enabled="false"
    :hide-on-outside-click="true"
    :show-close-button="false"
    :show-title="true"
    :width="500"
    :height="220"
    container=".dx-viewport"
    :title="title"
  >
    <div class="content text-left" v-html="content">
    </div>
    <DxPosition
      at="center"
      my="center"
      collision="fit"
    />
    <DxToolbarItem
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="closeButtonOptions"
    />
  </DxPopup>
</template>

<script>
import { DxPopup, DxPosition, DxToolbarItem } from 'devextreme-vue/popup';
export default {
  name: "BasePopup",
  components: {
    DxPopup,
    DxPosition,
    DxToolbarItem
  },
  props: {
    popupVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      closeButtonOptions: {
        text: this.$t('Close'),
        onClick: () => {
          this.$emit('close');
        },
      },
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>