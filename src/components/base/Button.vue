<template>
  <button 
    class="btn-custom" 
    :class="[type, {'no-border bg-transparent': !showBorder }]"
    :disabled="disabled" 
    @click="onClick"
  >
    <div class="btn-content d-flex align-items-center justify-content-between">
      <b-icon v-if="showPreIcon" :class="preIcon"/>
      {{ text }}
      <b-icon v-if="showPostIcon" :class="postIcon"/>
    </div>
  </button>
</template>

<script>

export default {
  name: "BaseButton",
  components: {
  },
  props: {
    text: {
      type: String,
      default: "button"
    },
    // primary, secondary, white, link
    type: {
      type: String,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    showPreIcon: {
      type: Boolean,
      default: false
    },
    showPostIcon: {
      type: Boolean,
      default: false
    },
    preIcon: {
      type: String,
      default: ""
    },
    postIcon: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-custom {
  height: var(--button-height);
  border-radius: var(--button-border-radius);  
  border: 1px solid var(--border-color);
  padding: 6px 10px;
  font-weight: 500;
  min-width: 60px;
  transition: var(--transition-button);

  .btn-content {
    gap: 6px;
  }

  &.no-border {
    &:hover {
      color: var(--button-primary-border-color);
    }
  }

  &.primary {
    background-color: var(--button-primary-border-color);
    color: var(--white);
    border: 1px solid var(--button-primary-border-color);
  }

  &.secondary {
    background-color: var(--button-secondary-bg-color);
    color: var(--button-primary-border-color);
    border: 1px solid var(--button-primary-border-color);

    &:hover:not(:disabled) {
      background-color: var(--button-primary-border-color);
      color: var(--white);
    }
  }

  &.white {
    background-color: var(--white);
    color: var(--black);
    border: 2px solid var(--border-color);

    &:hover {
      background-color: #EEEEEE;
    }
  }

  &:disabled {
    opacity: .5;
  }
}
</style>