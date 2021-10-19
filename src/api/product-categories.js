import { get, post, del, put } from '@/utils/request'

/**
 * 分页获取数据
 * @param {*} page
 * @returns
 */
export const loadModelsApi = (page = 1) =>
  get('/api/v1/admin/productcategory', {
    page
  })

/**
 * 新增
 * @param {*} data
 * @returns
 */
export const insertModelApi = data =>
  post('/api/v1/admin/productcategory', data)

/**
 * 删除
 * @param {*} id
 * @returns
 */
export const deleteOneApi = id => del(`/api/v1/admin/productcategory/${id}`)

/**
 * 根据id修改数据
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const editOneApi = (id, data) =>
  put(`/api/v1/admin/productcategory/${id}`, data)

/**
 * 根据id获取单条数据
 * @param {*} id
 * @returns
 */
export const getOneByIdApi = id => get(`/api/v1/admin/productcategory/${id}`)
