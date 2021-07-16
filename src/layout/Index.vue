<template>
  <div class="app-wrapper">
    <div :style="`width: ${collapse ? 88 : 248}px`" class="main-side">
      <div v-if="collapse" class="app-logo-collapse">
        <svg-icon icon-class="logo"></svg-icon>
      </div>
      <div v-else class="app-logo">
        <svg-icon icon-class="logo"></svg-icon>
        <div class="app-name">
          {{ $t('message.logo.name') }}
        </div>
      </div>
      <sidebar :collapse="collapse" />
    </div>
    <div
      :style="`width: ${collapse ? 'calc(100% - 88px)' : 'calc(100% - 248px)'}`"
      class="main-container"
    >
      <navbar @toggleCollapse="toggleCollapse" />
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from './components';

export default {
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  data() {
    return {
      collapse: false
    };
  },
  methods: {
    toggleCollapse() {
      this.collapse = !this.collapse;
    }
  }
};
</script>
