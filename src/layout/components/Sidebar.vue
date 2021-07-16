<template>
  <div :class="layoutSidebarClassList">
    <c4it-scrollbar is-vertical>
      <c4it-nav
        :nav="menu"
        :collapse="collapse"
        @router-name="routerNameHandler"
        @router-index="routerIndexHandler"
        theme="dark"
      />
    </c4it-scrollbar>
  </div>
</template>

<script>
import deepClone from '@/utils/deepClone';

export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: [],
      layoutSidebarClassArr: [],
      redirectMap: {},
      nearestParentRouteNotHide: null
    };
  },

  computed: {
    layoutSidebarClassList() {
      return this.layoutSidebarClassArr;
    }
  },

  watch: {
    $route: {
      immediate: false,
      handler(val) {
        this.init();
      }
    },
    collapse: {
      immediate: true,
      handler(val) {
        if (val) {
          this.layoutSidebarClassArr.pop();
          this.layoutSidebarClassArr.push('layout-sidebar-collapse');
        } else {
          this.layoutSidebarClassArr.pop();
          this.layoutSidebarClassArr.push('layout-sidebar');
        }
      }
    }
  },

  created() {
    this.fillRedirectMap();
  },

  mounted() {
    const sidebarList = this.$router.options.routes.filter(route => {
      return route.name !== 'login';
    });
    const deepCloneSidebarList = deepClone(sidebarList);
    const deepCloneSidebarListShowed = [];
    this.sidebarItemHideOrShow(
      deepCloneSidebarList,
      deepCloneSidebarListShowed
    );
    this.i18nLocalized(deepCloneSidebarListShowed);
    this.menu = [...deepCloneSidebarListShowed];
    this.init();
  },

  methods: {
    init() {
      const routeName = this.$route.name;
      const { routes } = this.$router.options;
      this.findRoutePath(routeName, routes);
      this.initSidebarList(this.nearestParentRouteNotHide.name, this.menu);
    },

    findRoutePath(routeName, routes) {
      const tmp = [];
      const path = [];
      for (let route of routes) {
        tmp.push(route);
        this.findRoutePathRecur(routeName, route, tmp, path);
        tmp.pop();
      }
    },

    findRoutePathRecur(routeName, route, tmp, path) {
      if (tmp[tmp.length - 1].name === routeName) {
        while (tmp.length) {
          const route = tmp.pop();
          if (!route.meta.hide) {
            this.nearestParentRouteNotHide = { ...route };
            return;
          }
        }
      } else {
        if (route.children && route.children.length) {
          for (let item of route.children) {
            tmp.push(item);
            this.findRoutePathRecur(routeName, item, tmp, path);
            tmp.pop();
          }
        }
      }
    },

    fillRedirectMap() {
      const { routes } = this.$router.options;
      this.fillRedirectMapRecr(routes);
    },

    fillRedirectMapRecr(list) {
      if (!list || !list.length) return;
      list.forEach(item => {
        if (Object.keys(item).includes('redirect')) {
          this.redirectMap[item.name] = item.redirect.name;
        }
        if (item.children && item.children.length) {
          this.fillRedirectMapRecr(item.children);
        }
      });
    },

    initSidebarList(routerName, menu) {
      const path = [];
      if (menu.length) {
        menu.forEach(item => {
          path.push(item);
          this.initSidebarListRecr(item, path, routerName);
          path.pop();
        });
      }
    },

    initSidebarListRecr(item, path, target) {
      item.meta.active = false;
      item.meta.anchor = false;
      if (path[path.length - 1].name === target) {
        path.forEach(item => {
          item.meta.active = true;
          item.meta.anchor = false;
        });
        path[path.length - 1].meta.anchor = true;
      }
      if (item.children && item.children.length) {
        item.children.forEach(item => {
          path.push(item);
          this.initSidebarListRecr(item, path, target);
          path.pop();
        });
      }
    },

    routerNameHandler(val) {
      if (
        val !== this.$route.name &&
        !Object.keys(this.redirectMap).includes(val)
      ) {
        this.$router.push({ name: val });
      } else if (Object.keys(this.redirectMap).includes(val)) {
        const toRouter = this.redirectMap[val];
        this.renderSidebar(toRouter);
        if (this.$route.name !== toRouter) {
          this.$router.push({ name: toRouter });
        }
      }
    },

    renderSidebar(routerName) {
      const menuCopy = deepClone(this.menu);
      this.initSidebarList(routerName, menuCopy);
      this.menu = [...menuCopy];
    },

    routerIndexHandler(val) {},

    sidebarItemHideOrShow(list, menuCopy) {
      if (!list || !list.length) {
        return;
      }
      for (let item of list) {
        if (!item.meta.hide && typeof item === 'object') {
          const tmp = {
            name: item.name,
            meta: item.meta
          };
          if (
            Object.keys(item).includes('children') &&
            this.someChildrenShow(item.children)
          ) {
            tmp.children = [];
            this.sidebarItemHideOrShow(item.children, tmp.children);
          }

          menuCopy.push(tmp);
        }
      }
    },

    someChildrenShow(children) {
      for (let child of children) {
        if (!child.meta.hide) return true;
      }
      return false;
    },

    i18nLocalized(list) {
      if (!list || !list.length) {
        return;
      }
      for (let item of list) {
        item.meta.title = this.$t(`message.sidebar.${item.meta.title}`);
        if (Object.keys(item).includes('children')) {
          this.i18nLocalized(item.children);
        }
      }
    }
  }
};
</script>
