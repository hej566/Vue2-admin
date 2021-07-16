<template>
  <div class="layout-navbar">
    <div class="container">
      <svg-icon
        @click="toggleCollapse"
        icon-class="outdent"
        class="navbar-outdent"
      ></svg-icon>
      <c4it-popover-dropdown
        v-model="option"
        @change="changeHandler"
        :options="options"
        type="text"
        suffix="angle-down"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: '',
      options: [{ value: 'logout', label: '退出登录' }]
    };
  },

  async mounted() {
    const result = await this.$api().account.getDefaultUser();
    if (result.status === 0) {
      this.option = result.data.userName;
    }
  },
  methods: {
    async changeHandler(command) {
      if (command === 'logout') {
        try {
          await this.$api().account.logout();
        } catch (error) {
          console.error(error);
          this.$toaster({ type: 'error', theme: 'dark', message: '登出失败' });
        }
      }
    },
    toggleCollapse() {
      this.$emit('toggleCollapse');
    }
  }
};
</script>
