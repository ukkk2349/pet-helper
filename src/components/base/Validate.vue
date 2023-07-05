<template>
  <slot></slot>
</template>

<script>
import validationEngine from 'devextreme/ui/validation_engine';

export default {
  name: "BaseValidate",
  data() {
    return {
      
    }
  },
  methods: {
    validate() {
      var res = validationEngine.validateGroup();
      return res.isValid;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>