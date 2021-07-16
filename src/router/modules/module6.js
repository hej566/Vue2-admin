import Page10 from '@/pages/page10/Index.vue';
import Page11 from '@/pages/page11/Index.vue';
import Page12 from '@/pages/page12/Index.vue';
import Layout from '@/layout/Index.vue';

const routes = {
  path: '/module6',
  name: 'module6',
  component: Layout,
  redirect: { name: 'module6.page10' },
  meta: {
    title: 'module6',
    prefix: 'match',
    suffix: 'angle-down',
    active: false,
    anchor: false,
    hide: false
  },
  children: [
    {
      path: 'page10',
      name: 'module6.page10',
      component: Page10,
      meta: {
        title: 'page10',
        prefix: '',
        suffix: 'angle-down',
        active: false,
        anchor: false,
        hide: false
      },
      children: [
        {
          path: 'page11',
          name: 'module6.page10.page11',
          component: Page11,
          meta: {
            title: 'page11',
            prefix: '',
            suffix: 'angle-down',
            active: false,
            anchor: false,
            hide: false
          },
          children: [
            {
              path: 'page12',
              name: 'module6.page10.page11.page12',
              component: Page12,
              meta: {
                title: 'page12',
                prefix: '',
                suffix: '',
                active: false,
                anchor: false,
                hide: false
              }
            }
          ]
        }
      ]
    }
  ]
};

export default routes;
