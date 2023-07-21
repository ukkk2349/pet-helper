<template>
  <div class="container">
    <div class="row justify-content-center mb-4 mt-4 pb-4">
      <h1 class="text-center title">{{ title }}</h1>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SettingLayout",
  props: {
    title: {
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

<style lang="scss" scoped>
.title {
  font-size: 40px !important;
  font-weight: 500 !important;
}
</style>