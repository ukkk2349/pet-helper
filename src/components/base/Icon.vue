<template>
  <div class="icon-wrapper d-flex align-items-center justify-content-center cursor-pointer">
    <i :class="icon" :style="{'font-size': size}"></i>
  </div>
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    icon: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "20px"
    },
    color: {
      type: String,
      default: "#000"
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

<style lang="scss" scoped>
.icon-wrapper {
  height: 24px;
  width: 24px;
}
</style>