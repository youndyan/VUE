import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isLogined } from "../utils/tools";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  //商城
  {
    path: "/Shop",
    name: "Shop",
    component: () => import("../views/Shop.vue"),
    meta: {
      needLogin: true,
    },
  },
  // 订单列表
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../yyz/Orders.vue"),
  },
  // 订单详情
  {
    path: "/ordersDetail",
    name: "OrdersDetail",
    component: () => import("../yyz/OrdersDetail.vue"),
  },
  // 论坛
  {
    path: "/Bbs",
    name: "Bbs",
    component: () => import("../views/Bbs.vue"),
    meta: {
      needLogin: true,
    },
  },
  // 我的
  {
    path: "/User",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      needLogin: true,
    },
  },
  // 搜索
  {
    path: "/Search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  // 商城主页
  // {
  //   path: "/yyz/main",
  //   name: "Main",
  //   component: () => import("../yyz/Main.vue"),
  // },
  // 商品列表
  {
    path: "/List",
    name: "List",
    component: () => import("../yyz/List.vue"),
  },
  // 公告详情
  {
    path: "/NoticesDetail",
    name: "NoticesDetail",
    component: () => import("../ymj/NoticesDetail.vue"),
  },
  // 登录
  {
    path: "/Login",
    name: "Login",
    component: () => import("../ymj/Login.vue"),
  },
  // 购物车
  {
    path: "/Cat",
    name: "Cart",
    component: () => import("../yyz/Cart.vue"),
  },
  // 米圈
  {
    path: "/Mq",
    name: "Mq",
    component: () => import("../yyz/Mq.vue"),
  },
  // 商城我的
  {
    path: "/Mine",
    name: "Mine",
    component: () => import("../yyz/Mine.vue"),
  },
  // 商品详情
  {
    path: "/Detail",
    name: "Detail",
    component: () => import("../yyz/Detail.vue"),
  },
  // 注册
  {
    path: "/Reg",
    name: "Reg",
    component: () => import("../ymj/Reg.vue"),
  },
  // 公告热点
  {
    path: "/Hot",
    name: "Hot",
    component: () => import("../ymj/Hot.vue"),
  },
  // 修改信息
  {
    path: "/Amend",
    name: "Amend",
    component: () => import("../ymj/Amend.vue"),
  },
  // 活动
  {
    path: "/Activity",
    name: "Activity",
    component: () => import("../ymj/Activity.vue"),
  },
  // 活动报名
  {
    path: "/Logact",
    name: "Logact",
    component: () => import("../ymj/Logact.vue"),
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/Listact",
    name: "Listact",
    component: () => import("../ymj/Listact.vue"),
  },
  //发帖
  {
    path: "/New_post",
    name: "NewPost",
    component: () => import("../lrx/NewPost.vue"),
    meta: {
      needLogin: true,
    },
  },
  //帖子详情
  {
    path: "/Bbsdetail",
    name: "Bbsdetail",
    component: () => import("../lrx/Bbsdetail.vue"),
    meta: {
      needLogin: true,
    },
  },
  //板块
  {
    path: "/Lhome",
    name: "Lhome",
    component: () => import("../lrx/Lhome.vue"),
    meta: {
      needLogin: true,
    },
  },
  //评论
  {
    path: "/PingLun",
    name: "PingLun",
    component: () => import("../lrx/PingLun.vue"),
    meta: {
      needLogin: true,
    },
  },
  //评论
];

const router = new VueRouter({
  routes,
});
//
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (isLogined()) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
