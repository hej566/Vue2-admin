import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './modules';
import guard from './guard';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

guard(router);

export default router;
