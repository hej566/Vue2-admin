import Page8 from '@/pages/page8/Index.vue';
import Page9 from '@/pages/page9/Index.vue';
import Layout from '@/layout/Index.vue';

const routes = {
  path: '/module5',
  name: 'module5',
  component: Layout,
  redirect: { name: 'module5.page8' },
  meta: {
    title: 'module5',
    prefix: 'enclosure',
    suffix: 'angle-down',
    active: false,
    anchor: false,
    hide: false
  },
  children: [
    {
      path: 'page8',
      name: 'module5.page8',
      component: Page8,
      meta: {
        title: 'page8',
        prefix: '',
        suffix: '',
        active: false,
        anchor: false,
        hide: false
      },
      children: [
        {
          path: 'page9',
          name: 'module5.page8.page9',
          component: Page9,
          meta: {
            title: 'create',
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
