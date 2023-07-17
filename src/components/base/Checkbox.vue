<template>
  <div class="check-box-wrapper d-flex">
    <input v-model="valueInput" type="checkbox" class="d-none" :id="id"/>
    
    <label class="check-box-label d-flex cursor-pointer" :for="id">
      <b-icon :icon="valueInput ? 'fa-solid fa-square-check' : 'fa-regular fa-square-check'"/>
      <span class="text-left ml-2">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    id: {
      type: String,
      default: 'checkBoxID'
    },
    label: {
      type: String,
      default: ""
    },
    modelValue: {
      require: true
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

</style>