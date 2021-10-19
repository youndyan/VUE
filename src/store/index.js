import Vue from "vue";
import Vuex from "vuex";
import { ShareSheet } from "vant";
import { loadCartsList, ordersListData } from "../services/productList";

Vue.use(ShareSheet);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: [],
    // orders: [],
    // orderList: [],
  },
  actions: {
    async loadCarts({ commit }) {
      const res = await loadCartsList();
      commit("loadCartsEnd", res.data);
    },
    async loadOrders({ commit }) {
      const res = await ordersListData();
      this.orderList = res.data;
      commit("loadOrdersEnd", res.data);
    },
  },
  mutations: {
    loadCartsEnd(state, payload) {
      state.cars = payload;
      // console.log(state.cars, 10086);
    },
    loadOrdersEnd(state, payload) {
      state.orders = payload;
      // console.log(state.orders, 10086);
      // payload.forEach((item) => {
      //   const obj = {};
      //   obj.price = item.price;
      //   payload.push(obj);
      // });
      // state.orders = payload;
    },
  },
  getters: {
    cartCount(state) {
      return state.cars.reduce((pre, cur) => pre + cur.amount, 0);
    },
  },
  modules: {},
});
