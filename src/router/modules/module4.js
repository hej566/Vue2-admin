import Page7 from '@/pages/page7/Index.vue';
import Layout from '@/layout/Index.vue';

const routes = {
  path: '/module4',
  name: 'module4',
  component: Layout,
  redirect: { name: 'module4.page7' },
  meta: {
    title: 'module4',
    prefix: 'dashboard',
    suffix: 'angle-down',
    active: false,
    anchor: false,
    hide: false
  },
  children: [
    {
      path: 'page7',
      name: 'module4.page7',
      component: Page7,
      meta: {
        title: 'page7',
        prefix: '',
        suffix: '',
        active: false,
        anchor: false,
        hide: false
      }
    }
  ]
};

export default routes;
