import Page1 from '@/pages/page1/Index.vue';
import Page2 from '@/pages/page2/Index.vue';
import Layout from '@/layout/Index.vue';

const routes = {
  path: '/module1',
  name: 'module1',
  component: Layout,
  redirect: { name: 'module1.page1' },
  meta: {
    title: 'module1',
    prefix: 'alert',
    suffix: 'angle-down',
    active: false,
    anchor: false,
    hide: false
  },
  children: [
    {
      path: 'page1',
      name: 'module1.page1',
      component: Page1,
      meta: {
        title: 'page1',
        prefix: '',
        suffix: '',
        active: false,
        anchor: false,
        hide: false
      }
    },
    {
      path: 'page2',
      name: 'module1.page2',
      component: Page2,
      meta: {
        title: 'page2',
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
