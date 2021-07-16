import c4itMessage from '@/components/Message';

export default {
  install(Vue) {
    Vue.prototype.$toaster = c4itMessage;
  }
};
