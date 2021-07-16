import Page3 from '@/pages/page3/Index.vue';
import Page4 from '@/pages/page4/Index.vue';
import Page5 from '@/pages/page5/Index.vue';
import Layout from '@/layout/Index.vue';

const routes = {
  path: '/module2',
  name: 'module2',
  component: Layout,
  redirect: { name: 'module2.page3' },
  meta: {
    title: 'module2',
    prefix: 'base-info',
    suffix: 'angle-down',
    active: false,
    anchor: false,
    hide: false
  },
  children: [
    {
      path: 'page3',
      name: 'module2.page3',
      component: Page3,
      meta: {
        title: 'page3',
        prefix: '',
        suffix: '',
        active: false,
        anchor: false,
        hide: false
      },
      children: [
        {
          path: 'page4',
          name: 'module2.page3.page4',
          component: Page4,
          meta: {
            title: 'page4',
            prefix: '',
            suffix: '',
            active: false,
            anchor: false,
            hide: true
          }
        },
        {
          path: 'page5',
          name: 'module2.page3.page5',
          component: Page5,
          meta: {
            title: 'page5',
            prefix: '',
            suffix: '',
            active: false,
            anchor: false,
            hide: true
          }
        }
      ]
    }
  ]
};

export default routes;
