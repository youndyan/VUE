import { get, del } from '@/utils/request'

/**
 * 分页获取数据
 * @param {*} page
 * @returns
 */
export const loadPinglunsApi = (page = 1) =>
  get('/api/v1/admin/comment', {
    page
  })

/**
 * 删除
 * @param {*} id
 * @returns
 */
export const deleteOneApi = id => del(`/api/v1/admin/comment/${id}`)

/**
 * 根据id获取单条数据
 * @param {*} id
 * @returns
 */
export const getOneByIdApi = id => get(`/api/v1/admin/product/${id}`)
