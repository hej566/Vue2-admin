export default {
  install(Vue) {
    Vue.prototype.$map = {
      enums: {
        cardManagement: {
          orderInfo: {
            0: 'message.options.submited',
            1: 'message.options.actived',
            2: 'message.options.chargeBack',
            3: 'message.options.transferPackage',
            4: 'message.options.delete',
            6: 'message.options.recharge',
            C1: 'message.options.registered',
            E0: 'message.options.shipping'
          }
        }
      }
    };
  }
};
