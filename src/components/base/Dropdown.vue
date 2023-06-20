<template>
  <div class="dropdown-wrapper custom">
    <div class="dropdown-content">
      <b-button
        class="dropdown-btn"
        type="link"
        :text="title"
        :showPostIcon="true"
        postIcon="fa-solid fa-chevron-down"
        :showBorder="false"
      >
      </b-button>
  
      <div class="dropdown-menu">
        <template v-for="(item, index) in items" :key="index">
          <div
            class="dropdown-item cursor-pointer"
            @click="onSelectItem(item)"
          >
            <span>{{ item[displayExpr] }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseDropdown",
  props: {
    title: {
      type: String,
      default: "text"
    },
    items: {
      type: Array,
      default: () => [{name: 'name', id: 1}, {name: 'name2', id: 2}]
    },
    displayExpr: {
      type: String,
      default: "name"
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    onSelectItem(e) {
      this.$emit('onSelectItem', e);
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
  .dropdown-content {
    position: relative;
    width: fit-content;
  }
  .dropdown-btn {
    border: 1px solid var(--border-color);

    &:hover ~ .dropdown-menu {
      opacity: 1;
    }
  }

  .dropdown-menu {
    display: block;
    padding: 10px 5px;
    z-index: 999;
    position: absolute;
    top: var(--button-height);
    left: 0;
    opacity: 0;
    transition: var(--transition-button);
    font-size: 14px;

    &:hover {
      opacity: 1;
    }

    .dropdown-item {
      border-radius: var(--button-border-radius);
      &:active {
        background-color: var(--item-bg-hover); 
        color: var(--black);
      }
    }
  }
 }
</style>