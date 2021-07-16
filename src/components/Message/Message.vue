<template>
  <div :class="messageClassList">
    <div :class="messageWrapperClassList">
      <svg-icon
        v-if="type === 'success'"
        icon-class="check-circle"
        class="success"
      />
      <svg-icon
        v-else-if="type === 'error'"
        icon-class="times-circle"
        class="error"
      />
      <svg-icon v-else icon-class="exclamation-triangle" class="warning" />
      <div :class="messageContentClassList">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageClassArr: [],
      messageWrapperClassArr: [],
      messageContentClassArr: [],
      message: '',
      theme: 'light'
    };
  },

  computed: {
    messageClassList() {
      return this.messageClassArr;
    },
    messageContentClassList() {
      return this.messageContentClassArr;
    },
    messageWrapperClassList() {
      return this.messageWrapperClassArr;
    }
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      /*eslint-disable*/
        this.messageClassArr.push(`c4it-message`)
        this.messageWrapperClassArr.push(`c4it-message-wrapper`)
        this.messageContentClassArr.push(`c4it-message-content`)
        if (this.theme === 'light') {
          this.messageClassArr.push('light');
        } else {
          this.messageClassArr.push('dark');
        }
        /*eslint-enable*/
    }
  }
};
</script>
