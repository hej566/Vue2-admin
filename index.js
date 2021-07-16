import Vue from 'vue';
import Router from 'vue-router';
import VueI18n from 'vue-i18n';
import App from '@/App.vue';
import messages from '@/langs';
import router from '@/router';
import store from '@/store';
import echarts from 'echarts';

import API from '@/plugins/api';
import ENUM from '@/plugins/enum';
import mixins from '@/mixins';
import c4it from '@c4it/ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@c4it/ui/dist/index.css';
import '@/assets/style/normalize.css';
import '@/assets/style/custom.scss';
import '@/icons';
import AreaCascader from '@/components/AreaCascader.vue';
import c4itToaster from '@/plugins/toaster';
import NoData from './src/components/NoData.vue';

Vue.use(c4it.Nav);
Vue.use(c4it.SvgIcon);
Vue.use(c4it.Scrollbar);
Vue.use(c4it.Accordion);
Vue.use(c4it.AccordionGroup);
Vue.use(c4it.Button);
Vue.use(c4it.Table);
Vue.use(c4it.Switch);
Vue.use(c4it.Checkbox);
Vue.use(c4it.CheckboxGroup);
Vue.use(c4it.Radio);
Vue.use(c4it.RadioGroup);
Vue.use(c4it.Timepicker);
Vue.use(c4it.Timer);
Vue.use(c4it.Datepicker);
Vue.use(c4it.Dater);
Vue.use(c4it.Dropdown);
Vue.use(c4it.DropdownGroup);
Vue.use(c4it.Cascader);
Vue.use(c4it.CascaderItem);
Vue.use(c4it.PopoverDropdown);
Vue.use(c4it.Input);
Vue.use(c4it.Upload);
Vue.use(c4it.Modal);
Vue.use(c4it.Tree);
Vue.use(c4it.TreeNode);
Vue.use(c4it.ProgressBar);
Vue.use(c4it.Badge);
Vue.use(c4itToaster);
Vue.use(API);
Vue.use(ENUM);
Vue.use(VueI18n);
Vue.use(ElementUI, { size: 'small' });
Vue.component('area-cascader', AreaCascader);
Vue.component('no-data', NoData);
Vue.prototype.$echarts = echarts;

Vue.mixin(mixins);

const i18n = new VueI18n({
  locale: 'zh',
  messages
});

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
