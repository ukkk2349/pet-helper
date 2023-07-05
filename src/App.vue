<template>
  <app-header style="position: fixed; width: 100%; z-index: 999; transition: .4s; margin: 0" :class="['menu', {'white-menu': scrolled}]" :status="componentKey" :key="componentKey"/>
  <div class="main">
    <router-view/>
  </div>
  <app-footer/>
</template>

<script>
import AppFooter from '@/components/baseWidget/Footer.vue';
import AppHeader from '@/components/baseWidget/Header.vue';
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    RouterView
  },
  data() {
    return {
      componentKey: 0,
      scrolled: false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    getFullPath () {
      return this.$route.path;
    }
  },
  watch: {
    getFullPath () {
      this.changeRoute()
    }
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    /**
     * Xử lý đổi màu background header khi scroll xuống (trong suốt -> trắng mờ)
     */
    handleScroll () {
      this.scrolled = window.scrollY > 80;
    },
    changeRoute() {
      this.componentKey ++;
    },
  }
}
</script>

<style>
@import url(./assets/style/common.scss);
@import url(./assets/style/variables.scss);
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  height: 100%;
}

.main {
  min-height: calc(100% - 130px);
  min-height: 650px;
  padding-top: 70px;
}

.white-menu {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
