export default router => {
  router.beforeEach((to, from, next) => {
    // 在这里处理所有全局请求拦截和路由跳转
    next();
  });
};
