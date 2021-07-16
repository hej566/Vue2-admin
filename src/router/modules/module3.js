import Page6 from '@/pages/page6/Index.vue';
import Layout from '@/layout/Index.vue';

const routes = {
  path: '/module3',
  name: 'module3',
  component: Layout,
  redirect: { name: 'module3.page6' },
  meta: {
    title: 'module3',
    prefix: 'capacity',
    suffix: '',
    active: false,
    anchor: false,
    hide: false
  },
  children: [
    {
      path: 'page6',
      name: 'module3.page6',
      component: Page6,
      meta: {
        title: 'page6',
        prefix: '',
        suffix: '',
        active: false,
        anchor: false,
        hide: true
      }
    }
  ]
};

export default routes;
