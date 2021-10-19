import { get, post, put, del } from "../utils/request";

/**
 * 获取公告
 * @returns
 */
export const Notices = (data) => get("/api/v1/notices", data);
/**
 * 公告详情
 * @param {*} id
 * @returns
 */
export const loadNotices = (id) => get("/api/v1/notices/" + id);

/**
 * 登录
 * @param {} data
 * @returns
 */
export const loginApi = (data) => post("/api/v1/auth/login", data);

/**
 * 注册
 * @param {*} data
 * @returns
 */
export const regApi = (data) => post("/api/v1/auth/reg", data);

/**
 * 获取用户信息
 * @returns
 */
export const infoApi = () => get("/api/v1/user/info");

/**
 * 修改个人信息
 * @param {*} data
 * @returns
 */
export const amend = (data) => put("/api/v1/user/modify", data);

/**
 * 修改密码
 * @param {} data
 * @returns
 */
export const amendPD = (data) => put("/api/v1/user/update_pwd", data);

/**
 * 活动类别
 * @returns
 */
export const activity = () => get("/api/v1/activity_categories");

/**
 * 活动报名
 * @param {*} data
 * @returns
 */
export const logact = (data) => post("/api/v1/activity_logs", data);

/**
 * 热门帖子
 * @param {*} data
 * @returns
 */
export const pinglun = (post_id) => post(`/api/v1/comments/${post_id}`);
/**
 * 签到
 * @returns
 */
export const checkInApi = () => post("/api/v1/user/check_in");
