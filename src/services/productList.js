import { del, get, post } from "../utils/request";
//商品分页和分类进行商品列表的加载
export function loadProductsList(page=1,per=30,category="") {
  return get("/api/v1/products",{page,per,category});
}
//根据id获取商品详情
export function loadProductsDetail(id) {
  return get(`/api/v1/products/${id}`);
}
//获取购物车数据
export function loadCartsList() {
  return get("/api/v1/shop_carts");
}
//加入购物车
export function addCartsList(product, amount, price) {
  return post("/api/v1/shop_carts", { product, amount, price });
}
//删除购物车
export function delCartsList(cartId) {
  return del(`/api/v1/shop_carts/${cartId}`);
}
// 提交订单
export function submitOrder(products, receiver, address) {
  return post("/api/v1/orders", { products, receiver, address });
}
//商品分类
export function productsCategories() {
  return get("/api/v1/product_categories");
}
// 获取订单列表
export function ordersListData(page = 1, per = 10) {
  return get("/api/v1/orders", { page, per });
}
// 根据订单id获取订单详情

export function ordersListDetail(id) {
  return get(`/api/v1/orders/${id}`);
}
