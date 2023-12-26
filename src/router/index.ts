import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { hidden: true },
      },
    ],
  },
];

// 异步路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/car",
    component: Layout,
    redirect: "/car/list",
    meta: {
      title: "车辆管理",
      icon: "car",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/car/index.vue"),
        name: "CarList",
        meta: {
          title: "车辆管理",
          icon: "car",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/order",
    component: Layout,
    redirect: "/order/toBeCreated",
    meta: {
      title: "订单管理",
      icon: "order",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
    },
    children: [
      {
        path: "toBeCreated",
        component: () => import("@/views/order/toBeCreated/index.vue"),
        name: "ToBeCreatedList",
        meta: {
          title: "待创建",
          icon: "toBeCreated",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "underway",
        component: () => import("@/views/order/underway/index.vue"),
        name: "UnderwayList",
        meta: {
          title: "进行中",
          icon: "underway",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "completed",
        component: () => import("@/views/order/completed/index.vue"),
        name: "CompletedList",
        meta: {
          title: "已完成",
          icon: "completed",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "abnormalOrder",
        component: () => import("@/views/order/abnormalOrder/index.vue"),
        name: "AbnormalOrderList",
        meta: {
          title: "异常订单",
          icon: "abnormalOrder",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/tenant",
    component: Layout,
    redirect: "/tenant/list",
    meta: {
      title: "租客管理",
      icon: "tenant",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/tenant/index.vue"),
        name: "TenantList",
        meta: {
          title: "租客管理",
          icon: "tenant",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/list",
    meta: {
      title: "用户管理",
      icon: "user",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/user/index.vue"),
        name: "UserList",
        meta: {
          title: "用户管理",
          icon: "user",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
    ],
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...asyncRoutes] as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
