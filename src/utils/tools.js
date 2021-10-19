export const serverUrl = "http://192.168.14.83:1337";//http://sails.penkuoer.com
export const serverUploadUrl =
  "http://192.168.14.83:1337/api/v1/common/upload_file";

/**
 * 判断用户是否登录
 * @returns
 */
export const isLogined = () => (sessionStorage.getItem("token") ? true : false);

/**
 * 设置
 * @param {*} token
 * @returns
 */
export const setToken = (token) => sessionStorage.setItem("token", token);

/**
 * 取
 * @returns
 */
export const getToken = () => sessionStorage.getItem("token");

/**
 * 删除
 * @returns
 */
export const removeToken = () => sessionStorage.removeItem("token");
